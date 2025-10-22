'use client';

/**
 * GitHub Stats Component
 *
 * Displays GitHub overview statistics:
 * - Total repositories
 * - Total stars
 * - Total forks
 * - Language breakdown
 *
 * @module GitHubStats
 */

import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Star, GitFork, Code } from 'lucide-react';
import type { GitHubStats as GitHubStatsType } from '@/lib/services/github';
import { Badge } from '@/components/ui/badge';

export interface GitHubStatsProps {
  stats: GitHubStatsType;
}

export default function GitHubStats({ stats }: GitHubStatsProps): React.ReactElement {
  // Get top 5 languages
  const topLanguages = Object.entries(stats.languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const statCards = [
    {
      icon: GitBranch,
      label: 'Repositories',
      value: stats.user.public_repos,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Star,
      label: 'Total Stars',
      value: stats.totalStars,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: GitFork,
      label: 'Total Forks',
      value: stats.totalForks,
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Code,
      label: 'Languages',
      value: Object.keys(stats.languages).length,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 border border-gray-700 rounded-xl hover:border-gray-600 transition-colors"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 rounded-xl`} />

              {/* Content */}
              <div className="relative">
                <Icon className="w-6 h-6 text-gray-400 mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Top Languages */}
      {topLanguages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-6 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 border border-gray-700 rounded-xl"
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-blue-400" />
            Top Languages
          </h3>

          <div className="space-y-3">
            {topLanguages.map(([language, count], index) => {
              const percentage = (count / stats.repositories.length) * 100;

              return (
                <div key={language}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-300 font-medium">{language}</span>
                    <Badge variant="secondary" className="bg-gray-800 text-gray-300 border-gray-600">
                      {count} {count === 1 ? 'repo' : 'repos'}
                    </Badge>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export function GitHubStatsSkeleton(): React.ReactElement {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
            <div className="h-6 w-6 bg-gray-700 rounded mb-3" />
            <div className="h-8 w-16 bg-gray-700 rounded mb-2" />
            <div className="h-4 w-20 bg-gray-700 rounded" />
          </div>
        ))}
      </div>

      <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
        <div className="h-6 w-32 bg-gray-700 rounded mb-4" />
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i}>
              <div className="flex justify-between mb-2">
                <div className="h-4 w-20 bg-gray-700 rounded" />
                <div className="h-6 w-16 bg-gray-700 rounded" />
              </div>
              <div className="h-2 bg-gray-700 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
