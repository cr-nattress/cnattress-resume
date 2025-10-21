"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import { ChatWidget } from "@/components/chat/ChatWidget";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <main className="min-h-screen flex items-center justify-center bg-gradient-hero p-8">
        <Card className="max-w-2xl bg-white/10 backdrop-blur border-white/20">
          <CardHeader>
            <CardTitle className="text-5xl font-bold gradient-text">
              Chris Nattress
            </CardTitle>
            <CardDescription className="text-xl text-gray-300">
              Technical Lead | Senior Software Engineer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Building scalable web applications across healthcare, fintech, and hospitality.
              Specialized in C#/.NET, Angular, cloud architectures, and AI systems.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Portfolio
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get in Touch
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Content Sections */}
      <About />
      <Experience />
      <Skills />
      <Contact />

      {/* AI Chat Widget */}
      <ChatWidget />
    </>
  );
}
