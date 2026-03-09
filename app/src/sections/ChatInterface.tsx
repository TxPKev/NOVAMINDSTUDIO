import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage.tsx';
import { Send, Bot, User, Sparkles, MoreVertical, Paperclip, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export function ChatInterface() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: t.chat.welcome,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // NEU: Ref um zu tracken ob Komponente gerade erst geladen wird
  // Problem war: Beim ersten Render (Seitenstart) scrollte die App sofort zum Chat-Bereich
  // Lösung: Wir merken uns ob der erste Render vorbei ist, erst ab dem zweiten Scrollen wir
  const didMountRef = useRef(false);

  const scrollToBottom = () => {
    // NEU: block: 'nearest' verhindert dass die GANZE Seite scrollt, 
    // sondern nur der Chat-Container intern
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  useEffect(() => {
    // NEU: Beim ersten Laden (didMountRef.current ist false) scrollen wir NICHT
    // Dadurch bleibt die Seite oben beim Hero stehen
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    
    // Ab hier: Erst wenn User eine Nachricht schreibt (messages Array ändert sich),
    // dann scrollen wir innerhalb des Chat-Fensters nach unten
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        'Ich verstehe! AriNet kann mit über 160 spezialisierten Agenten auf deine Anfrage reagieren.',
        'Interessant! Guardian Framework bietet dafür die perfekte Offline-Sicherheitsarchitektur.',
        'Absolut! Alle unsere Systeme arbeiten komplett ohne Cloud-Anbindung.',
        'Danke für deine Nachricht! Ich leite das an das entsprechende Modul weiter.',
      ];

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-nova-cyan/5 to-background" />

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-nova-cyan/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-nova-purple/10 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-nova-cyan/30 mb-6">
              <Sparkles className="w-4 h-4 text-nova-cyan" />
              <span className="text-sm text-white/80">100% Offline</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
              {t.chat.title}{' '}
              <span className="text-gradient">{t.chat.titleAccent}</span>
            </h2>

            <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto">
              {t.chat.subtitle}
            </p>
          </div>

          {/* Chat Container */}
          <div className="relative max-w-2xl mx-auto">
            {/* Outer Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-nova-purple/20 via-nova-cyan/20 to-nova-pink/20 rounded-3xl blur-xl" />

            {/* Chat Window */}
            <div className="relative rounded-3xl glass-strong border border-white/10 overflow-hidden">
              {/* Chat Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-nova-purple to-nova-cyan flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-nova-dark" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-white">Ari</div>
                    <div className="text-xs text-white/50">AI Assistant — Offline</div>
                  </div>
                </div>

                <Button variant="ghost" size="icon" className="text-white/50 hover:text-white hover:bg-white/5">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>

              {/* Messages */}
              <div className="h-80 sm:h-96 overflow-y-auto p-4 sm:p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.type === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user'
                          ? 'bg-white/10'
                          : 'bg-gradient-to-br from-nova-purple to-nova-cyan'
                      }`}
                    >
                      {message.type === 'user' ? (
                        <User className="w-4 h-4 text-white/70" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-nova-purple/20 border border-nova-purple/30 text-white'
                          : 'glass border border-white/10 text-white/90'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-nova-purple to-nova-cyan flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="glass border border-white/10 px-4 py-3 rounded-2xl">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-white/50">{t.chat.typing}</span>
                        <span className="flex gap-0.5">
                          <span className="w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Hier springt der Scroll-To-Bottom hin */}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 sm:p-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white/40 hover:text-white hover:bg-white/5 flex-shrink-0"
                  >
                    <Paperclip className="w-5 h-5" />
                  </Button>

                  <div className="flex-1 relative">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={t.chat.placeholder}
                      className="w-full h-11 pl-4 pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-nova-cyan focus:ring-nova-cyan/20 rounded-xl"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 text-white/40 hover:text-white hover:bg-white/5"
                    >
                      <Smile className="w-5 h-5" />
                    </Button>
                  </div>

                  <Button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isTyping}
                    className="h-11 px-4 bg-gradient-to-r from-nova-purple to-nova-cyan text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex-shrink-0"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
