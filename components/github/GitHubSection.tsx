'use client';

/**
 * GitHub Section Component
 *
 * Main section displaying live GitHub data:
 * - GitHub stats overview
 * - Recent activity feed
 * - Link to GitHub profile
 *
 * @module GitHubSection
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, AlertTriangle, RefreshCw } from 'lucide-react';
import { useGitHub } from '@/lib/hooks/useGitHub';
import GitHubStats, { GitHubStatsSkeleton } from './GitHubStats';
import ActivityFeed, { ActivityFeedSkeleton } from './ActivityFeed';
import { Button } from '@/components/ui/button';

export default function GitHubSection(): React.ReactElement {
  const { data, isLoading, error, refetch } = useGitHub();

  return (
    <section
      id="github"
      className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text flex items-center justify-center gap-3">
              <Github className="w-10 h-10" />
              GitHub Activity
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-6">
            Live stats and recent contributions from my GitHub profile
          </p>

          {data && (
            <a
              href={`https://github.com/${data.user.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>@{data.user.login}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <GitHubStatsSkeleton />
              </div>

              <div>
                <div className="h-6 w-32 bg-gray-700 rounded mb-4 animate-pulse" />
                <ActivityFeedSkeleton />
              </div>
            </div>
          </motion.div>
        )}

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="p-8 bg-red-500/10 border border-red-500/30 rounded-xl">
              <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Failed to load GitHub data
              </h3>
              <p className="text-gray-400 mb-6">
                {error.message || 'Unable to fetch GitHub statistics. Please try again later.'}
              </p>
              <Button
                onClick={refetch}
                className="bg-red-600 hover:bg-red-700"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </motion.div>
        )}

        {/* Content */}
        {data && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Stats - Takes 2/3 width on desktop */}
              <div className="lg:col-span-2">
                <GitHubStats stats={data} />
              </div>

              {/* Activity Feed - Takes 1/3 width on desktop */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Github className="w-5 h-5 text-blue-400" />
                  Recent Activity
                </h3>

                <div className="max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
                  <ActivityFeed events={data.events} />
                </div>
              </div>
            </div>

            {/* Profile Link */}
            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a
                href={`https://github.com/${data.user.login}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg border border-gray-600 transition-colors duration-200"
              >
                <Github className="w-5 h-5" />
                View Full GitHub Profile
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Cache Info */}
            <div className="mt-8 text-center text-sm text-gray-500">
              Data cached for 1 hour to avoid API rate limits
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
