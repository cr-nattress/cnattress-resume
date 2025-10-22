import { ReactElement } from "react";
import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";

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

export default function Home(): ReactElement {
  return (
    <>
      {/* Hero Section - Client Component Island */}
      <Hero />

      {/* Content Sections - Server Components */}
      <About />
      <TimelineSection />
      <Experience />
      <Skills />
      <ProjectsGrid />
      <GitHubSection />
      <JobAnalyzer />
      <Contact />
      <Footer />

      {/* AI Chat Widget */}
      <ChatWidget />

      {/* Theme Toggle */}
      <ThemeToggle />
    </>
  );
}
