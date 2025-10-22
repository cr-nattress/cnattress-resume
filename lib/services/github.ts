/**
 * GitHub API Service
 *
 * Fetches GitHub user data with intelligent caching to avoid rate limits.
 * Implements 1-hour TTL cache using localStorage.
 *
 * @module github-service
 */

// Get GitHub username from environment or use fallback
const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'cr-nattress';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  topics: string[];
}

export interface GitHubEvent {
  id: string;
  type: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  repo: {
    name: string;
    url: string;
  };
  payload: Record<string, unknown>;
  created_at: string;
}

export interface GitHubStats {
  user: GitHubUser;
  totalStars: number;
  totalForks: number;
  repositories: GitHubRepository[];
  events: GitHubEvent[];
  languages: Record<string, number>;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

/**
 * Get from cache if valid, otherwise return null
 */
function getFromCache<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;

  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const entry: CacheEntry<T> = JSON.parse(cached);
    const isExpired = Date.now() - entry.timestamp > CACHE_TTL;

    if (isExpired) {
      localStorage.removeItem(key);
      return null;
    }

    return entry.data;
  } catch (error) {
    console.error('Cache read error:', error);
    return null;
  }
}

/**
 * Save to cache with timestamp
 */
function saveToCache<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;

  try {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch (error) {
    console.error('Cache write error:', error);
  }
}

/**
 * Fetch GitHub user data
 */
export async function fetchGitHubUser(): Promise<GitHubUser> {
  const cacheKey = `github-user-${GITHUB_USERNAME}`;
  const cached = getFromCache<GitHubUser>(cacheKey);

  if (cached) {
    return cached;
  }

  const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = await response.json();
  saveToCache(cacheKey, data);

  return data;
}

/**
 * Fetch GitHub repositories
 */
export async function fetchGitHubRepositories(): Promise<GitHubRepository[]> {
  const cacheKey = `github-repos-${GITHUB_USERNAME}`;
  const cached = getFromCache<GitHubRepository[]>(cacheKey);

  if (cached) {
    return cached;
  }

  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = await response.json();
  saveToCache(cacheKey, data);

  return data;
}

/**
 * Fetch GitHub public events
 */
export async function fetchGitHubEvents(): Promise<GitHubEvent[]> {
  const cacheKey = `github-events-${GITHUB_USERNAME}`;
  const cached = getFromCache<GitHubEvent[]>(cacheKey);

  if (cached) {
    return cached;
  }

  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  const data = await response.json();
  saveToCache(cacheKey, data);

  return data;
}

/**
 * Calculate language breakdown from repositories
 */
function calculateLanguages(repos: GitHubRepository[]): Record<string, number> {
  const languages: Record<string, number> = {};

  repos.forEach(repo => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });

  return languages;
}

/**
 * Fetch all GitHub stats with caching
 */
export async function fetchGitHubStats(): Promise<GitHubStats> {
  try {
    const [user, repositories, events] = await Promise.all([
      fetchGitHubUser(),
      fetchGitHubRepositories(),
      fetchGitHubEvents()
    ]);

    const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = repositories.reduce((sum, repo) => sum + repo.forks_count, 0);
    const languages = calculateLanguages(repositories);

    return {
      user,
      totalStars,
      totalForks,
      repositories,
      events: events.slice(0, 10), // Only keep 10 most recent
      languages
    };
  } catch (error) {
    console.error('Failed to fetch GitHub stats:', error);
    throw error;
  }
}

/**
 * Get contribution count from events (simplified)
 * Note: GitHub API doesn't provide actual contribution data
 * This is an approximation based on public events
 */
export function getContributionCountFromEvents(events: GitHubEvent[]): number {
  return events.filter(event =>
    ['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'CreateEvent'].includes(event.type)
  ).length;
}

/**
 * Format event type for display
 */
export function formatEventType(type: string): string {
  const typeMap: Record<string, string> = {
    PushEvent: 'Pushed code',
    PullRequestEvent: 'Pull request',
    IssuesEvent: 'Issue',
    CreateEvent: 'Created',
    WatchEvent: 'Starred',
    ForkEvent: 'Forked',
    DeleteEvent: 'Deleted',
    PublicEvent: 'Made public'
  };

  return typeMap[type] || type;
}
