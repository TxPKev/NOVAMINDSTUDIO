import { useLanguage } from '@/hooks/useLanguage.tsx';
import { Sparkles, Github, Twitter, Linkedin, Instagram, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  const quickLinks = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.projects, href: '#projects' },
    { label: t.nav.studio, href: '#studio' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contact" className="relative pt-24 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-nova-dark to-background" />

      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nova-purple/50 to-transparent" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="lg:col-span-2">
              <a href="#home" className="inline-flex items-center gap-2 mb-6">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-nova-purple to-nova-cyan rounded-lg" />
                  <div className="absolute inset-[2px] bg-nova-dark rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-nova-cyan" />
                  </div>
                </div>
                <span className="font-display font-bold text-xl text-white">
                  NOVA<span className="text-nova-purple">MIND</span>
                </span>
              </a>

              <p className="text-white/60 text-sm leading-relaxed max-w-md mb-6">
                Wir bauen KI-Systeme die komplett offline leben. Kein Cloud-Call, 
                kein API-Key, null Abhängigkeiten. Für Unternehmen die 
                Datensouveränität ernst nehmen.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <Mail className="w-4 h-4 text-nova-cyan" />
                  <span>{t.contact.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/50">
                  <MapPin className="w-4 h-4 text-nova-cyan" />
                  <span>{t.contact.address}, {t.contact.city}</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-display font-semibold text-white mb-6">Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-display font-semibold text-white mb-6">
                {t.footer.follow}
              </h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 hover:border-nova-purple/30 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
            <p className="text-sm text-white/40 text-center sm:text-left">
              {t.footer.copyright}
            </p>

            <div className="flex gap-6">
              <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">
                {t.footer.imprint}
              </a>
              <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">
                {t.footer.privacy}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
