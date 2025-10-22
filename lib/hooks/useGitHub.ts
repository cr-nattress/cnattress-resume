/**
 * GitHub Hook
 *
 * Custom React hook for fetching and managing GitHub data:
 * - User profile
 * - Repository stats
 * - Recent activity
 * - Language breakdown
 *
 * @module useGitHub
 */

import { useState, useEffect } from 'react';
import type { GitHubStats } from '../services/github';
import { fetchGitHubStats } from '../services/github';

export interface UseGitHubReturn {
  data: GitHubStats | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

/**
 * Custom hook for GitHub data fetching
 */
export function useGitHub(): UseGitHubReturn {
  const [data, setData] = useState<GitHubStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Fetch GitHub data
   */
  const fetchData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const stats = await fetchGitHubStats();
      setData(stats);
    } catch (err) {
      console.error('GitHub fetch error:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch GitHub data'));
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Initial data fetch on mount
   */
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Manual refetch function
   */
  const refetch = (): void => {
    fetchData();
  };

  return {
    data,
    isLoading,
    error,
    refetch
  };
}
