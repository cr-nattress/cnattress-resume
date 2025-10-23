/**
 * CSRF Token Management Hook
 *
 * Reads CSRF token from cookie set by middleware.
 * Token is automatically available after page load.
 */

import { useEffect, useState } from 'react';
import { getCsrfToken } from '@/lib/utils/csrf-token';

interface UseCsrfReturn {
  csrfToken: string | null;
  isLoading: boolean;
  refreshToken: () => void;
}

export function useCsrf(): UseCsrfReturn {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const readCsrfToken = (): void => {
    setIsLoading(true);
    const token = getCsrfToken();
    console.log('[useCsrf] Read token from cookie:', token ? `${token.substring(0, 10)}...` : 'null');
    setCsrfToken(token);
    setIsLoading(false);
  };

  // Read token from cookie on mount
  useEffect(() => {
    readCsrfToken();
  }, []);

  return {
    csrfToken,
    isLoading,
    refreshToken: readCsrfToken,
  };
}
