/**
 * Zod validation schemas for Analytics API
 */

import { z } from 'zod';

/**
 * Schema for visitor analytics events
 */
export const VisitorEventSchema = z.object({
  type: z.literal('visitor'),
  data: z.object({
    session_id: z.string().min(10, 'Session ID must be at least 10 characters'),
    page_section: z.string().optional(),
    time_spent: z.number().nonnegative().optional(),
    interaction_type: z.string().optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
  }),
});

/**
 * Schema for project view analytics events
 */
export const ProjectViewEventSchema = z.object({
  type: z.literal('project_view'),
  data: z.object({
    session_id: z.string().min(10, 'Session ID must be at least 10 characters'),
    project_name: z.string().min(1, 'Project name is required for project view events'),
    view_duration: z.number().nonnegative().optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
  }),
});

/**
 * Discriminated union of all analytics event types
 */
export const AnalyticsEventSchema = z.discriminatedUnion('type', [
  VisitorEventSchema,
  ProjectViewEventSchema,
]);

/**
 * Inferred TypeScript type from schema
 */
export type AnalyticsEvent = z.infer<typeof AnalyticsEventSchema>;
