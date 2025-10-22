/**
 * Projects Data
 *
 * Portfolio projects showcasing development work and technical expertise.
 * Includes project descriptions, technologies, links, and preview images.
 *
 * @module projects-data
 */

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'web' | 'api' | 'architecture' | 'fullstack';
  technologies: string[];
  features: string[];
  github?: string;
  demo?: string;
  image?: string;
  year: number;
  status: 'completed' | 'in-progress' | 'archived';
}

/**
 * All portfolio projects
 */
export const projectsData: Project[] = [
  {
    id: 'ai-portfolio',
    title: 'AI-Enhanced Portfolio Website',
    shortDescription: 'Modern portfolio with Claude AI chatbot concierge, job analyzer, and interactive timeline',
    fullDescription: 'A Next.js 15 portfolio website featuring an intelligent Claude AI-powered chatbot that can answer questions about professional experience, analyze job descriptions for fit, and provide personalized insights. Includes CSRF protection, Supabase analytics, and interactive career timeline with Framer Motion animations.',
    category: 'fullstack',
    technologies: ['Next.js 15', 'TypeScript', 'Claude AI', 'Supabase', 'Tailwind CSS', 'Framer Motion', 'Shadcn/ui'],
    features: [
      'Claude AI chatbot concierge with streaming responses',
      'AI-powered job description analyzer',
      'Interactive horizontal-scrolling career timeline',
      'CSRF protection with secure token validation',
      'Real-time analytics with Supabase PostgreSQL',
      'IP-based rate limiting (100 req/hr)',
      'Server-side rendering with App Router',
      'Responsive design with dark theme',
      'Session management with localStorage persistence'
    ],
    github: 'https://github.com/chris-nattress/chris-nattress',
    demo: 'https://chris-nattress.com',
    year: 2024,
    status: 'in-progress'
  },
  {
    id: 'microservices-platform',
    title: 'Enterprise Microservices Architecture',
    shortDescription: 'Scalable microservices platform supporting 25 APIs and 100+ endpoints across 5 teams',
    fullDescription: 'Led the design and modernization of legacy monolith systems to a comprehensive microservices architecture at Progressive Leasing and Inntopia. Created template-driven architecture that reduced new service development time by 60% through standardized patterns. Platform processed $500M+ annual transactions with 99.95% uptime.',
    category: 'architecture',
    technologies: ['C#', '.NET 5-7', 'Azure', 'REST APIs', 'Jenkins', 'Azure DevOps', 'Docker', 'Microservices'],
    features: [
      'Template-driven microservice architecture',
      '20+ production APIs with 100+ endpoints',
      'Comprehensive CI/CD pipelines reducing deployment from 4hrs to 15min',
      'Reusable .NET libraries on Azure NuGet feeds',
      'C4 architectural documentation',
      'Horizontal scaling supporting millions of daily requests',
      '99.95% system availability',
      'Multi-team coordination across 5 development teams'
    ],
    year: 2021,
    status: 'completed'
  },
  {
    id: 'micro-frontend-portal',
    title: 'Micro-Frontend Customer Portal',
    shortDescription: 'Angular Elements-based micro-frontend architecture enabling independent team deployments',
    fullDescription: 'Architected and implemented a micro-frontend strategy using Angular Elements and web components for Progressive Leasing\'s enterprise customer portal. Enabled 5 independent teams to develop, test, and deploy features autonomously, reducing release cycles and improving development velocity.',
    category: 'architecture',
    technologies: ['Angular 9-12', 'Angular Elements', 'TypeScript', 'Web Components', 'NGRX', 'RxJS'],
    features: [
      'Micro-frontend architecture with Angular Elements',
      'Independent deployment capabilities for 5 teams',
      'Shared component library for consistency',
      'NGRX state management',
      'Lazy loading for optimal performance',
      'Cross-team communication framework',
      'Reduced release cycle dependencies',
      'Scalable team structure'
    ],
    year: 2022,
    status: 'completed'
  },
  {
    id: 'vue-sso-portal',
    title: 'Vue.js SSO Ski Resort Portal',
    shortDescription: 'Single sign-on application for multi-resort authentication and booking management',
    fullDescription: 'Developed enterprise SSO applications for ski resort web portals using Vue.js 2/3 and ASP.NET MVC at Aspenware. Enabled seamless authentication across multiple resort systems with Vuex state management for complex application flows.',
    category: 'web',
    technologies: ['Vue.js 2/3', 'Vuex', 'ASP.NET MVC', 'JavaScript', 'SSO', 'OAuth'],
    features: [
      'Single sign-on across multiple resort systems',
      'Vuex state management patterns',
      'ASP.NET MVC backend integration',
      'Session management and token refresh',
      'Multi-tenant architecture',
      'Responsive design for mobile/desktop',
      'Real-time booking availability',
      'User profile management'
    ],
    year: 2021,
    status: 'completed'
  },
  {
    id: 'aws-microservices',
    title: 'High-Performance AWS Microservices',
    shortDescription: 'Cloud-native C# microservices handling 10M+ daily requests with 99.9% uptime',
    fullDescription: 'Engineered high-performance C# microservices for Safelite Autoglass using AWS Lambda, S3, and DynamoDB. Implemented caching strategies and query optimization maintaining sub-second response times while handling millions of customer transactions daily.',
    category: 'api',
    technologies: ['C#', 'AWS Lambda', 'DynamoDB', 'S3', 'REST APIs', 'CloudWatch'],
    features: [
      'Cloud-native serverless architecture',
      '10+ million daily requests',
      '99.9% uptime SLA',
      'Sub-second response times',
      'Intelligent caching strategies',
      'Auto-scaling with AWS Lambda',
      'DynamoDB query optimization',
      'CloudWatch monitoring and alerting'
    ],
    year: 2024,
    status: 'completed'
  },
  {
    id: 'angular-enterprise-app',
    title: 'Enterprise Angular Application',
    shortDescription: 'Global team collaboration on enterprise-scale Angular apps with C# backend APIs',
    fullDescription: 'Led distributed global development team across multiple time zones for Smart Moving, orchestrating feature implementation in enterprise-scale Angular application (v2-17). Established code review practices and mentored engineers in modern development patterns while ensuring seamless C# backend integration.',
    category: 'fullstack',
    technologies: ['Angular 2-17', 'TypeScript', 'C#', '.NET', 'RxJS', 'REST APIs'],
    features: [
      'Enterprise-scale Angular application',
      'Global team coordination (Asia, Latin America)',
      'Systematic architectural planning',
      'C# backend API integration',
      'Modern TypeScript patterns',
      'Comprehensive testing protocols',
      'Code quality standards enforcement',
      'Team mentorship and knowledge transfer'
    ],
    year: 2024,
    status: 'in-progress'
  }
];

