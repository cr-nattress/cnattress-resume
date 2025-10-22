import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  category: string;
}

export default function Projects(): React.ReactElement {
  const projects: Project[] = [
    {
      title: "AI-Powered Career Portfolio",
      description: "Next.js 15 portfolio with integrated Claude AI chatbot concierge, Supabase analytics, and real-time chat capabilities. Features streaming responses, session management, and anonymous visitor tracking.",
      technologies: ["Next.js 15", "TypeScript", "Claude AI", "Supabase", "Tailwind CSS"],
      link: "https://github.com/cr-nattress",
      category: "AI & Full-Stack"
    },
    {
      title: "Microservices Architecture Platform",
      description: "Led design and implementation of template-driven microservice architecture supporting 20+ production APIs with 100+ endpoints. Reduced new service development time by 60% through standardized patterns and reusable components.",
      technologies: ["C#", ".NET Core", "Azure", "Microservices", "REST APIs"],
      category: "Architecture"
    },
    {
      title: "Enterprise Fintech Application",
      description: "Developed scalable fintech applications processing $500M+ in annual lease transactions with 99.95% system availability. Architected C# REST APIs using .NET 5-7 with comprehensive C4 architectural documentation.",
      technologies: ["C#", ".NET 5-7", "Angular 9-12", "Microservices", "Azure"],
      category: "Fintech"
    },
    {
      title: "Cloud-Native Microservices",
      description: "Engineered high-performance AWS microservices handling 10M+ daily requests with 99.9% uptime. Implemented caching strategies, query optimization, and distributed service architecture using Lambda, S3, and DynamoDB.",
      technologies: ["C#", "AWS Lambda", "DynamoDB", "S3", "REST APIs"],
      category: "Cloud & DevOps"
    },
    {
      title: "Micro-Frontend Customer Portal",
      description: "Led design and implementation of web components and Angular Elements micro-frontend strategy for enterprise customer portal. Enabled independent deployment and reduced release cycles significantly.",
      technologies: ["Angular", "Web Components", "TypeScript", "Micro-Frontends"],
      category: "Frontend Architecture"
    },
    {
      title: "Vue.js SSO Applications",
      description: "Developed single sign-on applications for ski resort web portals using Vue.js 2/3 and ASP.NET MVC. Enabled seamless authentication across multiple resort systems with 98% customer satisfaction across 8 major implementations.",
      technologies: ["Vue.js 2/3", "Vuex", "ASP.NET MVC", "SSO"],
      category: "Frontend & Authentication"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Featured Projects & Achievements
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">
              Highlights from 20+ years of building scalable applications
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group flex flex-col"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-xl font-bold text-white group-hover:gradient-text transition-all">
                      {project.title}
                    </CardTitle>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                  <CardDescription>
                    <span className="text-sm font-semibold text-purple-400">
                      {project.category}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow flex flex-col">
                  {/* Description */}
                  <p className="text-gray-300 text-sm leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">
              Want to learn more about these projects?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200"
            >
              Get in Touch
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
