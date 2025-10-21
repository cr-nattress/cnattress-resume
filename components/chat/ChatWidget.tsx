'use client';

/**
 * ChatWidget Component
 *
 * AI-powered chat widget that provides an interactive career concierge experience.
 * Features minimize/maximize, message persistence, and streaming responses.
 *
 * @component
 */

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@/lib/hooks/useChat';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  MessageCircle,
  X,
  Minimize2,
  Send,
  Loader2,
  Sparkles
} from 'lucide-react';

interface ChatWidgetProps {
  initiallyMinimized?: boolean;
}

export function ChatWidget({ initiallyMinimized = true }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(!initiallyMinimized);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages
  } = useChat();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isMinimized]);

  // Focus input when widget opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    await sendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Suggested questions for first-time users
  const suggestedQuestions = [
    "What technologies does Chris know?",
    "Tell me about Chris's leadership experience",
    "What's Chris's experience with microservices?",
    "Is Chris available for new opportunities?"
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-deep-purple hover:bg-deep-purple-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 group"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-gradient-to-r from-deep-purple-400 to-navy-400 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
          <Sparkles className="w-3 h-3" />
        </span>
      </button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 z-50 w-[380px] max-h-[600px] shadow-2xl flex flex-col overflow-hidden border-deep-purple/20">
      {/* Header */}
      <CardHeader className="bg-gradient-to-r from-deep-purple to-navy text-white p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <CardTitle className="text-lg font-semibold">
              AI Career Concierge
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(!isMinimized)}
              className="h-8 w-8 text-white hover:bg-white/20"
              aria-label={isMinimized ? "Maximize" : "Minimize"}
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 text-white hover:bg-white/20"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        {!isMinimized && (
          <p className="text-sm text-white/90 mt-1">
            Ask me anything about Chris's experience and skills
          </p>
        )}
      </CardHeader>

      {/* Messages Area */}
      {!isMinimized && (
        <>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 min-h-[300px] max-h-[400px]">
            {messages.length === 0 ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  👋 Hi! I'm your AI career concierge. I can answer questions about Chris's:
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Technical skills and experience</li>
                  <li>• Leadership and team management</li>
                  <li>• Project highlights and achievements</li>
                  <li>• Availability and career interests</li>
                </ul>
                <div className="pt-2">
                  <p className="text-xs text-gray-500 mb-2">Try asking:</p>
                  <div className="space-y-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setInputValue(question)}
                        className="w-full text-left text-xs bg-white hover:bg-deep-purple/10 border border-gray-200 hover:border-deep-purple/30 rounded-lg p-2 transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-3 ${
                      msg.role === 'user'
                        ? 'bg-deep-purple text-white'
                        : 'bg-white border border-gray-200 text-gray-800'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {msg.content}
                    </p>
                    <p className={`text-xs mt-1 ${
                      msg.role === 'user' ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-deep-purple" />
                  <span className="text-sm text-gray-600">Thinking...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input Area */}
          <div className="p-4 bg-white border-t flex-shrink-0">
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Chris's experience..."
                className="flex-1 resize-none border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-deep-purple/50 focus:border-transparent"
                rows={2}
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={!inputValue.trim() || isLoading}
                className="bg-deep-purple hover:bg-deep-purple-700 self-end"
                size="icon"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>

            {messages.length > 0 && (
              <button
                onClick={clearMessages}
                className="text-xs text-gray-500 hover:text-gray-700 mt-2"
              >
                Clear conversation
              </button>
            )}
          </div>
        </>
      )}
    </Card>
  );
}
