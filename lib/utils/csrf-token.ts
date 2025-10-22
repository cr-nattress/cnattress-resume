/**
 * CSRF Token Utility
 *
 * Synchronous utility function to get CSRF token from cookie.
 * Used in client components that need to include CSRF token in API requests.
 */

export function getCsrfToken(): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'csrf-token') {
      return decodeURIComponent(value);
    }
  }

  return null;
}