/**
 * Get all unique technologies from projects
 */
export function getAllTechnologies(): string[] {
  const allTech = projectsData.flatMap(project => project.technologies);
  return [...new Set(allTech)].sort();
}

/**
 * Get projects by technology filter
 */
export function getProjectsByTechnology(technology: string): Project[] {
  if (!technology || technology === 'all') {
    return projectsData;
  }

  const lowerTech = technology.toLowerCase();
  return projectsData.filter(project =>
    project.technologies.some(tech => tech.toLowerCase().includes(lowerTech))
  );
}

/**
 * Get projects by category
 */
export function getProjectsByCategory(category: Project['category'] | 'all'): Project[] {
  if (category === 'all') {
    return projectsData;
  }

  return projectsData.filter(project => project.category === category);
}

/**
 * Get project by ID
 */
export function getProjectById(id: string): Project | undefined {
  return projectsData.find(project => project.id === id);
}

/**
 * Get featured projects (most recent or in-progress)
 */
export function getFeaturedProjects(limit: number = 3): Project[] {
  return projectsData
    .filter(project => project.status === 'in-progress' || project.year >= 2023)
    .sort((a, b) => b.year - a.year)
    .slice(0, limit);
}

/**
 * Get project count by status
 */
export function getProjectStats(): {
  total: number;
  completed: number;
  inProgress: number;
  archived: number;
} {
  return {
    total: projectsData.length,
    completed: projectsData.filter(p => p.status === 'completed').length,
    inProgress: projectsData.filter(p => p.status === 'in-progress').length,
    archived: projectsData.filter(p => p.status === 'archived').length
  };
}
