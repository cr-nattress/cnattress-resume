import { ReactElement } from "react";
import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import ParticleCursor from "@/components/effects/ParticleCursor";
import KonamiCode from "@/components/easter-eggs/KonamiCode";

// Dynamic import for ChatWidget (reduces initial bundle size)
const ChatWidget = dynamic(
  () => import("@/components/chat/ChatWidget").then((mod) => ({ default: mod.ChatWidget })),
  {
    loading: () => (
      <div className="fixed bottom-6 right-6 w-12 h-12 bg-deep-purple rounded-full animate-pulse" />
    ),
  }
);

// Dynamic import for Timeline (reduces initial bundle size)
const TimelineSection = dynamic(
  () => import("@/components/timeline/TimelineSection"),
  {
    loading: () => (
      <section className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-white/10 rounded w-64 mx-auto"></div>
            <div className="h-64 bg-white/5 rounded"></div>
          </div>
        </div>
      </section>
    ),
  }
);

// Dynamic import for 3D Tech Stack (reduces initial bundle size)
const TechStack3D = dynamic(
  () => import("@/components/sections/TechStack3D"),
  {
    loading: () => (
      <section className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
            Technology Universe
          </h2>
          <div className="h-[600px] flex items-center justify-center">
            <div className="animate-pulse text-white/60">Loading 3D Experience...</div>
          </div>
        </div>
      </section>
    ),
  }
);

// Dynamic import for ProjectsGrid (reduces initial bundle size)
const ProjectsGrid = dynamic(
  () => import("@/components/projects/ProjectsGrid"),
  {
    loading: () => (
      <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-white/10 rounded w-64 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="h-96 bg-white/5 rounded"></div>
              <div className="h-96 bg-white/5 rounded"></div>
              <div className="h-96 bg-white/5 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    ),
  }
);

// Dynamic import for GitHubSection (reduces initial bundle size)
const GitHubSection = dynamic(
  () => import("@/components/github/GitHubSection"),
  {
    loading: () => (
      <section className="py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-white/10 rounded w-64 mx-auto"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-32 bg-white/5 rounded"></div>
                <div className="h-64 bg-white/5 rounded"></div>
              </div>
              <div className="h-96 bg-white/5 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    ),
  }
);

// Dynamic import for JobAnalyzer (reduces initial bundle size)
const JobAnalyzer = dynamic(
  () => import("@/components/sections/JobAnalyzer"),
  {
    loading: () => (
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-white/10 rounded w-64 mx-auto"></div>
            <div className="h-64 bg-white/5 rounded"></div>
          </div>
        </div>
      </section>
    ),
  }
);

// Dynamic import for ResumeRegenerator (reduces initial bundle size)
const ResumeRegenerator = dynamic(
  () => import("@/components/sections/ResumeRegenerator"),
  {
    loading: () => (
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-white/10 rounded w-64 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="h-64 bg-white/5 rounded"></div>
              <div className="h-64 bg-white/5 rounded"></div>
              <div className="h-64 bg-white/5 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    ),
  }
);

export default function Home(): ReactElement {
  return (
    <>
      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Chris Nattress",
            jobTitle: "Technical Lead & Senior Software Engineer",
            description: "Technical Lead with 20+ years experience in C#/.NET, Angular, TypeScript, cloud architecture, and AI integration",
            url: "https://chris-nattress.com",
            sameAs: [
              "https://github.com/chris-nattress",
              "https://linkedin.com/in/chris-nattress"
            ],
            knowsAbout: [
              "C#",
              ".NET Core",
              "Angular",
              "React",
              "TypeScript",
              "Azure",
              "AWS",
              "AI Integration",
              "Microservices",
              "Cloud Architecture"
            ]
          })
        }}
      />

      {/* Hero Section - Client Component Island */}
      <Hero />

      {/* Content Sections - Server Components */}
      <About />
      <TimelineSection />
      <Experience />
      <Skills />
      <TechStack3D />
      <ProjectsGrid />
      <GitHubSection />
      <JobAnalyzer />
      <ResumeRegenerator />
      <Contact />
      <Footer />

      {/* Visual Effects */}
      <ParticleCursor />

      {/* Easter Eggs */}
      <KonamiCode />

      {/* AI Chat Widget */}
      <ChatWidget />

      {/* Theme Toggle */}
      <ThemeToggle />
    </>
  );
}
