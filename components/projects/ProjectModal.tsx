'use client';

/**
 * Project Modal Component
 *
 * Full-screen modal showing detailed project information:
 * - Full description
 * - Complete feature list
 * - All technologies
 * - Links to GitHub and demo
 * - Project metadata
 *
 * @module ProjectModal
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Calendar, Folder, CheckCircle2, Clock, Archive, Code2 } from 'lucide-react';
import type { Project } from '@/lib/data/projects-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose
}: ProjectModalProps): React.ReactElement {
  if (!project) return <></>;

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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={cn(
              'relative w-full max-w-4xl max-h-[90vh] overflow-y-auto',
              'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800',
              'border border-gray-700 rounded-2xl shadow-2xl'
            )}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
              <span className="sr-only">Close</span>
            </Button>

            {/* Header Section */}
            <div className="relative p-8 pb-6 border-b border-gray-700">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-t-2xl" />

              <div className="relative">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className={cn('font-medium capitalize', categoryColors[project.category])}>
                    <Folder className="w-3 h-3 mr-1" />
                    {project.category}
                  </Badge>

                  <Badge className={cn('font-medium', status.color)}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {status.label}
                  </Badge>

                  <Badge variant="secondary" className="bg-gray-800 text-gray-300 border-gray-600">
                    <Calendar className="w-3 h-3 mr-1" />
                    {project.year}
                  </Badge>
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {project.title}
                </h2>

                {/* Short Description */}
                <p className="text-lg text-gray-300">
                  {project.shortDescription}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mt-6">
                  {project.github && (
                    <Button
                      variant="default"
                      onClick={() => window.open(project.github, '_blank')}
                      className="bg-gray-800 hover:bg-gray-700 text-white"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Source Code
                    </Button>
                  )}

                  {project.demo && (
                    <Button
                      variant="default"
                      onClick={() => window.open(project.demo, '_blank')}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Full Description */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-blue-400" />
                  Project Overview
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {/* Key Features */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feature, index) => (
                    <motion.li
                      key={index}
                      className="flex gap-3 text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <motion.div
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.03 }}
                    >
                      <Badge
                        variant="secondary"
                        className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-sm py-1.5"
                      >
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
