'use client';

/**
 * Animated Section Component
 *
 * Reusable wrapper for sections with scroll-triggered animations.
 * Uses Framer Motion and IntersectionObserver for optimized performance.
 * Respects prefers-reduced-motion preference.
 *
 * @module AnimatedSection
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';

export interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight' | 'scale';
  delay?: number;
  duration?: number;
  threshold?: number;
}

const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  }
};

export default function AnimatedSection({
  children,
  className,
  animation = 'fadeIn',
  delay = 0,
  duration = 0.6,
  threshold = 0.1
}: AnimatedSectionProps): React.ReactElement {
  const { ref, isVisible } = useScrollAnimation({
    threshold,
    triggerOnce: true,
    delay
  });

  const variants = animationVariants[animation];

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.div>
  );
}
