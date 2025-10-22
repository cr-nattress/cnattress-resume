'use client';

/**
 * Timeline Node Component
 *
 * Represents a single career position as a clickable node on the timeline.
 * Shows company name, years, and visual indicator for current position.
 *
 * @module TimelineNode
 */

import React from 'react';
import { motion } from 'framer-motion';
import type { TimelineItem } from '@/lib/data/timeline-data';
import { cn } from '@/lib/utils';

export interface TimelineNodeProps {
  item: TimelineItem;
  isSelected: boolean;
  isCurrent: boolean;
  onClick: () => void;
}

export default function TimelineNode({
  item,
  isSelected,
  isCurrent,
  onClick
}: TimelineNodeProps): React.ReactElement {
  const startYear = item.startDate.getFullYear();
  const endYear = item.endDate ? item.endDate.getFullYear() : 'Now';

  return (
    <motion.div
      id={item.id}
      className="flex flex-col items-center min-w-[200px] scroll-snap-align-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Year label */}
      <div className="text-sm text-gray-400 mb-2 font-mono">
        {startYear}
        {endYear !== startYear && (
          <>
            {' - '}
            {endYear}
          </>
        )}
      </div>

      {/* Timeline line and node */}
      <div className="relative w-full flex items-center">
        {/* Left line */}
        <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-gray-700 to-gray-700" />

        {/* Node circle */}
        <motion.button
          onClick={onClick}
          className={cn(
            'relative z-10 w-6 h-6 rounded-full border-2 transition-all duration-300',
            'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
            'hover:scale-125',
            isSelected
              ? 'bg-blue-500 border-blue-500 shadow-lg shadow-blue-500/50 scale-125'
              : isCurrent
                ? 'bg-green-500 border-green-500 shadow-md shadow-green-500/30'
                : 'bg-gray-800 border-gray-600 hover:border-gray-400'
          )}
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 1.1 }}
          aria-label={`View details for ${item.position} at ${item.company}`}
          aria-pressed={isSelected}
        >
          {/* Inner dot for current position */}
          {isCurrent && !isSelected && (
            <motion.div
              className="absolute inset-0 m-auto w-2 h-2 bg-white rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.button>

        {/* Right line */}
        <div className="flex-1 h-[2px] bg-gradient-to-r from-gray-700 to-transparent" />
      </div>

      {/* Company label */}
      <motion.div
        className={cn(
          'mt-2 text-center transition-all duration-300',
          isSelected
            ? 'text-white font-semibold'
            : 'text-gray-400 hover:text-gray-300'
        )}
      >
        <div className="text-sm font-medium">{item.company}</div>
        <div className="text-xs text-gray-500 mt-0.5">{item.position}</div>
      </motion.div>

      {/* Current indicator badge */}
      {isCurrent && (
        <motion.div
          className="mt-1 px-2 py-0.5 text-xs font-medium text-green-400 bg-green-500/10 border border-green-500/30 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          Current
        </motion.div>
      )}
    </motion.div>
  );
}
