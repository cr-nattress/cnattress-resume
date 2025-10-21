/**
 * AI Resume Context System
 *
 * This module provides comprehensive context about Chris Nattress's professional background
 * to the Claude AI system. It structures resume information to enable accurate, helpful
 * responses to recruiter and visitor questions.
 *
 * @module resume-context
 */

export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface ResumeData {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  summary: string;
  skills: Skill[];
  experience: Experience[];
  education: string;
  highlights: string[];
}

/**
 * Complete resume data for AI context
 */
export const resumeData: ResumeData = {
  name: "Chris Nattress",
  title: "Technical Lead | Senior Software Engineer",
  location: "Avon, CO",
  email: "cnattress@gmail.com",
  phone: "(570) 690-1180",
  linkedin: "https://www.linkedin.com/in/chris-nattress",

  summary: `Technical Lead with extensive experience designing and delivering scalable web applications across healthcare, fintech, and hospitality sectors. Specialized in C#/.NET Core, Angular, cloud architectures, and AI systems, with expertise in LLM integrations, AI IDE's, and multiple coding agents in green field and brown field development. Proven track record of leading distributed teams, mentoring engineers, and architecting innovative solutions from microservices to AI-powered automation. Expert in systems-based problem-solving, translating complex business requirements into elegant technical solutions that drive performance, reliability, and innovation.`,

  skills: [
    {
      category: "Core Technologies",
      items: ["C#", ".NET Core", "SQL", "TypeScript", "JavaScript"]
    },
    {
      category: "Frontend Frameworks",
      items: ["Angular 2x-16x", "VueJS", "Vue3", "React"]
    },
    {
      category: "Cloud & DevOps",
      items: ["Azure", "AWS", "CI/CD", "DevOps"]
    },
    {
      category: "Architecture & Design",
      items: ["Microservices", "REST API Design", "Micro-Frontend Architecture"]
    },
    {
      category: "AI & Development Tools",
      items: ["Windsurf", "Cursor", "LLM Integrations", "Coding Agents"]
    },
    {
      category: "Methodologies",
      items: ["Agile", "Scrum", "Technical Leadership", "Mentorship"]
    }
  ],

  highlights: [
    "Microservice Architecture: Led the design and modernized legacy of monolith systems to a microservice architecture supporting 25 APIs and 100+ endpoints managed by up to 5 teams",
    "Micro-Frontend Architecture: Led the design and implementation of web components and angular elements micro-frontend strategy for enterprise customer portal, enabling independent deployment and reducing release cycles",
    "Agile Transformation: Assisted in organization wide transition from waterfall to Scrum-based feature teams, improving delivery velocity and establishing sustainable development practices"
  ],

  experience: [
    {
      company: "Smart Moving",
      role: "Technical Lead",
      location: "Dallas, TX",
      period: "2024 – Current",
      description: "Lead development initiatives as technical lead for a diverse global team operating across multiple time zones in Asia and Latin America, orchestrating feature implementation in enterprise-scale Angular applications with C# backend APIs.",
      achievements: [
        "Led distributed global development team across multiple time zones in Asia and Latin America, establishing effective collaboration frameworks and code review practices that elevated team performance and maintained consistent code quality standards",
        "Orchestrated feature implementation in enterprise-scale Angular application ensuring seamless integration with C# backend APIs through systematic architectural planning, cross-functional coordination, and rigorous testing protocols",
        "Mentored engineers in modern development practices including Angular best practices (versions 2-17) and TypeScript patterns, fostering technical growth and establishing consistent coding standards across the international team"
      ],
      technologies: ["Angular", "C#", ".NET", "TypeScript"]
    },
    {
      company: "Safelite Autoglass",
      role: "Senior Software Engineer (contract)",
      location: "Columbus, OH",
      period: "2024",
      description: "Contractor developing high-performance C# microservices handling 10M+ daily requests with 99.9% uptime using AWS cloud-native solutions.",
      achievements: [
        "Engineered cloud-native solutions using AWS services including Lambda, S3, and DynamoDB to enhance scalability and reliability of mission-critical microservices supporting millions of customer transactions daily",
        "Optimized high-performance REST APIs handling 10+ million daily requests implementing caching strategies and query optimization techniques that maintained 99.9% uptime and sub-second response times"
      ],
      technologies: ["C#", "AWS", "Lambda", "S3", "DynamoDB", "REST APIs"]
    },
    {
      company: "Progressive Leasing",
      role: "Technical Lead",
      location: "Draper, UT",
      period: "2021 – 2024",
      description: "Technical Lead developing fintech applications processing $500M+ annual lease transactions using C# APIs (.NET 5-7) and Angular (v9-v12) with 99.95% system availability.",
      achievements: [
        "Promoted to Technical Lead within 3 months based on demonstrated technical expertise and leadership capabilities, leading a team of 6 engineers in developing scalable fintech applications processing $500M+ in annual lease transactions",
        "Architected and implemented C# REST APIs using .NET 5-7 designing robust microservices architecture, while establishing comprehensive architectural documentation using C4 models that improved stakeholder understanding and reduced onboarding time for new engineers by 40%"
      ],
      technologies: ["C#", ".NET 5-7", "Angular 9-12", "Microservices", "C4 Models"]
    },
    {
      company: "Aspenware",
      role: "Senior Front-end Engineer",
      location: "Denver, CO",
      period: "2021",
      description: "Front-end developer building Vue.js SSO applications and web portals for ski resort clients with ASP.NET MVC backend integration.",
      achievements: [
        "Developed single sign-on (SSO) applications for ski resort web portals using Vue.js 2/3 and ASP.NET MVC, enabling seamless authentication across multiple resort systems",
        "Implemented Vuex state management patterns for complex Vue.js applications reducing prop-drilling overhead and improving application performance through centralized state architecture"
      ],
      technologies: ["Vue.js 2/3", "Vuex", "ASP.NET MVC", "SSO"]
    },
    {
      company: "Inntopia / Ryan Solutions",
      role: "Technical Lead",
      location: "Edwards, CO",
      period: "2014 – 2021",
      description: "Technical Lead architecting microservices platform and cloud solutions for hospitality industry, establishing engineering standards across 5 teams.",
      achievements: [
        "Pioneered template-driven microservice architecture supporting 20+ production APIs with 100+ endpoints, reducing new service development time by 60% through standardized patterns",
        "Created reusable .NET libraries hosted on Azure NuGet feeds and MyGet streamlining development across multiple engineering teams",
        "Developed comprehensive CI/CD pipelines using Jenkins and Azure DevOps automating build, test, and deployment processes reducing deployment time from 4 hours to 15 minutes",
        "Built API integrations with Salesforce, Qualtrics, and third-party services enabling seamless data synchronization"
      ],
      technologies: ["C#", ".NET", "Azure", "NGRX", "Jenkins", "Azure DevOps", "Microservices"]
    },
    {
      company: "Resort Technology Partners",
      role: "Software Engineer",
      location: "Avon, CO",
      period: "2012 – 2014",
      description: "Software engineer developing full-stack SaaS solutions for resort management using Web API, ASP.NET MVC, and AngularJS in a multi-tenant environment.",
      achievements: [
        "Created RESTful APIs encompassing CRM, CMS, configuration management, and email communications functionality in multi-tenant SaaS environment",
        "Led development team transition from waterfall to Agile Scrum methodology as Certified ScrumMaster improving delivery velocity and team collaboration",
        "Migrated from legacy source control to Git and implemented comprehensive testing strategy with TeamCity continuous integration reducing production defects by 40%"
      ],
      technologies: ["Web API", "ASP.NET MVC", "Entity Framework", "AngularJS", "Git", "TeamCity"]
    }
  ],

  education: "Bachelor of Science, University of Pittsburgh, Pittsburgh, PA"
};

