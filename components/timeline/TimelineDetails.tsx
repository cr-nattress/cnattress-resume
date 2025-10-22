'use client';

/**
 * Timeline Details Component
 *
 * Expandable panel showing detailed information about a career position:
 * - Company and role
 * - Date range and location
 * - Description
 * - Key achievements
 * - Technologies used (as badges)
 * - AI-generated insight (loaded separately)
 *
 * @module TimelineDetails
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Briefcase, Sparkles } from 'lucide-react';
import type { TimelineItem } from '@/lib/data/timeline-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface TimelineDetailsProps {
  item: TimelineItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function TimelineDetails({
  item,
  isOpen,
  onClose
}: TimelineDetailsProps): React.ReactElement {
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);

  // Load AI insight when panel opens
  useEffect(() => {
    if (isOpen && !aiInsight) {
      loadAiInsight();
    }
  }, [isOpen]);

  /**
   * Load AI insight from localStorage cache or API
   */
  const loadAiInsight = async (): Promise<void> => {
    // Check localStorage cache first
    const cacheKey = `timeline-insight-${item.id}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      setAiInsight(cached);
      return;
    }

    // Fetch from API
    setIsLoadingInsight(true);

    try {
      // TODO: Implement actual API call to chat endpoint
      // For now, generate a simple insight based on the data
      const insight = generateSimpleInsight(item);
      setAiInsight(insight);

      // Cache in localStorage
      localStorage.setItem(cacheKey, insight);
    } catch (error) {
      console.error('Failed to load AI insight:', error);
      setAiInsight('Unable to load insight at this time.');
    } finally {
      setIsLoadingInsight(false);
    }
  };

  /**
   * Generate a simple insight based on item data
   * TODO: Replace with actual AI API call
   */
  const generateSimpleInsight = (item: TimelineItem): string => {
    const duration = item.endDate
      ? Math.round((item.endDate.getTime() - item.startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25))
      : 'current';

    const techCount = item.technologies.length;

    if (duration === 'current') {
      return `Currently driving innovation at ${item.company}, leveraging expertise in ${techCount} key technologies to deliver impactful solutions.`;
    } else {
      return `${duration}-year tenure at ${item.company} established deep expertise in ${item.technologies.slice(0, 2).join(' and ')}, contributing to significant technical achievements.`;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={cn(
              'relative w-full max-w-3xl max-h-[90vh] overflow-y-auto',
              'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800',
              'border border-gray-700 rounded-xl shadow-2xl'
            )}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
              <span className="sr-only">Close</span>
            </Button>

            {/* Content */}
            <div className="p-8">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {item.position}
                </h2>
                <h3 className="text-xl text-blue-400 font-semibold mb-4">
                  {item.company}
                </h3>

                {/* Meta information */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{item.period}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    <span>
                      {item.endDate ? 'Past Role' : 'Current Role'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">About the Role</h4>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Key Achievements</h4>
                <ul className="space-y-2">
                  {item.achievements.map((achievement, index) => (
                    <motion.li
                      key={index}
                      className="flex gap-2 text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* AI Insight */}
              <div className="pt-6 border-t border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <h4 className="text-lg font-semibold text-white">AI Insight</h4>
                </div>

                {isLoadingInsight ? (
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                    <span>Generating insight...</span>
                  </div>
                ) : (
                  <p className="text-purple-300 bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 italic">
                    {aiInsight}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
