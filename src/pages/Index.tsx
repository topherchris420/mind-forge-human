import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import OnboardingModal from '../components/OnboardingModal';
import MemoryArchive from '../components/MemoryArchive';
import MentalStatic from '../components/MentalStatic';
import BackgroundEffects from '../components/BackgroundEffects';
import Dashboard from '../components/Dashboard';
import ModuleView from '../components/ModuleView';
import ThresholdRitual from '../components/ThresholdRitual';
import SovereigntyScore from '../components/SovereigntyScore';
import SymbolicEchoes from '../components/SymbolicEchoes';
import TimeGatedExperiences from '../components/TimeGatedExperiences';
import ReverseNotifications from '../components/ReverseNotifications';

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [sessionData, setSessionData] = useState<string>('');
  const [showThreshold, setShowThreshold] = useState(true);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('offswitch-onboarding-complete');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
    
    // Check if threshold was completed today
    const completed = localStorage.getItem('threshold-completed-today');
    const today = new Date().toDateString();
    if (completed === today) {
      setShowThreshold(false);
    }
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  const handleThresholdComplete = () => {
    setShowThreshold(false);
  };

  const getModuleStreak = (moduleKey: string) => {
    // Simple streak calculation - count consecutive days with entries
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
    // Find most recent activity
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

  // Threshold Ritual - must be completed before accessing the app
  if (showThreshold) {
    return <ThresholdRitual onComplete={handleThresholdComplete} />;
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
        
        {/* Ambient background for archival experience */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-earth-brown/5 to-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment relative overflow-hidden">
      <BackgroundEffects />
      
      {/* New Components */}
      <SymbolicEchoes />
      <ReverseNotifications />
      <SovereigntyScore />
      
      <Header />
      
      <OnboardingModal 
        isOpen={showOnboarding} 
        onComplete={handleOnboardingComplete} 
      />
      
      {/* Mental Static - Can appear randomly */}
      <MentalStatic />
      
      <main className="max-w-4xl mx-auto px-4 py-8 relative">
        {/* Time-Gated Experiences */}
        <TimeGatedExperiences />
        
        {/* Active Module Display */}
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
