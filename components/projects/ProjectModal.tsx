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

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Calendar, Folder, CheckCircle2, Clock, Archive, Code2, Sparkles } from 'lucide-react';
import type { Project } from '@/lib/data/projects-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getCsrfToken } from '@/lib/utils/csrf-token';
import { API_ENDPOINTS } from '@/lib/constants/api';

interface ProjectExplanation {
  technicalExplanation?: {
    architecture: string;
    keyDecisions: string[];
    dataFlow: string;
    challenges: string;
    techStack: string;
  };
  executiveSummary?: {
    problemStatement: string;
    beneficiaries: string;
    solution: string;
    impact: string;
    valueProposition: string;
  };
  keyHighlights: string[];
}

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
  const [isLoadingExplanation, setIsLoadingExplanation] = useState(false);
  const [explanation, setExplanation] = useState<ProjectExplanation | null>(null);
  const [explanationError, setExplanationError] = useState<string | null>(null);

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

  const handleAskAI = async (): Promise<void> => {
    setIsLoadingExplanation(true);
    setExplanationError(null);

    try {
      const csrfToken = getCsrfToken();
      if (!csrfToken) {
        throw new Error('CSRF token not found. Please refresh the page.');
      }

      const response = await fetch(API_ENDPOINTS.EXPLAIN_PROJECT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({
          projectTitle: project.title,
          projectDescription: project.fullDescription,
          technologies: project.technologies,
          category: project.category,
          explanationType: 'both'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate explanation');
      }

      const data = await response.json();
      setExplanation(data.explanation);

    } catch (err) {
      console.error('Project explanation error:', err);
      setExplanationError(err instanceof Error ? err.message : 'Failed to generate explanation');
    } finally {
      setIsLoadingExplanation(false);
    }
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

                  {!explanation && (
                    <Button
                      variant="default"
                      onClick={handleAskAI}
                      disabled={isLoadingExplanation}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      {isLoadingExplanation ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Ask AI to Explain
                        </>
                      )}
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

              {/* AI Explanation Error */}
              {explanationError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-red-400 text-sm">{explanationError}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAskAI}
                    className="mt-2 border-red-500/50 text-red-400 hover:bg-red-500/10"
                  >
                    Try Again
                  </Button>
                </div>
              )}

              {/* AI Explanation */}
              {explanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t border-gray-700 pt-8 space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-purple-400" />
                      AI-Powered Deep Dive
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExplanation(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      Hide
                    </Button>
                  </div>

                  {/* Key Highlights */}
                  <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-purple-300 mb-3">Key Highlights</h4>
                    <ul className="space-y-2">
                      {explanation.keyHighlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-300">
                          <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Executive Summary */}
                  {explanation.executiveSummary && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 space-y-4">
                      <h4 className="text-lg font-semibold text-blue-300 mb-3">Executive Summary</h4>

                      <div>
                        <h5 className="text-sm font-semibold text-blue-200 mb-1">Problem Statement</h5>
                        <p className="text-gray-300 text-sm">{explanation.executiveSummary.problemStatement}</p>
                      </div>

                      <div>
                        <h5 className="text-sm font-semibold text-blue-200 mb-1">Solution</h5>
                        <p className="text-gray-300 text-sm">{explanation.executiveSummary.solution}</p>
                      </div>

                      <div>
                        <h5 className="text-sm font-semibold text-blue-200 mb-1">Impact</h5>
                        <p className="text-gray-300 text-sm">{explanation.executiveSummary.impact}</p>
                      </div>

                      <div>
                        <h5 className="text-sm font-semibold text-blue-200 mb-1">Value Proposition</h5>
                        <p className="text-gray-300 text-sm">{explanation.executiveSummary.valueProposition}</p>
                      </div>
                    </div>
                  )}

                  {/* Technical Deep Dive */}
                  {explanation.technicalExplanation && (
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-6 space-y-4">
                      <h4 className="text-lg font-semibold text-orange-300 mb-3">Technical Deep Dive</h4>

                      <div>
                        <h5 className="text-sm font-semibold text-orange-200 mb-1">Architecture</h5>
                        <p className="text-gray-300 text-sm">{explanation.technicalExplanation.architecture}</p>
                      </div>

                      <div>
                        <h5 className="text-sm font-semibold text-orange-200 mb-1">Key Technical Decisions</h5>
                        <ul className="space-y-1">
                          {explanation.technicalExplanation.keyDecisions.map((decision, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                              <span className="text-orange-400">•</span>
                              <span>{decision}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-sm font-semibold text-orange-200 mb-1">Data Flow</h5>
                        <p className="text-gray-300 text-sm">{explanation.technicalExplanation.dataFlow}</p>
                      </div>

                      <div>
                        <h5 className="text-sm font-semibold text-orange-200 mb-1">Technical Challenges</h5>
                        <p className="text-gray-300 text-sm">{explanation.technicalExplanation.challenges}</p>
                      </div>

                      <div>
                        <h5 className="text-sm font-semibold text-orange-200 mb-1">Technology Stack Rationale</h5>
                        <p className="text-gray-300 text-sm">{explanation.technicalExplanation.techStack}</p>
                      </div>
                    </div>
                  )}

                  <p className="text-center text-gray-500 text-xs">
                    This explanation was generated using AI to provide deeper insights into the project architecture and impact.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
