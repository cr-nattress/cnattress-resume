/**
 * useAnalytics Hook
 *
 * Custom React hook for tracking visitor analytics.
 * Automatically tracks page views and provides methods for custom tracking.
 *
 * @module useAnalytics
 */

import { useEffect, useRef } from 'react';
import { getSessionId } from '@/lib/utils/session';

interface TrackVisitorParams {
  pageSection?: string;
  timeSpent?: number;
  interactionType?: string;
  metadata?: Record<string, any>;
}

interface TrackProjectViewParams {
  projectName: string;
  viewDuration?: number;
  interactionData?: Record<string, any>;
}

export function useAnalytics() {
  const sessionId = useRef(getSessionId());
  const isEnabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== 'false';

  /**
   * Track visitor interaction
   */
  const trackVisitor = async (params: TrackVisitorParams) => {
    if (!isEnabled || typeof window === 'undefined') return;

    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'visitor',
          data: {
            session_id: sessionId.current,
            ...params
          }
        })
      });
    } catch (error) {
      // Silently fail - analytics shouldn't break the app
      console.debug('Analytics tracking failed:', error);
    }
  };

  /**
   * Track project view
   */
  const trackProjectView = async (params: TrackProjectViewParams) => {
    if (!isEnabled || typeof window === 'undefined') return;

    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'project_view',
          data: {
            session_id: sessionId.current,
            ...params
          }
        })
      });
    } catch (error) {
      console.debug('Project view tracking failed:', error);
    }
  };

  /**
   * Track page view on mount
   */
  useEffect(() => {
    if (!isEnabled) return;

    const startTime = Date.now();

    // Track initial page view
    trackVisitor({
      pageSection: 'page_view',
      interactionType: 'load',
      metadata: {
        pathname: window.location.pathname,
        referrer: document.referrer
      }
    });

    // Track time spent on page when leaving
    const handleBeforeUnload = () => {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      trackVisitor({
        pageSection: 'page_view',
        timeSpent,
        interactionType: 'unload',
        metadata: {
          pathname: window.location.pathname
        }
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isEnabled]);

  return {
    trackVisitor,
    trackProjectView,
    sessionId: sessionId.current
  };
}
