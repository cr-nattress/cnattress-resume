import { resumeData } from "@/lib/ai/resume-context";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Professional Experience
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">
              12+ years building scalable applications across fintech, healthcare, and hospitality
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent"></div>

            {/* Experience Entries */}
            <div className="space-y-12">
              {resumeData.experience.map((exp, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-slate-800 z-10"></div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-1/2"></div>

                  {/* Experience Card */}
                  <Card className="md:w-1/2 bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300 ml-8 md:ml-0">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <CardTitle className="text-2xl font-bold text-white">
                          {exp.role}
                        </CardTitle>
                        <span className="text-sm font-semibold text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>
                      <CardDescription className="text-lg">
                        <span className="font-semibold text-purple-400">{exp.company}</span>
                        <span className="text-gray-500"> • </span>
                        <span className="text-gray-400">{exp.location}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Description */}
                      <p className="text-gray-300 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Key Achievements */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-300">
                              <svg
                                className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="text-sm leading-relaxed">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
