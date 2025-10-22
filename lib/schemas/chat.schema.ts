/**
 * Zod validation schemas for Chat API
 */

import { z } from 'zod';

/**
 * Schema for individual chat messages
 */
export const MessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string()
    .min(1, 'Message content cannot be empty')
    .max(10000, 'Message content too long (max 10,000 characters)'),
});

/**
 * Schema for chat API requests
 */
export const ChatRequestSchema = z.object({
  messages: z.array(MessageSchema)
    .min(1, 'At least one message is required')
    .max(50, 'Too many messages in conversation history'),
  sessionId: z.string()
    .min(10, 'Session ID must be at least 10 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Session ID contains invalid characters'),
});

/**
 * Inferred TypeScript types from schemas
 */
export type Message = z.infer<typeof MessageSchema>;
export type ChatRequest = z.infer<typeof ChatRequestSchema>;
