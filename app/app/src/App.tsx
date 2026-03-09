import { LanguageProvider } from '@/hooks/useLanguage.tsx';
import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { EarlyAccess } from '@/sections/EarlyAccess';
import { Projects } from '@/sections/Projects';
import { GuardianShowcase } from '@/sections/GuardianShowcase';
import { Skills } from '@/sections/Skills';
import { ChatInterface } from '@/sections/ChatInterface';
import { Studio } from '@/sections/Studio';
import { Footer } from '@/sections/Footer';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navigation />
        <main>
          <Hero />
          <EarlyAccess />
          <Projects />
          <GuardianShowcase />
          <Skills />
          <ChatInterface />
          <Studio />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
