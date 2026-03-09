import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage.tsx';
import { Send, Check, Sparkles, Lock, Bell, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function EarlyAccess() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const benefits = [
    { icon: Rocket, text: 'Exklusiver Beta-Zugang' },
    { icon: Bell, text: 'Neuigkeiten als Erster' },
    { icon: Lock, text: 'Kein Spam, versprochen' },
  ];

  return (
    <section id="early-access" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-nova-purple/5 to-background" />
      
      {/* Animated Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-nova-purple/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-nova-cyan/20 rounded-full blur-[100px] animate-pulse delay-1000" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Card */}
          <div className="relative p-8 sm:p-12 lg:p-16 rounded-3xl glass-strong border border-white/10 overflow-hidden">
            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-nova-purple/30 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-nova-cyan/30 rounded-br-3xl" />

            {/* Content */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nova-purple/10 border border-nova-purple/30 mb-6">
                <Sparkles className="w-4 h-4 text-nova-cyan" />
                <span className="text-sm text-white/80">Limited Access</span>
              </div>

              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
                {t.earlyAccess.title}
              </h2>

              <p className="text-white/60 text-base sm:text-lg max-w-lg mx-auto">
                {t.earlyAccess.description}
              </p>
            </div>

            {/* Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.earlyAccess.emailPlaceholder}
                      required
                      className="w-full h-12 px-4 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-nova-purple focus:ring-nova-purple/20 rounded-xl"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-12 px-6 bg-gradient-to-r from-nova-purple to-nova-cyan text-white font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>{t.earlyAccess.submitButton}</span>
                        <Send className="w-4 h-4" />
                      </div>
                    )}
                  </Button>
                </div>

                <p className="text-center text-xs text-white/40 mt-4">
                  {t.earlyAccess.privacy}
                </p>
              </form>
            ) : (
              <div className="text-center py-8 animate-scale-in">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-white text-lg">{t.earlyAccess.success}</p>
              </div>
            )}

            {/* Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-nova-purple/20">
                    <benefit.icon className="w-5 h-5 text-nova-cyan" />
                  </div>
                  <span className="text-sm text-white/70">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
