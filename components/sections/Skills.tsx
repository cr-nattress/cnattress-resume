import { resumeData } from "@/lib/ai/resume-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Skills(): React.ReactElement {
  const iconMap: { [key: string]: string } = {
    "Core Technologies": "⚡",
    "Frontend Frameworks": "🎨",
    "Cloud & DevOps": "☁️",
    "Architecture & Design": "🏗️",
    "AI & Development Tools": "🤖",
    "Methodologies": "📋"
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Skills & Expertise
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">
              Full-stack expertise across modern web technologies, cloud platforms, and AI systems
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumeData.skills.map((skillCategory, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                      {iconMap[skillCategory.category] || "💡"}
                    </span>
                    <span className="gradient-text">
                      {skillCategory.category}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.items.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-gray-200 border border-blue-500/30 rounded-lg hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Career Highlights */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Career Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resumeData.highlights.map((highlight, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {highlight}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
