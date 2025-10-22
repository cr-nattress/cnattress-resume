'use client';

/**
 * Timeline Container Component
 *
 * Horizontal scrolling container for timeline nodes.
 * Features:
 * - Native horizontal scroll with snap points
 * - Mouse wheel horizontal scroll
 * - Touch gestures for mobile
 * - Scroll indicators
 *
 * @module TimelineContainer
 */

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface TimelineContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function TimelineContainer({
  children,
  className
}: TimelineContainerProps): React.ReactElement {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  /**
   * Check scroll position to show/hide arrows
   */
  const checkScrollPosition = (): void => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  /**
   * Scroll left
   */
  const scrollLeft = (): void => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.scrollBy({
      left: -400,
      behavior: 'smooth'
    });
  };

  /**
   * Scroll right
   */
  const scrollRight = (): void => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.scrollBy({
      left: 400,
      behavior: 'smooth'
    });
  };

  /**
   * Monitor scroll position
   */
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Initial check
    checkScrollPosition();

    // Listen for scroll events
    container.addEventListener('scroll', checkScrollPosition);

    // Listen for resize events
    window.addEventListener('resize', checkScrollPosition);

    return () => {
      container.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, []);

  /**
   * Handle horizontal scroll with mouse wheel
   * Uses native event listener to allow preventDefault
   */
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent): void => {
      // Only handle horizontal scroll if not already scrolling horizontally
      if (e.deltaX === 0 && e.deltaY !== 0) {
        e.preventDefault();
        container.scrollBy({
          left: e.deltaY,
          behavior: 'auto'
        });
      }
    };

    // Use native event listener with passive: false to allow preventDefault
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className={cn('relative w-full', className)}>
      {/* Left scroll arrow */}
      {showLeftArrow && (
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Button
            variant="outline"
            size="icon"
            className="pointer-events-auto bg-gray-900/90 border-gray-700 hover:bg-gray-800 shadow-lg"
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </motion.div>
      )}

      {/* Scrollable container */}
      <div
        ref={scrollContainerRef}
        className={cn(
          'overflow-x-auto overflow-y-hidden',
          'scroll-smooth scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600',
          'px-8 py-12'
        )}
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div className="flex items-center gap-8 min-w-max">
          {children}
        </div>
      </div>

      {/* Right scroll arrow */}
      {showRightArrow && (
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Button
            variant="outline"
            size="icon"
            className="pointer-events-auto bg-gray-900/90 border-gray-700 hover:bg-gray-800 shadow-lg"
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </motion.div>
      )}

      {/* Scroll hint */}
      <div className="flex justify-center mt-4">
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <span>← Scroll or use arrow keys to navigate →</span>
        </div>
      </div>
    </div>
  );
}
