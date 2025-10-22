/**
 * CSRF Token Management Hook
 *
 * Fetches and manages CSRF token for protected API requests.
 * Token is automatically refreshed when needed.
 */

import { useEffect, useState, useCallback } from 'react';

interface UseCsrfReturn {
  csrfToken: string | null;
  isLoading: boolean;
  refreshToken: () => Promise<void>;
}

export function useCsrf(): UseCsrfReturn {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCsrfToken = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/csrf');

      if (!response.ok) {
        throw new Error('Failed to fetch CSRF token');
      }

      const data = await response.json();
      setCsrfToken(data.csrfToken);
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
      setCsrfToken(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch token on mount
  useEffect(() => {
    fetchCsrfToken();
  }, [fetchCsrfToken]);

  return {
    csrfToken,
    isLoading,
    refreshToken: fetchCsrfToken,
  };
}
