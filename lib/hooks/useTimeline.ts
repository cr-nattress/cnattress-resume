/**
 * Timeline Hook
 *
 * Custom React hook for managing timeline component state including:
 * - Selected node tracking
 * - Scroll position management
 * - Keyboard navigation
 * - Animation states
 *
 * @module useTimeline
 */

import { useState, useCallback, useEffect } from 'react';
import type { TimelineItem } from '../data/timeline-data';

export interface UseTimelineReturn {
  selectedId: string | null;
  selectNode: (id: string) => void;
  clearSelection: () => void;
  isExpanded: (id: string) => boolean;
  navigateNext: () => void;
  navigatePrevious: () => void;
  scrollToNode: (id: string) => void;
}

export interface UseTimelineOptions {
  items: TimelineItem[];
  initialSelectedId?: string;
  onSelectionChange?: (id: string | null) => void;
}

/**
 * Custom hook for timeline component state management
 */
export function useTimeline({
  items,
  initialSelectedId,
  onSelectionChange
}: UseTimelineOptions): UseTimelineReturn {
  const [selectedId, setSelectedId] = useState<string | null>(initialSelectedId ?? null);

  /**
   * Select a timeline node
   */
  const selectNode = useCallback((id: string) => {
    setSelectedId(id);
    onSelectionChange?.(id);

    // Scroll to the selected node
    scrollToNode(id);
  }, [onSelectionChange]);

  /**
   * Clear selection
   */
  const clearSelection = useCallback(() => {
    setSelectedId(null);
    onSelectionChange?.(null);
  }, [onSelectionChange]);

  /**
   * Check if a node is expanded
   */
  const isExpanded = useCallback((id: string): boolean => {
    return selectedId === id;
  }, [selectedId]);

  /**
   * Navigate to next node
   */
  const navigateNext = useCallback(() => {
    const currentIndex = items.findIndex(item => item.id === selectedId);

    if (currentIndex === -1) {
      // No selection, select first
      if (items.length > 0) {
        selectNode(items[0].id);
      }
    } else if (currentIndex < items.length - 1) {
      // Move to next
      selectNode(items[currentIndex + 1].id);
    }
  }, [items, selectedId, selectNode]);

  /**
   * Navigate to previous node
   */
  const navigatePrevious = useCallback(() => {
    const currentIndex = items.findIndex(item => item.id === selectedId);

    if (currentIndex === -1) {
      // No selection, select last
      if (items.length > 0) {
        selectNode(items[items.length - 1].id);
      }
    } else if (currentIndex > 0) {
      // Move to previous
      selectNode(items[currentIndex - 1].id);
    }
  }, [items, selectedId, selectNode]);

  /**
   * Scroll to a specific node
   */
  const scrollToNode = useCallback((id: string) => {
    // Use setTimeout to ensure DOM is updated
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }, 100);
  }, []);

  /**
   * Handle keyboard navigation
   */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if timeline is visible and not typing in input
      if (document.activeElement?.tagName === 'INPUT' ||
          document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          navigateNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          navigatePrevious();
          break;
        case 'Escape':
          e.preventDefault();
          clearSelection();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateNext, navigatePrevious, clearSelection]);

  return {
    selectedId,
    selectNode,
    clearSelection,
    isExpanded,
    navigateNext,
    navigatePrevious,
    scrollToNode
  };
}
