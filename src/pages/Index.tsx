
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import OnboardingModal from '../components/OnboardingModal';
import DashboardCard from '../components/DashboardCard';
import MemoryArchive from '../components/MemoryArchive';
import CSITracker from '../components/CSITracker';
import FirstPrinciplesWorkout from '../components/FirstPrinciplesWorkout';
import TruthWithoutOracle from '../components/TruthWithoutOracle';
import AntiAutomationTracker from '../components/AntiAutomationTracker';
import WeeklyReflection from '../components/WeeklyReflection';

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeModule, setActiveModule] = useState<string | null>(null);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('offswitch-onboarding-complete');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
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
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-parchment">
      <Header />
      
      <OnboardingModal 
        isOpen={showOnboarding} 
        onComplete={handleOnboardingComplete} 
      />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 p-6 bg-parchment-dark border border-graphite-light">
          <h2 className="text-xl font-medium text-charcoal mb-3">Resistance Through Practice</h2>
          <p className="text-graphite leading-relaxed">
            OffSwitch is a tool for cognitive sovereignty. Each exercise here is designed to strengthen 
            your capacity for independent thought, manual effort, and first-principles reasoning. 
            Progress is measured not in efficiency, but in authentic human capability.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <DashboardCard
            title="Cognitive Sovereignty Index"
            description="Daily independence assessment"
            streak={getModuleStreak('csi')}
            lastActivity={getLastActivity('csi')}
          >
            <button
              onClick={() => setActiveModule('csi')}
              className="raw-button w-full text-sm"
            >
              Rate Today's Independence
            </button>
          </DashboardCard>

          <DashboardCard
            title="First Principles Workout"
            description="Break down complex problems from scratch"
            streak={getModuleStreak('workout')}
            lastActivity={getLastActivity('workout')}
          >
            <button
              onClick={() => setActiveModule('workout')}
              className="raw-button w-full text-sm"
            >
              Start Problem Breakdown
            </button>
          </DashboardCard>

          <DashboardCard
            title="Truth Without Oracle"
            description="Weekly prompts for genuine thinking"
            lastActivity={getLastActivity('truth')}
          >
            <button
              onClick={() => setActiveModule('truth')}
              className="raw-button w-full text-sm"
            >
              Answer This Week's Question
            </button>
          </DashboardCard>

          <DashboardCard
            title="Anti-Automation Tracker"
            description="Record moments of intentional manual effort"
            streak={getModuleStreak('automation')}
            lastActivity={getLastActivity('automation')}
          >
            <button
              onClick={() => setActiveModule('automation')}
              className="raw-button w-full text-sm"
            >
              Log Manual Choice
            </button>
          </DashboardCard>
        </div>

        {/* Memory Archive Access */}
        <div className="mb-8">
          <button
            onClick={() => setActiveModule('memory-archive')}
            className="w-full p-4 bg-parchment-dark border border-graphite-light hover:border-graphite slow-transition text-left"
          >
            <div className="text-lg font-medium text-charcoal mb-2">Memory Archive</div>
            <div className="text-sm text-graphite">Review and reflect on past entries</div>
          </button>
        </div>

        {/* Active Module Display */}
        {activeModule === 'csi' && (
          <div>
            <button
              onClick={() => setActiveModule(null)}
              className="mb-4 text-sm text-graphite hover:text-charcoal slow-transition"
            >
              ← Back to Dashboard
            </button>
            <CSITracker />
          </div>
        )}

        {activeModule === 'workout' && (
          <div>
            <button
              onClick={() => setActiveModule(null)}
              className="mb-4 text-sm text-graphite hover:text-charcoal slow-transition"
            >
              ← Back to Dashboard
            </button>
            <FirstPrinciplesWorkout />
          </div>
        )}

        {activeModule === 'truth' && (
          <div>
            <button
              onClick={() => setActiveModule(null)}
              className="mb-4 text-sm text-graphite hover:text-charcoal slow-transition"
            >
              ← Back to Dashboard
            </button>
            <TruthWithoutOracle />
          </div>
        )}

        {activeModule === 'automation' && (
          <div>
            <button
              onClick={() => setActiveModule(null)}
              className="mb-4 text-sm text-graphite hover:text-charcoal slow-transition"
            >
              ← Back to Dashboard
            </button>
            <AntiAutomationTracker />
          </div>
        )}

        {!activeModule && <WeeklyReflection />}
        
        <footer className="mt-12 pt-8 border-t border-graphite-light text-center">
          <p className="text-graphite text-sm">
            Built for humans who refuse to outsource their thinking.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
