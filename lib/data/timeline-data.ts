/**
 * Career Timeline Data
 *
 * Transforms resume experience data into timeline format for the interactive career timeline component.
 * Provides structured data with proper date parsing and sorting for chronological display.
 *
 * @module timeline-data
 */

import { resumeData, type Experience } from '../ai/resume-context';

/**
 * Timeline item representing a career position
 */
export interface TimelineItem {
  id: string;
  company: string;
  position: string;
  startDate: Date;
  endDate?: Date; // undefined for current role
  period: string; // Original period string for display
  description: string;
  achievements: string[];
  technologies: string[];
  logo?: string;
  location: string;
}

/**
 * Parse period string into start and end dates
 * Handles formats like:
 * - "2024 – Current"
 * - "2021 – 2024"
 * - "2024" (single year)
 * - "2006 – 2016"
 */
function parsePeriod(period: string): { startDate: Date; endDate?: Date } {
  // Clean up the period string (handle various dash types)
  const cleanPeriod = period.replace(/–|—|-/g, '-').trim();

  // Check for current role
  if (cleanPeriod.includes('Current')) {
    const startYear = parseInt(cleanPeriod.split('-')[0].trim());
    return {
      startDate: new Date(startYear, 0, 1),
      endDate: undefined
    };
  }

  // Split by dash to get start and end
  const parts = cleanPeriod.split('-').map(p => p.trim());

  if (parts.length === 2) {
    const startYear = parseInt(parts[0]);
    const endYear = parseInt(parts[1]);
    return {
      startDate: new Date(startYear, 0, 1),
      endDate: new Date(endYear, 11, 31)
    };
  } else {
    // Single year
    const year = parseInt(parts[0]);
    return {
      startDate: new Date(year, 0, 1),
      endDate: new Date(year, 11, 31)
    };
  }
}

/**
 * Transform resume experience into timeline items
 */
function transformExperienceToTimeline(experience: Experience[]): TimelineItem[] {
  return experience.map((exp, index) => {
    const { startDate, endDate } = parsePeriod(exp.period);

    return {
      id: `timeline-${index}-${exp.company.toLowerCase().replace(/\s+/g, '-')}`,
      company: exp.company,
      position: exp.role,
      startDate,
      endDate,
      period: exp.period,
      description: exp.description,
      achievements: exp.achievements,
      technologies: exp.technologies,
      location: exp.location,
      logo: undefined // Can be added later if company logos are available
    };
  });
}

/**
 * Sort timeline items chronologically (earliest to latest)
 */
function sortTimelineChronologically(items: TimelineItem[]): TimelineItem[] {
  return [...items].sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
}

/**
 * Get all career timeline data sorted chronologically
 */
export function getTimelineData(): TimelineItem[] {
  const timelineItems = transformExperienceToTimeline(resumeData.experience);
  return sortTimelineChronologically(timelineItems);
}

/**
 * Get timeline item by ID
 */
export function getTimelineItemById(id: string): TimelineItem | undefined {
  const items = getTimelineData();
  return items.find(item => item.id === id);
}

/**
 * Get the current position (no end date)
 */
export function getCurrentPosition(): TimelineItem | undefined {
  const items = getTimelineData();
  return items.find(item => item.endDate === undefined);
}

/**
 * Get all technologies used across the timeline
 */
export function getTimelineTechnologies(): string[] {
  const items = getTimelineData();
  const allTech = items.flatMap(item => item.technologies);
  return [...new Set(allTech)].sort();
}

/**
 * Get timeline items by technology
 */
export function getTimelineItemsByTechnology(technology: string): TimelineItem[] {
  const items = getTimelineData();
  const lowerTech = technology.toLowerCase();
  return items.filter(item =>
    item.technologies.some(tech => tech.toLowerCase().includes(lowerTech))
  );
}

/**
 * Calculate total years of experience from timeline
 */
export function calculateTotalExperience(): number {
  const items = getTimelineData();

  // Get unique date ranges (handle overlapping positions)
  const dateRanges: Array<{ start: Date; end: Date }> = items.map(item => ({
    start: item.startDate,
    end: item.endDate || new Date()
  }));

  // Sort by start date
  dateRanges.sort((a, b) => a.start.getTime() - b.start.getTime());

  // Merge overlapping ranges
  const mergedRanges: Array<{ start: Date; end: Date }> = [];
  let currentRange = dateRanges[0];

  for (let i = 1; i < dateRanges.length; i++) {
    const range = dateRanges[i];

    if (range.start <= currentRange.end) {
      // Overlapping or adjacent - merge
      currentRange.end = new Date(Math.max(currentRange.end.getTime(), range.end.getTime()));
    } else {
      // Non-overlapping - save current and start new
      mergedRanges.push(currentRange);
      currentRange = range;
    }
  }
  mergedRanges.push(currentRange);

  // Calculate total years
  const totalMs = mergedRanges.reduce((sum, range) => {
    return sum + (range.end.getTime() - range.start.getTime());
  }, 0);

  const totalYears = totalMs / (1000 * 60 * 60 * 24 * 365.25);
  return Math.round(totalYears * 10) / 10; // Round to 1 decimal place
}
