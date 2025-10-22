'use client';

/**
 * Filter Bar Component
 *
 * Technology filter buttons for projects grid.
 * Features:
 * - "All" option to show all projects
 * - Individual technology filters
 * - Active state styling
 * - Responsive horizontal scroll on mobile
 * - Project count for each filter
 *
 * @module FilterBar
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Project } from '@/lib/data/projects-data';

export interface FilterBarProps {
  technologies: string[];
  selectedTechnology: string;
  onSelectTechnology: (technology: string) => void;
  allProjects: Project[];
  filteredProjects: Project[];
  isFiltered: boolean;
}

export default function FilterBar({
  technologies,
  selectedTechnology,
  onSelectTechnology,
  allProjects,
  filteredProjects,
  isFiltered
}: FilterBarProps): React.ReactElement {
  /**
   * Get project count for a technology
   */
  const getCountForTechnology = (tech: string): number => {
    if (tech === 'all') {
      return allProjects.length;
    }

    const lowerTech = tech.toLowerCase();
    return allProjects.filter(project =>
      project.technologies.some(t => t.toLowerCase().includes(lowerTech))
    ).length;
  };

  /**
   * Popular/featured technologies to show first
   */
  const featuredTechs = ['all', 'TypeScript', 'React', 'Next.js', 'C#', 'Angular', 'AWS', 'Azure'];
  const otherTechs = technologies.filter(t => !featuredTechs.includes(t));

  return (
    <div className="space-y-4">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-semibold text-white">Filter by Technology</h3>
        </div>

        {/* Clear Filter */}
        <AnimatePresence>
          {isFiltered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSelectTechnology('all')}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4 mr-1" />
                Clear Filter
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-400">
        Showing <span className="text-white font-semibold">{filteredProjects.length}</span> of{' '}
        <span className="text-white font-semibold">{allProjects.length}</span> projects
      </div>

      {/* Filter Buttons */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600">
        <div className="flex gap-2 min-w-max">
          {/* Featured Technologies */}
          {featuredTechs.filter(t => technologies.includes(t)).map((tech) => {
            const count = getCountForTechnology(tech);
            const isActive = selectedTechnology === tech;

            return (
              <Button
                key={tech}
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                onClick={() => onSelectTechnology(tech)}
                className={cn(
                  'relative transition-all duration-200',
                  isActive
                    ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500'
                    : 'bg-gray-800/50 hover:bg-gray-700 text-gray-300 border-gray-600'
                )}
              >
                <span className="capitalize">
                  {tech === 'all' ? 'All Projects' : tech}
                </span>
                <Badge
                  variant="secondary"
                  className={cn(
                    'ml-2 h-5 px-1.5 text-xs',
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-300'
                  )}
                >
                  {count}
                </Badge>
              </Button>
            );
          })}

          {/* Divider */}
          {otherTechs.length > 0 && (
            <div className="w-px bg-gray-700 mx-2" />
          )}

          {/* Other Technologies */}
          {otherTechs.map((tech) => {
            const count = getCountForTechnology(tech);
            const isActive = selectedTechnology === tech;

            return (
              <Button
                key={tech}
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                onClick={() => onSelectTechnology(tech)}
                className={cn(
                  'relative transition-all duration-200',
                  isActive
                    ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500'
                    : 'bg-gray-800/50 hover:bg-gray-700 text-gray-300 border-gray-600'
                )}
              >
                {tech}
                <Badge
                  variant="secondary"
                  className={cn(
                    'ml-2 h-5 px-1.5 text-xs',
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-700 text-gray-300'
                  )}
                >
                  {count}
                </Badge>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Mobile Scroll Hint */}
      <div className="md:hidden text-xs text-center text-gray-500">
        ← Scroll for more filters →
      </div>
    </div>
  );
}