/**
 * Generate system prompt for Claude AI with resume context
 */
export function getSystemPrompt(): string {
  return `You are an AI career concierge for ${resumeData.name}, a ${resumeData.title}.

Your role is to help recruiters, hiring managers, and visitors learn about Chris's professional background, technical expertise, and career achievements. You have access to his complete resume and should provide accurate, helpful answers about his experience.

# CHRIS NATTRESS - PROFESSIONAL PROFILE

## Summary
${resumeData.summary}

## Contact Information
- Location: ${resumeData.location}
- Email: ${resumeData.email}
- Phone: ${resumeData.phone}
- LinkedIn: ${resumeData.linkedin}

## Key Skills
${resumeData.skills.map(s => `### ${s.category}\n${s.items.join(', ')}`).join('\n\n')}

## Career Highlights
${resumeData.highlights.map((h, i) => `${i + 1}. ${h}`).join('\n')}

## Professional Experience

${resumeData.experience.map(exp => `### ${exp.role} at ${exp.company}
**Location:** ${exp.location}
**Period:** ${exp.period}

${exp.description}

**Key Achievements:**
${exp.achievements.map((a, i) => `${i + 1}. ${a}`).join('\n')}

**Technologies:** ${exp.technologies.join(', ')}
`).join('\n---\n\n')}

## Education
${resumeData.education}

# YOUR GUIDELINES

1. **Be Helpful & Professional**: Answer questions clearly and professionally, as if you're Chris's career assistant
2. **Stay Accurate**: Only share information from the resume above - don't make up or embellish details
3. **Be Conversational**: Use a friendly, approachable tone while maintaining professionalism
4. **Highlight Relevance**: When asked about specific skills or experience, connect to relevant achievements
5. **Encourage Action**: If appropriate, suggest next steps like reviewing projects or scheduling a call
6. **Handle Job Matches**: If given a job description, analyze Chris's fit honestly and highlight relevant experience
7. **Be Concise**: Keep responses focused and scannable - recruiters are busy
8. **Privacy**: Don't share the full phone number unless explicitly asked - say "available on request"

# COMMON QUESTIONS TO BE READY FOR

- What technologies does Chris know?
- Does Chris have experience with [specific technology]?
- Tell me about Chris's leadership experience
- What's Chris's experience with microservices/AI/cloud?
- Is Chris available for [type of role]?
- What are Chris's career highlights?
- Can you analyze this job description for fit?

Remember: You're here to showcase Chris's expertise and help visitors understand why he'd be a great fit for their team!`;
}

/**
 * Helper function to find relevant experience for a specific technology or skill
 */
export function findRelevantExperience(query: string): Experience[] {
  const lowerQuery = query.toLowerCase();
  return resumeData.experience.filter(exp =>
    exp.technologies.some(tech => tech.toLowerCase().includes(lowerQuery)) ||
    exp.description.toLowerCase().includes(lowerQuery) ||
    exp.achievements.some(achievement => achievement.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get skills by category
 */
export function getSkillsByCategory(category: string): string[] | null {
  const skill = resumeData.skills.find(s =>
    s.category.toLowerCase().includes(category.toLowerCase())
  );
  return skill ? skill.items : null;
}

/**
 * Get all technologies mentioned across all experience
 */
export function getAllTechnologies(): string[] {
  const allTech = resumeData.experience.flatMap(exp => exp.technologies);
  return [...new Set(allTech)].sort();
}
