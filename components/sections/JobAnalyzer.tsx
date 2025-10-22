"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { API_ENDPOINTS } from "@/lib/constants/api";
import { useCsrf } from "@/lib/hooks/useCsrf";

interface AnalysisResult {
  matchScore: number;
  matchLevel: string;
  relevantExperience: string[];
  keyStrengths: string[];
  potentialGaps: string[];
  recommendation: string;
}

export default function JobAnalyzer(): React.ReactElement {
  const [jobDescription, setJobDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { csrfToken } = useCsrf();

  const analyzeJob = async () => {
    if (!jobDescription.trim()) {
      setError("Please paste a job description");
      return;
    }

    if (!csrfToken) {
      setError("Security token not available. Please refresh the page.");
      return;
    }

    setAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(API_ENDPOINTS.ANALYZE_JOB, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        body: JSON.stringify({ jobDescription }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze job");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Failed to analyze job. Please try again.");
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setJobDescription("");
    setResult(null);
    setError(null);
  };

  const getMatchColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-blue-400";
    if (score >= 40) return "text-yellow-400";
    return "text-orange-400";
  };

  const getMatchBgColor = (score: number) => {
    if (score >= 80) return "from-green-500/20 to-emerald-500/20 border-green-500/30";
    if (score >= 60) return "from-blue-500/20 to-cyan-500/20 border-blue-500/30";
    if (score >= 40) return "from-yellow-500/20 to-amber-500/20 border-yellow-500/30";
    return "from-orange-500/20 to-red-500/20 border-orange-500/30";
  };

  return (
    <section id="job-analyzer" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full mb-4">
              <span className="text-purple-300 text-sm font-semibold">🤖 AI-Powered Tool</span>
            </div>
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Job Fit Analyzer
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">
              Paste any job description and get an instant AI-powered analysis of how my experience matches
            </p>
          </div>

          {!result ? (
            /* Input Form */
            <Card className="bg-white/5 backdrop-blur border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Paste Job Description</CardTitle>
                <CardDescription>
                  Copy and paste the full job description, requirements, and qualifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Example:&#10;&#10;Job Title: Senior Software Engineer&#10;&#10;We're looking for an experienced engineer with:&#10;- 5+ years of experience with C# and .NET&#10;- Strong background in microservices architecture&#10;- Experience with Angular or React&#10;- Cloud experience (AWS or Azure)&#10;- Leadership and mentoring skills&#10;&#10;Responsibilities:&#10;- Lead development of scalable backend services&#10;- Mentor junior developers&#10;- Design and implement APIs&#10;..."
                  rows={12}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm leading-relaxed"
                />

                {error && (
                  <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={analyzeJob}
                    disabled={analyzing || !jobDescription.trim()}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {analyzing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Analyzing with AI...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                        Analyze Job Fit
                      </>
                    )}
                  </Button>
                  {jobDescription && (
                    <Button
                      variant="outline"
                      onClick={() => setJobDescription("")}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Clear
                    </Button>
                  )}
                </div>

                <p className="text-xs text-gray-500 text-center">
                  Your data is processed securely and not stored. Powered by Claude AI.
                </p>
              </CardContent>
            </Card>
          ) : (
            /* Analysis Results */
            <div className="space-y-6">
              {/* Match Score */}
              <Card className={`bg-gradient-to-br ${getMatchBgColor(result.matchScore)} backdrop-blur border`}>
                <CardContent className="p-8 text-center">
                  <div className="mb-4">
                    <div className={`text-7xl font-bold ${getMatchColor(result.matchScore)} mb-2`}>
                      {result.matchScore}%
                    </div>
                    <div className="text-2xl font-semibold text-white mb-1">
                      {result.matchLevel}
                    </div>
                    <div className="text-gray-300">
                      Match Score
                    </div>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        result.matchScore >= 80 ? "bg-gradient-to-r from-green-500 to-emerald-500" :
                        result.matchScore >= 60 ? "bg-gradient-to-r from-blue-500 to-cyan-500" :
                        result.matchScore >= 40 ? "bg-gradient-to-r from-yellow-500 to-amber-500" :
                        "bg-gradient-to-r from-orange-500 to-red-500"
                      }`}
                      style={{ width: `${result.matchScore}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>

              {/* Relevant Experience */}
              <Card className="bg-white/5 backdrop-blur border-white/10">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Relevant Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {result.relevantExperience.map((exp, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>{exp}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Key Strengths */}
              <Card className="bg-white/5 backdrop-blur border-white/10">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Key Strengths for This Role
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {result.keyStrengths.map((strength, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 rounded-lg"
                      >
                        {strength}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Potential Gaps */}
              {result.potentialGaps.length > 0 && (
                <Card className="bg-white/5 backdrop-blur border-white/10">
                  <CardHeader>
                    <CardTitle className="text-xl text-white flex items-center gap-2">
                      <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Areas for Discussion
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.potentialGaps.map((gap, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-300">
                          <span className="text-yellow-400 mt-1">•</span>
                          <span>{gap}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Recommendation */}
              <Card className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-xl text-white">AI Recommendation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-200 leading-relaxed">
                    {result.recommendation}
                  </p>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={resetAnalysis}
                  className="flex-1 bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors font-semibold"
                >
                  Analyze Another Job
                </Button>
                <Button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold"
                >
                  Let's Discuss This Role
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
