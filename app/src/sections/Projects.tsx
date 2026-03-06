import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage.tsx';
import { ArrowUpRight, Brain, Shield, TrendingUp, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Projects() {
  const { t } = useLanguage();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const projects = t.projects.items;

  const getProjectGradient = (id: string) => {
    switch (id) {
      case 'arinet':
        return 'from-nova-purple via-nova-cyan to-nova-pink';
      case 'guardian':
        return 'from-nova-cyan via-blue-500 to-nova-purple';
      case 'aritrainee':
        return 'from-nova-pink via-rose-500 to-orange-500';
      default:
        return 'from-nova-purple to-nova-cyan';
    }
  };

  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'arinet':
        return Brain;
      case 'guardian':
        return Shield;
      case 'aritrainee':
        return TrendingUp;
      default:
        return ArrowUpRight;
    }
  };

  return (
    <section id="projects" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
              {t.projects.title}{' '}
              <span className="text-gradient">{t.projects.titleAccent}</span>
            </h2>
            <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto">
              {t.projects.subtitle}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            {projects.map((project) => {
              const Icon = getProjectIcon(project.id);
              const isHovered = hoveredProject === project.id;

              return (
                <div
                  key={project.id}
                  className="group relative"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Guardian Card */}
                  <div
                    className={`relative h-full p-6 sm:p-8 rounded-2xl overflow-hidden transition-all duration-500 ${
                      isHovered ? 'scale-[1.02]' : 'scale-100'
                    }`}
                  >
                    {/* Animated Border */}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${getProjectGradient(
                        project.id
                      )} opacity-20 transition-opacity duration-300 ${
                        isHovered ? 'opacity-40' : ''
                      }`}
                    />

                    {/* Glass Background */}
                    <div className="absolute inset-[1px] rounded-2xl bg-nova-dark/90 backdrop-blur-xl" />

                    {/* Glow Effect */}
                    <div
                      className={`absolute -inset-1 rounded-2xl bg-gradient-to-br ${getProjectGradient(
                        project.id
                      )} opacity-0 blur-xl transition-opacity duration-500 ${
                        isHovered ? 'opacity-30' : ''
                      }`}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div
                          className={`flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${getProjectGradient(
                            project.id
                          )} transition-transform duration-300 ${
                            isHovered ? 'scale-110' : ''
                          }`}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>

                        <div
                          className={`flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 transition-all duration-300 ${
                            isHovered
                              ? 'bg-white/10 border-white/20'
                              : ''
                          }`}
                        >
                          <ArrowUpRight
                            className={`w-5 h-5 text-white/60 transition-all duration-300 ${
                              isHovered ? 'text-white translate-x-0.5 -translate-y-0.5' : ''
                            }`}
                          />
                        </div>
                      </div>

                      {/* Category */}
                      <div className="mb-3">
                        <span className="text-xs font-medium text-white/40 uppercase tracking-wider">
                          {project.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-3 group-hover:text-gradient transition-all duration-300">
                        {project.title}
                      </h3>

                      {/* Slogan */}
                      <div className="flex items-start gap-2 mb-4">
                        <Quote className="w-4 h-4 text-nova-cyan flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-nova-cyan/80 italic">
                          "{(project as any).slogan}"
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-white/60 text-sm leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Action */}
                      <div className="flex items-center gap-2 text-sm">
                        <span
                          className={`text-white/60 transition-colors duration-300 ${
                            isHovered ? 'text-nova-cyan' : ''
                          }`}
                        >
                          {t.projects.viewProject}
                        </span>
                        <ArrowUpRight
                          className={`w-4 h-4 transition-all duration-300 ${
                            isHovered
                              ? 'text-nova-cyan translate-x-1 -translate-y-1'
                              : 'text-white/40'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div
                      className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getProjectGradient(
                        project.id
                      )} opacity-10 blur-3xl transition-opacity duration-300 ${
                        isHovered ? 'opacity-20' : ''
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Button
              variant="outline"
              className="px-8 py-3 h-auto border-white/20 text-white hover:bg-white/5 hover:border-nova-purple/50 rounded-xl group"
            >
              {t.projects.viewAll}
              <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
