
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import OnboardingModal from '../components/OnboardingModal';
import MemoryArchive from '../components/MemoryArchive';
import MentalStatic from '../components/MentalStatic';
import BackgroundEffects from '../components/BackgroundEffects';
import Dashboard from '../components/Dashboard';
import ModuleView from '../components/ModuleView';
import ThresholdRitual from '../components/ThresholdRitual';
import MysteryUnlocks from '../components/MysteryUnlocks';
import SymbolicEchoes from '../components/SymbolicEchoes';
import ReverseNotifications from '../components/ReverseNotifications';
import InnerVocabulary from '../components/InnerVocabulary';
import SovereigntyModulator from '../components/SovereigntyScore';

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [sessionData, setSessionData] = useState<string>('');
  const [hasEnteredThreshold, setHasEnteredThreshold] = useState(false);

  useEffect(() => {
    // Check if threshold has been crossed today
    const today = new Date().toDateString();
    const lastThreshold = localStorage.getItem('offswitch-threshold-date');
    
    if (lastThreshold !== today) {
      setHasEnteredThreshold(false);
    } else {
      setHasEnteredThreshold(true);
      
      // Check onboarding after threshold
      const hasSeenOnboarding = localStorage.getItem('offswitch-onboarding-complete');
      if (!hasSeenOnboarding) {
        setShowOnboarding(true);
      }
    }
  }, []);

  const handleThresholdEnter = () => {
    const today = new Date().toDateString();
    localStorage.setItem('offswitch-threshold-date', today);
    setHasEnteredThreshold(true);
    
    // Check onboarding after entering
    const hasSeenOnboarding = localStorage.getItem('offswitch-onboarding-complete');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  const getModuleStreak = (moduleKey: string) => {
    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateKey = checkDate.toDateString();
      
      if (localStorage.getItem(`offswitch-${moduleKey}-${dateKey}`)) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getLastActivity = (moduleKey: string) => {
    for (let i = 0; i < 7; i++) {
      const checkDate = new Date();
      checkDate.setDate(checkDate.getDate() - i);
      const dateKey = checkDate.toDateString();
      
      if (localStorage.getItem(`offswitch-${moduleKey}-${dateKey}`)) {
        return i === 0 ? 'Today' : i === 1 ? 'Yesterday' : `${i} days ago`;
      }
    }
    return 'Never';
  };

  // Show threshold ritual if not entered today
  if (!hasEnteredThreshold) {
    return <ThresholdRitual onEnter={handleThresholdEnter} />;
  }

  if (activeModule === 'memory-archive') {
    return (
      <div className="min-h-screen bg-parchment">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => setActiveModule(null)}
            className="mb-6 text-sm text-graphite hover:text-charcoal slow-transition"
          >
            ← Back to Dashboard
          </button>
          <MemoryArchive />
        </main>
        
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-earth-brown/5 to-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment relative overflow-hidden">
      {/* Invisible sovereignty modulator */}
      <SovereigntyModulator />
      
      {/* Background effects with sovereignty-influenced textures */}
      <BackgroundEffects />
      
      {/* Symbolic echoes floating over everything */}
      <SymbolicEchoes />
      
      {/* Reverse notifications for missed interactions */}
      <ReverseNotifications />
      
      {/* Inner vocabulary lexicon */}
      <InnerVocabulary />
      
      {/* Mystery unlocks system */}
      <MysteryUnlocks />
      
      <Header />
      
      <OnboardingModal 
        isOpen={showOnboarding} 
        onComplete={handleOnboardingComplete} 
      />
      
      <MentalStatic />
      
      <main className="max-w-4xl mx-auto px-4 py-8 relative">
        {activeModule && activeModule !== 'memory-archive' ? (
          <ModuleView activeModule={activeModule} setActiveModule={setActiveModule} />
        ) : (
          <Dashboard
            sessionData={sessionData}
            getModuleStreak={getModuleStreak}
            getLastActivity={getLastActivity}
            setActiveModule={setActiveModule}
          />
        )}
        
        <footer className="mt-12 pt-8 border-t border-graphite-light text-center relative">
          <p className="text-graphite text-sm">
            Built for humans who refuse to outsource their thinking.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
