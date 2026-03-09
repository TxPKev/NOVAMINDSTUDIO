import { useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage.tsx';
import { ArrowRight, Cpu, WifiOff, Shield, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }[] = [];

    // Create particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let animationId: number;
    let frameCount = 0;

    const animate = () => {
      frameCount++;
      // Render every 2nd frame for performance (30fps)
      if (frameCount % 2 === 0) {
        ctx.fillStyle = 'rgba(8, 9, 14, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, i) => {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139, 92, 246, ${particle.alpha})`;
          ctx.fill();

          // Draw connections (limited)
          if (i % 3 === 0) {
            particles.slice(i + 1, i + 4).forEach((other) => {
              const dx = particle.x - other.x;
              const dy = particle.y - other.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 100)})`;
                ctx.stroke();
              }
            });
          }
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(180deg, #08090e 0%, #0d0f18 100%)' }}
      />

      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-bg opacity-50 z-[1]" />

      {/* Radial Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-nova-purple/10 via-transparent to-transparent z-[2]" />

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12 pt-8">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-nova-purple/30">
              <Cpu className="w-4 h-4 text-nova-cyan" />
              <span className="text-sm text-white/80">{t.hero.badge}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-center mb-6">
            <span className="block font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tighter text-white">
              {t.hero.title}
            </span>
            <span className="block font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tighter text-gradient mt-2">
              {t.hero.titleAccent}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-center text-white/60 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            {/* Primary CTA - Animated Button */}
            <button
              onClick={() => scrollToSection('#early-access')}
              className="group relative px-8 py-4 font-semibold text-white rounded-xl overflow-hidden transition-transform hover:scale-105"
            >
              {/* Animated border */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-nova-purple via-nova-cyan to-nova-pink animate-border-flow bg-[length:200%_100%]" />
              
              {/* Inner background */}
              <div className="absolute inset-[2px] rounded-xl bg-gradient-to-r from-nova-purple to-nova-cyan" />
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-nova-purple/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </div>
              
              {/* Content */}
              <span className="relative flex items-center gap-2 text-sm sm:text-base">
                {t.hero.ctaPrimary}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            {/* Secondary CTA */}
            <Button
              onClick={() => scrollToSection('#projects')}
              variant="outline"
              className="px-8 py-4 h-auto border-white/20 text-white hover:bg-white/5 hover:border-white/40 rounded-xl"
            >
              {t.hero.ctaSecondary}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { value: '160+', label: t.hero.stats.agents },
              { value: '100%', label: t.hero.stats.offline },
              { value: '0', label: t.hero.stats.cloud },
              { value: '2026', label: t.hero.stats.award, isAward: true },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 sm:p-6 rounded-2xl glass hover:border-nova-purple/30 transition-colors"
              >
                <div className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-white/50 flex items-center justify-center gap-1">
                  {stat.isAward && <Award className="w-3 h-3 text-nova-gold" />}
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Feature Icons */}
          <div className="flex justify-center gap-8">
            {[
              { icon: Shield, label: 'Secure' },
              { icon: Cpu, label: 'AI-Powered' },
              { icon: WifiOff, label: 'Offline' },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
              >
                <feature.icon className="w-5 h-5" />
                <span className="text-xs">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[3]" />
    </section>
  );
}
