"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCsrfToken } from "@/lib/utils/csrf-token";
import { API_ENDPOINTS } from "@/lib/constants/api";

type RoleType = 'frontend' | 'backend' | 'fullstack' | 'devops' | 'ai-ml';

interface RegeneratedContent {
  summary: string;
  topHighlights: string[];
  focusSkills: string[];
}

export default function ResumeRegenerator() {
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [regeneratedContent, setRegeneratedContent] = useState<RegeneratedContent | null>(null);

  const roleOptions: { value: RoleType; label: string; description: string }[] = [
    {
      value: 'frontend',
      label: 'Frontend Developer',
      description: 'Emphasizes Angular, React, UI/UX, and modern frontend frameworks'
    },
    {
      value: 'backend',
      label: 'Backend Developer',
      description: 'Highlights C#/.NET, APIs, microservices, and database design'
    },
    {
      value: 'fullstack',
      label: 'Full-Stack Developer',
      description: 'Balanced focus on both frontend and backend technologies'
    },
    {
      value: 'devops',
      label: 'DevOps Engineer',
      description: 'Showcases CI/CD, cloud infrastructure, and automation'
    },
    {
      value: 'ai-ml',
      label: 'AI/ML Developer',
      description: 'Features LLM integrations, AI tools, and intelligent automation'
    }
  ];

  const regenerateResume = useCallback(async (roleType: RoleType) => {
    setIsLoading(true);
    setError(null);
    setRegeneratedContent(null);

    try {
      const csrfToken = getCsrfToken();
      if (!csrfToken) {
        throw new Error('CSRF token not found. Please refresh the page.');
      }

      const response = await fetch(API_ENDPOINTS.REGENERATE_RESUME, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ roleType }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to regenerate resume');
      }

      const data = await response.json();

      // Strip markdown code blocks if present (```json ... ```)
      let cleanContent = data.content.trim();
      if (cleanContent.startsWith('```json')) {
        cleanContent = cleanContent.replace(/^```json\s*\n/, '').replace(/\n```\s*$/, '');
      } else if (cleanContent.startsWith('```')) {
        cleanContent = cleanContent.replace(/^```\s*\n/, '').replace(/\n```\s*$/, '');
      }

      // Parse the JSON response from Claude
      const content = JSON.parse(cleanContent);
      setRegeneratedContent(content);
      setSelectedRole(roleType);

    } catch (err) {
      console.error('Resume regeneration error:', err);
      setError(err instanceof Error ? err.message : 'Failed to regenerate resume');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleRoleSelect = (roleType: RoleType): void => {
    regenerateResume(roleType);
  };

  const resetView = (): void => {
    setSelectedRole(null);
    setRegeneratedContent(null);
    setError(null);
  };

  return (
    <section id="resume-regenerator" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            Dynamic Resume Tailoring
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how my experience aligns with different role types. Select a focus area below
            to see my resume dynamically adapted using AI.
          </p>
        </div>

        {!regeneratedContent && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {roleOptions.map((option) => (
              <Card
                key={option.value}
                className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                onClick={() => !isLoading && handleRoleSelect(option.value)}
              >
                <CardHeader>
                  <CardTitle className="text-xl text-white">{option.label}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    disabled={isLoading}
                  >
                    {isLoading && selectedRole === option.value ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Tailoring...
                      </>
                    ) : (
                      'Tailor Resume'
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {error && (
          <div className="max-w-3xl mx-auto mt-8 p-6 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400">{error}</p>
            <Button
              onClick={resetView}
              variant="outline"
              className="mt-4 border-red-500/50 text-red-400 hover:bg-red-500/10"
            >
              Try Again
            </Button>
          </div>
        )}

        {regeneratedContent && (
          <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold gradient-text">
                {roleOptions.find(r => r.value === selectedRole)?.label} Focus
              </h3>
              <Button
                onClick={resetView}
                className="bg-white/10 border border-white/30 text-white hover:bg-white/20 transition-colors font-semibold"
              >
                Change Role Type
              </Button>
            </div>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-6">
              <CardHeader>
                <CardTitle className="text-white">Tailored Professional Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">{regeneratedContent.summary}</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-6">
              <CardHeader>
                <CardTitle className="text-white">Key Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {regeneratedContent.topHighlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-6 h-6 text-blue-400 mr-3 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-gray-300">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Focus Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {regeneratedContent.focusSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <p className="text-center text-gray-500 text-sm mt-6">
              This content was dynamically generated using AI to emphasize relevant experience for this role type.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
