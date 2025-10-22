"use client";

import { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function Hero(): ReactElement {
  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-hero p-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardHeader className="text-center space-y-4 pb-4">
            <div className="inline-block">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                CN
              </div>
            </div>
            <CardTitle className="text-5xl sm:text-6xl font-bold gradient-text">
              Chris Nattress
            </CardTitle>
            <CardDescription className="text-2xl text-gray-200 font-semibold">
              Technical Lead | Senior Software Engineer
            </CardDescription>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Avon, CO</span>
              <span className="mx-2">•</span>
              <span>20+ Years Experience</span>
              <span className="mx-2">•</span>
              <span>Open to Opportunities</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-200 leading-relaxed text-center text-lg">
              Specialized in <span className="font-semibold text-blue-300">C#/.NET Core</span>, <span className="font-semibold text-purple-300">Angular</span>,
              <span className="font-semibold text-blue-300"> cloud architectures</span>, and <span className="font-semibold text-purple-300">AI systems</span>.
              Proven track record leading distributed teams and architecting innovative solutions from microservices to AI-powered automation.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4">
              <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-2xl font-bold gradient-text">20+</div>
                <div className="text-xs text-gray-400 mt-1">Years</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-2xl font-bold gradient-text">10</div>
                <div className="text-xs text-gray-400 mt-1">Companies</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-2xl font-bold gradient-text">50+</div>
                <div className="text-xs text-gray-400 mt-1">App's Designed and Built</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="text-2xl font-bold gradient-text">$500M+</div>
                <div className="text-xs text-gray-400 mt-1">Processed</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                onClick={() => scrollToSection('projects')}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                View Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold"
                onClick={() => scrollToSection('contact')}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Get in Touch
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 font-semibold"
                asChild
              >
                <a href="/resume.pdf" download>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download Resume
                </a>
              </Button>
            </div>

            {/* Scroll indicator */}
            <div className="text-center pt-4">
              <button
                onClick={() => scrollToSection('about')}
                className="inline-flex flex-col items-center text-gray-400 hover:text-white transition-colors animate-bounce"
              >
                <span className="text-sm mb-1">Explore Portfolio</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
