
import React from 'react';
import Header from '../components/Header';
import CSITracker from '../components/CSITracker';
import FirstPrinciplesWorkout from '../components/FirstPrinciplesWorkout';
import TruthWithoutOracle from '../components/TruthWithoutOracle';
import AntiAutomationTracker from '../components/AntiAutomationTracker';
import WeeklyReflection from '../components/WeeklyReflection';

const Index = () => {
  return (
    <div className="min-h-screen bg-parchment">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 p-6 bg-parchment-dark border border-graphite-light">
          <h2 className="text-xl font-medium text-charcoal mb-3">Resistance Through Practice</h2>
          <p className="text-graphite leading-relaxed">
            OffSwitch is a tool for cognitive sovereignty. Each exercise here is designed to strengthen 
            your capacity for independent thought, manual effort, and first-principles reasoning. 
            Progress is measured not in efficiency, but in authentic human capability.
          </p>
        </div>

        <CSITracker />
        <FirstPrinciplesWorkout />
        <TruthWithoutOracle />
        <AntiAutomationTracker />
        <WeeklyReflection />
        
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
