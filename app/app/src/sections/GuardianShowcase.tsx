import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage.tsx';
import { Shield, Lock, Fingerprint, Eye, Cpu, Check, Usb, Zap, Scan, LockKeyhole } from 'lucide-react';

export function GuardianShowcase() {
  const { t } = useLanguage();
  const [activeFeature, setActiveFeature] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const features = [
    { icon: Lock, key: 'security', color: 'from-nova-purple to-nova-pink' },
    { icon: Cpu, key: 'realtime', color: 'from-nova-cyan to-blue-500' },
    { icon: Eye, key: 'ai', color: 'from-nova-pink to-orange-500' },
    { icon: Fingerprint, key: 'encryption', color: 'from-green-500 to-nova-cyan' },
  ];

  const designs = [
    { icon: Usb, name: 'Port Shield', desc: 'Physische USB/Ethernet-Sicherung', color: 'from-nova-purple to-nova-cyan' },
    { icon: Zap, name: 'Energy Guard', desc: 'Echtzeit-Stromüberwachung', color: 'from-nova-cyan to-blue-500' },
    { icon: Scan, name: 'Presence Core', desc: 'KI-basierte Anwesenheitserkennung', color: 'from-nova-pink to-orange-500' },
    { icon: LockKeyhole, name: 'Lockdown Mode', desc: 'Automatische Isolierung bei Bedrohung', color: 'from-green-500 to-nova-cyan' },
  ];

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  // Scan animation
  useEffect(() => {
    if (isScanning) {
      intervalRef.current = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setIsScanning(false);
            return 0;
          }
          return prev + 2;
        });
      }, 50);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isScanning]);

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
  };

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-nova-purple/5 to-background" />

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-nova-purple/30 mb-6">
              <Shield className="w-4 h-4 text-nova-cyan" />
              <span className="text-sm text-white/80">Offline Security</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
              {t.guardian.title}{' '}
              <span className="text-gradient">{t.guardian.titleAccent}</span>
            </h2>

            <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto">
              {t.guardian.subtitle}
            </p>
          </div>

          {/* Guardian Designs Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {designs.map((design, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl glass hover:border-nova-purple/30 transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Glow on hover */}
                <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-br ${design.color} opacity-0 group-hover:opacity-20 blur-lg transition-opacity`} />
                
                <div className="relative">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${design.color} mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <design.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="font-display font-semibold text-white mb-2">{design.name}</h3>
                  <p className="text-sm text-white/50">{design.desc}</p>
                  
                  {/* Decorative line */}
                  <div className={`mt-4 h-0.5 w-12 bg-gradient-to-r ${design.color} rounded-full transition-all duration-300 group-hover:w-full`} />
                </div>
              </div>
            ))}
          </div>

          {/* Main Content - Interactive Card + Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Interactive Card */}
            <div className="relative">
              {/* Card Container */}
              <div className="relative aspect-[4/3] max-w-md mx-auto">
                {/* Outer Glow */}
                <div className="absolute -inset-4 bg-gradient-to-br from-nova-purple/30 via-nova-cyan/20 to-nova-pink/30 rounded-3xl blur-2xl animate-pulse" />

                {/* Main Card */}
                <div className="relative h-full rounded-3xl overflow-hidden glass-strong border border-white/10">
                  {/* Card Header */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-nova-purple via-nova-cyan to-nova-pink" />

                  {/* Card Content */}
                  <div className="h-full flex flex-col p-6 sm:p-8">
                    {/* Card Logo */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="relative w-12 h-12">
                        <div className="absolute inset-0 bg-gradient-to-br from-nova-purple to-nova-cyan rounded-xl animate-pulse-glow" />
                        <div className="absolute inset-[2px] bg-nova-dark rounded-xl flex items-center justify-center">
                          <Shield className="w-6 h-6 text-nova-cyan" />
                        </div>
                      </div>
                      <div>
                        <div className="font-display font-bold text-white">GUARDIAN</div>
                        <div className="text-xs text-white/50">Offline Security Framework</div>
                      </div>
                    </div>

                    {/* Biometric Scanner */}
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <button
                        onClick={startScan}
                        disabled={isScanning}
                        className="relative group"
                      >
                        {/* Scanner Ring */}
                        <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                          {/* Outer Ring */}
                          <div
                            className={`absolute inset-0 rounded-full border-2 border-nova-purple/30 transition-all duration-300 ${
                              isScanning ? 'scale-110 border-nova-cyan/50' : ''
                            }`}
                          />

                          {/* Progress Ring */}
                          {isScanning && (
                            <svg
                              className="absolute inset-0 w-full h-full -rotate-90"
                              viewBox="0 0 100 100"
                            >
                              <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="hsl(180 100% 50% / 0.3)"
                                strokeWidth="2"
                              />
                              <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="hsl(180 100% 50%)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeDasharray={`${scanProgress * 2.83} 283`}
                                className="transition-all duration-100"
                              />
                            </svg>
                          )}

                          {/* Inner Circle */}
                          <div
                            className={`absolute inset-4 rounded-full bg-gradient-to-br from-nova-purple/20 to-nova-cyan/20 flex items-center justify-center transition-all duration-300 ${
                              isScanning ? 'from-nova-cyan/30 to-nova-purple/30' : ''
                            }`}
                          >
                            <Fingerprint
                              className={`w-12 h-12 sm:w-16 sm:h-16 transition-all duration-300 ${
                                isScanning
                                  ? 'text-nova-cyan scale-110'
                                  : 'text-white/40 group-hover:text-white/60'
                              }`}
                            />
                          </div>

                          {/* Scan Line */}
                          {isScanning && (
                            <div
                              className="absolute left-0 right-0 h-0.5 bg-nova-cyan shadow-glow-cyan"
                              style={{
                                top: `${scanProgress}%`,
                              }}
                            />
                          )}
                        </div>

                        {/* Status Text */}
                        <div className="mt-4 text-center">
                          {isScanning ? (
                            <span className="text-sm text-nova-cyan animate-pulse">
                              Scanning... {scanProgress}%
                            </span>
                          ) : scanProgress === 100 ? (
                            <span className="text-sm text-green-400 flex items-center gap-1 justify-center">
                              <Check className="w-4 h-4" />
                              Access Granted
                            </span>
                          ) : (
                            <span className="text-sm text-white/40">
                              Tap to authenticate
                            </span>
                          )}
                        </div>
                      </button>
                    </div>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs text-white/50">System Active</span>
                      </div>
                      <div className="text-xs text-white/30">Offline Mode</div>
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-nova-purple/20 to-transparent" />
                </div>
              </div>
            </div>

            {/* Right: Features */}
            <div className="space-y-4">
              {features.map((feature, index) => {
                const isActive = activeFeature === index;
                const Icon = feature.icon;

                return (
                  <button
                    key={feature.key}
                    onClick={() => setActiveFeature(index)}
                    className={`w-full text-left p-4 sm:p-6 rounded-2xl transition-all duration-300 ${
                      isActive
                        ? 'glass border-nova-purple/30'
                        : 'bg-white/5 border border-transparent hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} transition-all duration-300 ${
                          isActive ? 'scale-110' : 'opacity-70'
                        }`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1">
                        <h3
                          className={`font-display font-semibold text-lg mb-1 transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-white/70'
                          }`}
                        >
                          {t.guardian.features[feature.key as keyof typeof t.guardian.features]}
                        </h3>

                        <p
                          className={`text-sm transition-all duration-300 ${
                            isActive
                              ? 'text-white/60 max-h-20 opacity-100'
                              : 'text-white/40 max-h-0 opacity-0 overflow-hidden'
                          }`}
                        >
                          {index === 0 &&
                            'Physische Sicherheit für USB, Ethernet und andere Hardware-Ports. Kein unautorisierter Zugriff möglich.'}
                          {index === 1 &&
                            'Überwachung von Energiezuständen in Echtzeit. Erkennt Anomalien ohne Netzwerkverbindung.'}
                          {index === 2 &&
                            'Lokale Präsenzerkennung durch KI-gestützte Analyse. Funktioniert komplett offline.'}
                          {index === 3 &&
                            'Alle Sicherheitsmechanismen arbeiten ohne Cloud-Anbindung. Volle Datensouveränität.'}
                        </p>
                      </div>

                      {/* Indicator */}
                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          isActive ? 'bg-nova-cyan scale-125' : 'bg-white/20'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
