import { useLanguage } from '@/hooks/useLanguage.tsx';
import { Cpu, Shield, Mic, WifiOff, ArrowRight, User, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Studio() {
  const { t } = useLanguage();

  const services = [
    { icon: Cpu, key: 'ai', color: 'from-nova-purple to-nova-pink' },
    { icon: WifiOff, key: 'offline', color: 'from-nova-cyan to-blue-500' },
    { icon: Shield, key: 'security', color: 'from-nova-pink to-orange-500' },
    { icon: Mic, key: 'voice', color: 'from-green-500 to-nova-cyan' },
  ];

  const stats = [
    { icon: User, value: t.studio.founder, label: 'Founder-Led' },
    { icon: Clock, value: t.studio.experience, label: '30+ Years Engineering' },
    { icon: Award, value: '2026', label: t.studio.innovation },
  ];

  return (
    <section id="studio" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-nova-purple/5 to-background" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
              {t.studio.title}{' '}
              <span className="text-gradient">{t.studio.titleAccent}</span>
            </h2>

            <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto">
              {t.studio.subtitle}
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            {/* Left: About Text */}
            <div className="space-y-6">
              <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                {t.studio.description1}
              </p>

              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                {t.studio.description2}
              </p>

              <div className="flex flex-wrap gap-3 pt-4">
                <Button className="bg-gradient-to-r from-nova-purple to-nova-cyan text-white rounded-xl hover:opacity-90">
                  {t.hero.ctaPrimary}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/5 rounded-xl"
                >
                  {t.nav.contact}
                </Button>
              </div>
            </div>

            {/* Right: Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 sm:p-6 rounded-2xl glass hover:border-nova-purple/30 transition-colors"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-nova-purple/20 mb-3">
                    <stat.icon className="w-5 h-5 text-nova-cyan" />
                  </div>
                  <div className="font-display font-bold text-lg sm:text-2xl text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="group p-6 rounded-2xl glass hover:border-nova-purple/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} mb-4 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="font-display font-semibold text-white mb-2">
                    {t.studio.services[service.key as keyof typeof t.studio.services]}
                  </h3>

                  <div className="w-8 h-0.5 bg-gradient-to-r from-nova-purple to-nova-cyan rounded-full" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
