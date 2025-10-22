/**
 * Zod validation schemas for Job Analyzer API
 */

import { z } from 'zod';

/**
 * Schema for job analyzer API requests
 */
export const JobAnalyzerRequestSchema = z.object({
  jobDescription: z.string()
    .min(100, 'Job description too short (minimum 100 characters)')
    .max(50000, 'Job description too long (maximum 50,000 characters)')
    .trim(),
});

/**
 * Inferred TypeScript type from schema
 */
export type JobAnalyzerRequest = z.infer<typeof JobAnalyzerRequestSchema>;
