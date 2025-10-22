'use client';

/**
 * Timeline Section Component
 *
 * Main section component that brings together all timeline functionality:
 * - Renders all career positions chronologically
 * - Manages selection state
 * - Handles keyboard navigation
 * - Shows expandable details modal
 *
 * @module TimelineSection
 */

import React from 'react';
import { motion } from 'framer-motion';
import { getTimelineData, calculateTotalExperience } from '@/lib/data/timeline-data';
import { useTimeline } from '@/lib/hooks/useTimeline';
import TimelineContainer from './TimelineContainer';
import TimelineNode from './TimelineNode';
import TimelineDetails from './TimelineDetails';

export default function TimelineSection(): React.ReactElement {
  const timelineData = getTimelineData();
  const totalYears = calculateTotalExperience();

  const {
    selectedId,
    selectNode,
    clearSelection,
    isExpanded
  } = useTimeline({
    items: timelineData
  });

  // Find selected item for details panel
  const selectedItem = selectedId
    ? timelineData.find(item => item.id === selectedId)
    : null;

  // Identify current position (no end date)
  const currentPositionId = timelineData.find(item => !item.endDate)?.id;

  return (
    <section
      id="timeline"
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
            <span className="gradient-text">Career Journey</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {totalYears}+ years of experience building scalable software solutions
            across healthcare, fintech, and hospitality sectors
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TimelineContainer>
            {timelineData.map((item) => (
              <TimelineNode
                key={item.id}
                item={item}
                isSelected={isExpanded(item.id)}
                isCurrent={item.id === currentPositionId}
                onClick={() => selectNode(item.id)}
              />
            ))}
          </TimelineContainer>
        </motion.div>

        {/* Keyboard navigation hint */}
        <motion.div
          className="text-center mt-8 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>Click any position to see details • Use ← → arrow keys to navigate • Press ESC to close</p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg">
            <div className="text-3xl font-bold text-blue-400 mb-2">{timelineData.length}</div>
            <div className="text-gray-400">Positions</div>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg">
            <div className="text-3xl font-bold text-green-400 mb-2">{totalYears}+</div>
            <div className="text-gray-400">Years Experience</div>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {new Set(timelineData.flatMap(item => item.technologies)).size}
            </div>
            <div className="text-gray-400">Technologies</div>
          </div>
        </motion.div>
      </div>

      {/* Details Modal */}
      {selectedItem && (
        <TimelineDetails
          item={selectedItem}
          isOpen={!!selectedId}
          onClose={clearSelection}
        />
      )}
    </section>
  );
}
