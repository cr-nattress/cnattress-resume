/**
 * API Endpoint Constants
 *
 * Centralized location for all API endpoint URLs and configuration
 */

export const API_ENDPOINTS = {
  CHAT: '/api/chat',
  ANALYZE_JOB: '/api/analyze-job',
  ANALYTICS: '/api/analytics',
  REGENERATE_RESUME: '/api/regenerate-resume',
} as const;

export const RATE_LIMITS = {
  CHAT_MAX_REQUESTS: 100,
  CHAT_WINDOW_MS: 60 * 60 * 1000, // 1 hour
  ANALYTICS_MAX_REQUESTS: 60,
  ANALYTICS_WINDOW_MS: 60 * 1000, // 1 minute
} as const;

export type ApiEndpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS];
