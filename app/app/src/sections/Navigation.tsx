import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage.tsx';
import { Menu, X, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const languages: { code: 'de' | 'en' | 'fr'; label: string; flag: string }[] = [
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
];

export function Navigation() {
  const { t, language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.skills, href: '#skills' },
    { label: t.nav.studio, href: '#studio' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`absolute top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-nova-dark/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="flex items-center gap-2 group"
            >
              <div className="relative w-8 h-8 lg:w-10 lg:h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-nova-purple to-nova-cyan rounded-lg animate-pulse-glow" />
                <div className="absolute inset-[2px] bg-nova-dark rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-nova-cyan" />
                </div>
              </div>
              <span className="font-display font-bold text-lg lg:text-xl tracking-tight">
                NOVA<span className="text-nova-purple">MIND</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="text-sm text-white/70 hover:text-white transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-nova-purple to-nova-cyan transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-2 text-white/70 hover:text-white hover:bg-white/5"
                >
                  <Globe className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm font-medium">
                    {languages.find((l) => l.code === language)?.label}
                  </span>
                </Button>

                {isLangMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 py-1 bg-nova-dark/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-glow overflow-hidden animate-scale-in">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`flex items-center gap-2 w-full px-4 py-2 text-sm transition-colors ${
                          language === lang.code
                            ? 'bg-nova-purple/20 text-white'
                            : 'text-white/70 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA Button - Desktop */}
              <Button
                onClick={() => scrollToSection('#early-access')}
                className="hidden sm:flex bg-gradient-to-r from-nova-purple to-nova-cyan text-white font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity animate-pulse-glow"
              >
                {t.hero.ctaPrimary}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-white hover:bg-white/5"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 bg-nova-dark/95 backdrop-blur-xl border-b border-white/10 p-4 animate-slide-down">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <Button
                onClick={() => scrollToSection('#early-access')}
                className="mt-2 bg-gradient-to-r from-nova-purple to-nova-cyan text-white font-medium"
              >
                {t.hero.ctaPrimary}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close language menu */}
      {isLangMenuOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setIsLangMenuOpen(false)}
        />
      )}
    </>
  );
}
