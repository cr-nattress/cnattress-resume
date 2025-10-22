/**
 * Projects Hook
 *
 * Custom React hook for managing projects grid state including:
 * - Technology filtering
 * - Category filtering
 * - Selected project for modal
 * - URL params persistence
 *
 * @module useProjects
 */

import { useState, useCallback, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Project } from '../data/projects-data';
import { projectsData, getAllTechnologies } from '../data/projects-data';

export interface UseProjectsReturn {
  projects: Project[];
  allProjects: Project[];
  selectedProject: Project | null;
  selectedTechnology: string;
  availableTechnologies: string[];
  selectProject: (project: Project) => void;
  clearSelection: () => void;
  setTechnologyFilter: (technology: string) => void;
  isFiltered: boolean;
}

/**
 * Custom hook for projects grid management
 */
export function useProjects(): UseProjectsReturn {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get initial filter from URL params
  const initialTech = searchParams?.get('tech') || 'all';

  const [selectedTechnology, setSelectedTechnology] = useState<string>(initialTech);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  /**
   * Get all available technologies
   */
  const availableTechnologies = useMemo(() => {
    return ['all', ...getAllTechnologies()];
  }, []);

  /**
   * Filter projects by selected technology
   */
  const projects = useMemo(() => {
    if (selectedTechnology === 'all') {
      return projectsData;
    }

    const lowerTech = selectedTechnology.toLowerCase();
    return projectsData.filter(project =>
      project.technologies.some(tech => tech.toLowerCase().includes(lowerTech))
    );
  }, [selectedTechnology]);

  /**
   * Check if any filter is active
   */
  const isFiltered = selectedTechnology !== 'all';

  /**
   * Set technology filter and update URL
   */
  const setTechnologyFilter = useCallback((technology: string) => {
    setSelectedTechnology(technology);

    // Update URL params
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);

      if (technology === 'all') {
        params.delete('tech');
      } else {
        params.set('tech', technology);
      }

      const newUrl = params.toString()
        ? `${window.location.pathname}?${params.toString()}`
        : window.location.pathname;

      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  /**
   * Select a project to view in modal
   */
  const selectProject = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  /**
   * Clear project selection
   */
  const clearSelection = useCallback(() => {
    setSelectedProject(null);
  }, []);

  /**
   * Sync URL params with state on mount
   */
  useEffect(() => {
    const techParam = searchParams?.get('tech');
    if (techParam && techParam !== selectedTechnology) {
      setSelectedTechnology(techParam);
    }
  }, [searchParams]);

  return {
    projects,
    allProjects: projectsData,
    selectedProject,
    selectedTechnology,
    availableTechnologies,
    selectProject,
    clearSelection,
    setTechnologyFilter,
    isFiltered
  };
}
