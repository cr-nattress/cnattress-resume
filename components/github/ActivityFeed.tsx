'use client';

/**
 * Activity Feed Component
 *
 * Displays recent GitHub activity events:
 * - Push events
 * - Pull requests
 * - Issues
 * - Stars
 * - Forks
 *
 * @module ActivityFeed
 */

import React from 'react';
import { motion } from 'framer-motion';
import { GitCommit, GitPullRequest, AlertCircle, Star, GitFork, Plus, Trash2, Eye } from 'lucide-react';
import type { GitHubEvent } from '@/lib/services/github';
import { formatEventType } from '@/lib/services/github';
import { Badge } from '@/components/ui/badge';

export interface ActivityFeedProps {
  events: GitHubEvent[];
}

export default function ActivityFeed({ events }: ActivityFeedProps): React.ReactElement {
  /**
   * Get icon for event type
   */
  const getEventIcon = (type: string) => {
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
      PushEvent: GitCommit,
      PullRequestEvent: GitPullRequest,
      IssuesEvent: AlertCircle,
      WatchEvent: Star,
      ForkEvent: GitFork,
      CreateEvent: Plus,
      DeleteEvent: Trash2,
      PublicEvent: Eye
    };

    return iconMap[type] || GitCommit;
  };

  /**
   * Format time ago
   */
  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-3">
      {events.map((event, index) => {
        const Icon = getEventIcon(event.type);
        const eventType = formatEventType(event.type);

        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex gap-3 p-3 bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700 rounded-lg transition-colors group"
          >
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <Icon className="w-4 h-4 text-blue-400" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="text-xs bg-gray-700 text-gray-300 border-gray-600"
                  >
                    {eventType}
                  </Badge>
                </div>

                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {formatTimeAgo(event.created_at)}
                </span>
              </div>

              <a
                href={`https://github.com/${event.repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-300 hover:text-white font-medium truncate block transition-colors"
              >
                {event.repo.name}
              </a>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function ActivityFeedSkeleton(): React.ReactElement {
  return (
    <div className="space-y-3 animate-pulse">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex gap-3 p-3 bg-gray-800/30 border border-gray-700 rounded-lg">
          <div className="w-8 h-8 bg-gray-700 rounded-full" />
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <div className="h-5 w-20 bg-gray-700 rounded" />
              <div className="h-4 w-16 bg-gray-700 rounded" />
            </div>
            <div className="h-4 w-3/4 bg-gray-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
