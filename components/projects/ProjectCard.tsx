'use client';

/**
 * Project Card Component
 *
 * Displays a project summary card with:
 * - Project title and short description
 * - Technology badges
 * - Status indicator
 * - Hover effects
 * - Click to view details
 *
 * @module ProjectCard
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code2, CheckCircle2, Clock, Archive } from 'lucide-react';
import type { Project } from '@/lib/data/projects-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

export default function ProjectCard({
  project,
  onClick,
  index
}: ProjectCardProps): React.ReactElement {
  const statusConfig = {
    completed: { icon: CheckCircle2, label: 'Completed', color: 'text-green-400 bg-green-500/10 border-green-500/30' },
    'in-progress': { icon: Clock, label: 'In Progress', color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
    archived: { icon: Archive, label: 'Archived', color: 'text-gray-400 bg-gray-500/10 border-gray-500/30' }
  };

  const status = statusConfig[project.status];
  const StatusIcon = status.icon;

  const categoryColors = {
    web: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    api: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    architecture: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    fullstack: 'bg-green-500/10 text-green-400 border-green-500/30'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={cn(
        'group relative h-full',
        'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800',
        'border border-gray-700 rounded-xl overflow-hidden',
        'hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20',
        'transition-all duration-300 cursor-pointer'
      )}
      onClick={onClick}
    >
      {/* Category Badge - Top Left */}
      <div className="absolute top-4 left-4 z-10">
        <Badge className={cn('font-medium capitalize', categoryColors[project.category])}>
          <Code2 className="w-3 h-3 mr-1" />
          {project.category}
        </Badge>
      </div>

      {/* Status Badge - Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <Badge className={cn('font-medium', status.color)}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {status.label}
        </Badge>
      </div>

      {/* Image Placeholder / Gradient */}
      <div className="relative h-48 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <Code2 className="w-16 h-16 text-white/20" />
        </div>

        {/* Year badge */}
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 text-xs font-mono font-bold text-white bg-black/50 backdrop-blur-sm rounded-full border border-white/20">
            {project.year}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
          {project.title}
        </h3>

        {/* Short Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {project.shortDescription}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <Badge
              key={i}
              variant="secondary"
              className="text-xs bg-gray-800 text-gray-300 border-gray-600"
            >
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge
              variant="secondary"
              className="text-xs bg-gray-800 text-gray-300 border-gray-600"
            >
              +{project.technologies.length - 4}
            </Badge>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div className="flex gap-2">
            {project.github && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-gray-400 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.github, '_blank');
                }}
              >
                <Github className="w-4 h-4 mr-1" />
                Code
              </Button>
            )}
            {project.demo && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-gray-400 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.demo, '_blank');
                }}
              >
                <ExternalLink className="w-4 h-4 mr-1" />
                Demo
              </Button>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
          >
            View Details →
          </Button>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
      </div>
    </motion.div>
  );
}
