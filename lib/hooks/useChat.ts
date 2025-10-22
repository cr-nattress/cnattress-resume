/**
 * useChat Hook
 *
 * Custom React hook for managing AI chat functionality with streaming responses.
 * Handles message sending, receiving, and persistence.
 *
 * @module useChat
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { getSessionId } from '@/lib/utils/session';
import { API_ENDPOINTS } from '@/lib/constants/api';
import { useCsrf } from './useCsrf';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface UseChatReturn {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
}

const STORAGE_KEY = 'chat_history';
const MAX_STORED_MESSAGES = 50;

/**
 * Custom hook for chat functionality
 */
export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const sessionId = useRef(getSessionId());
  const { csrfToken } = useCsrf();

  // Load messages from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setMessages(parsed);
        }
      } catch (err) {
        console.warn('Failed to load chat history:', err);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && messages.length > 0) {
      try {
        // Keep only the most recent messages
        const toStore = messages.slice(-MAX_STORED_MESSAGES);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
      } catch (err) {
        console.warn('Failed to save chat history:', err);
      }
    }
  }, [messages]);

  /**
   * Send a message to the AI
   */
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Check if CSRF token is available
    if (!csrfToken) {
      setError('Security token not available. Please refresh the page.');
      return;
    }

    setError(null);
    setIsLoading(true);

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: content.trim(),
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      // Cancel any ongoing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new abort controller
      abortControllerRef.current = new AbortController();

      // Prepare messages for API (last 10 messages for context)
      const conversationHistory = [...messages, userMessage].slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Send request to API
      const response = await fetch(API_ENDPOINTS.CHAT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify({
          messages: conversationHistory,
          sessionId: sessionId.current
        }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      let assistantMessage = '';
      const assistantMessageTimestamp = Date.now();

      // Read the stream
      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        // Decode and process chunks
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.substring(6);

            if (data === '[DONE]') {
              // Stream complete
              break;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                assistantMessage += parsed.text;

                // Update the assistant message in real-time
                setMessages(prev => {
                  const withoutLast = prev[prev.length - 1]?.role === 'assistant'
                    ? prev.slice(0, -1)
                    : prev;

                  return [
                    ...withoutLast,
                    {
                      role: 'assistant',
                      content: assistantMessage,
                      timestamp: assistantMessageTimestamp
                    }
                  ];
                });
              }
            } catch (e) {
              // Ignore JSON parse errors for malformed chunks
            }
          }
        }
      }

      // Ensure final message is added
      if (assistantMessage) {
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === 'assistant' && last.content === assistantMessage) {
            return prev; // Already added
          }
          return [
            ...prev,
            {
              role: 'assistant',
              content: assistantMessage,
              timestamp: assistantMessageTimestamp
            }
          ];
        });
      }

    } catch (err: any) {
      if (err.name === 'AbortError') {
        // Request was cancelled
        return;
      }

      console.error('Chat error:', err);
      setError(err.message || 'Failed to send message. Please try again.');

      // Remove the user message if there was an error
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [messages, isLoading, csrfToken]);

  /**
   * Clear all messages
   */
  const clearMessages = useCallback(() => {
    setMessages([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages
  };
}
