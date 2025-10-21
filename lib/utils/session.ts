/**
 * Session Management Utilities
 *
 * Handles anonymous session ID generation and management for visitor tracking.
 * Uses localStorage to persist session across page reloads.
 *
 * @module session
 */

const SESSION_KEY = 'portfolio_session_id';

/**
 * Generate a unique session ID
 */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

/**
 * Get or create a session ID for the current visitor
 */
export function getSessionId(): string {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return 'server_session';
  }

  try {
    // Try to get existing session ID
    let sessionId = localStorage.getItem(SESSION_KEY);

    if (!sessionId) {
      // Generate new session ID
      sessionId = generateSessionId();
      localStorage.setItem(SESSION_KEY, sessionId);
    }

    return sessionId;
  } catch (error) {
    // Fallback if localStorage is not available
    console.warn('localStorage not available, using temporary session', error);
    return generateSessionId();
  }
}

/**
 * Clear the current session (useful for testing)
 */
export function clearSession(): void {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (error) {
      console.warn('Could not clear session', error);
    }
  }
}
