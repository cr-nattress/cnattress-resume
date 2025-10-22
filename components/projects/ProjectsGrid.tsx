'use client';

/**
 * Projects Grid Component
 *
 * Main projects section that combines all project components:
 * - FilterBar for technology filtering
 * - Responsive grid of ProjectCards
 * - ProjectModal for detailed views
 * - Animations for filter transitions
 *
 * @module ProjectsGrid
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '@/lib/hooks/useProjects';
import { getProjectStats } from '@/lib/data/projects-data';
import FilterBar from './FilterBar';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

export default function ProjectsGrid(): React.ReactElement {
  const {
    projects,
    allProjects,
    selectedProject,
    selectedTechnology,
    availableTechnologies,
    selectProject,
    clearSelection,
    setTechnologyFilter,
    isFiltered
  } = useProjects();

  const stats = getProjectStats();

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-b from-black via-gray-900 to-black"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Real-world applications showcasing expertise in full-stack development,
            microservices architecture, and cloud-native solutions
          </p>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{stats.total}</div>
              <div className="text-sm text-gray-400">Total Projects</div>
            </div>

            <div className="p-4 bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
              <div className="text-sm text-gray-400">Completed</div>
            </div>

            <div className="p-4 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">{stats.inProgress}</div>
              <div className="text-sm text-gray-400">In Progress</div>
            </div>

            <div className="p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-lg">
              <div className="text-2xl font-bold text-orange-400">
                {availableTechnologies.length - 1}
              </div>
              <div className="text-sm text-gray-400">Technologies</div>
            </div>
          </div>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FilterBar
            technologies={availableTechnologies}
            selectedTechnology={selectedTechnology}
            onSelectTechnology={setTechnologyFilter}
            allProjects={allProjects}
            filteredProjects={projects}
            isFiltered={isFiltered}
          />
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTechnology}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => selectProject(project)}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          {projects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-xl text-gray-400 mb-4">
                No projects found with the selected technology.
              </p>
              <button
                onClick={() => setTechnologyFilter('all')}
                className="text-blue-400 hover:text-blue-300 underline"
              >
                View all projects
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-400 mb-4">
            Interested in collaborating on a project?
          </p>
          <button
            onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Get in Touch
          </button>
        </motion.div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={clearSelection}
      />
    </section>
  );
}
