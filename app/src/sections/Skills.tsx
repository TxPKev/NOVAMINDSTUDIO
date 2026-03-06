import { useLanguage } from '@/hooks/useLanguage.tsx';
import { Brain, Cog, WifiOff, Shield, Mic, Eye, ArrowRight, Factory, Cpu, Gauge } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Brain,
  Cog,
  WifiOff,
  Shield,
  Mic,
  Eye,
};

export function Skills() {
  const { t } = useLanguage();
  const skills = t.skills.items;
  const cncToAi = t.skills.cncToAi;

  return (
    <section id="skills" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-nova-purple/5 to-background" />

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-nova-purple/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-nova-cyan/10 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-nova-purple/30 mb-6">
              <Factory className="w-4 h-4 text-nova-cyan" />
              <span className="text-sm text-white/80">Automation Experts</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
              {t.skills.title}{' '}
              <span className="text-gradient">{t.skills.titleAccent}</span>
            </h2>

            <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto">
              {t.skills.subtitle}
            </p>
          </div>

          {/* CNC to AI Section */}
          <div className="relative mb-16 p-8 sm:p-12 rounded-3xl glass-strong border border-white/10 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-nova-purple/10 via-transparent to-nova-cyan/10" />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left: Text */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-nova-purple to-nova-cyan">
                    <Factory className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/40" />
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-nova-cyan to-nova-pink">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
                  {cncToAi.title}
                </h3>
                <p className="text-nova-cyan text-sm mb-4">{cncToAi.subtitle}</p>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                  {cncToAi.description}
                </p>
              </div>

              {/* Right: Stats */}
              <div className="grid grid-cols-3 gap-4">
                {cncToAi.stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center p-4 sm:p-6 rounded-2xl glass hover:border-nova-purple/30 transition-colors"
                  >
                    <div className="font-display font-bold text-2xl sm:text-3xl text-gradient">
                      {stat.value}
                      <span className="text-lg">{stat.unit}</span>
                    </div>
                    <div className="text-xs text-white/50 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-nova-purple/20 rounded-full blur-3xl" />
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.map((skill, index) => {
              const Icon = iconMap[skill.icon] || Cog;
              return (
                <div
                  key={index}
                  className="group p-6 rounded-2xl glass hover:border-nova-purple/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-nova-purple/20 to-nova-cyan/20 group-hover:from-nova-purple group-hover:to-nova-cyan transition-all duration-300">
                      <Icon className="w-6 h-6 text-nova-cyan group-hover:text-white transition-colors" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-white mb-2 group-hover:text-gradient transition-all">
                        {skill.title}
                      </h3>
                      <p className="text-sm text-white/60 leading-relaxed">
                        {skill.desc}
                      </p>
                    </div>
                  </div>

                  {/* Progress bar decoration */}
                  <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-nova-purple to-nova-cyan rounded-full group-hover:w-full transition-all duration-500" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl glass border border-white/10">
              <Gauge className="w-6 h-6 text-nova-cyan" />
              <span className="text-white/70">
                <span className="text-white font-semibold">30 Jahre</span> Automationsexpertise — 
                <span className="text-nova-cyan"> CNC-Präzision</span> trifft 
                <span className="text-nova-purple"> KI-Intelligenz</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
