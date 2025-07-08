
import React, { useState, useEffect } from 'react';

interface SovereigntyData {
  score: number;
  factors: {
    manualChoices: number;
    deepThinking: number;
    resistance: number;
    authenticity: number;
  };
  lastUpdate: number;
}

const SovereigntyScore = () => {
  const [sovereignty, setSovereignty] = useState<SovereigntyData>({
    score: 0,
    factors: { manualChoices: 0, deepThinking: 0, resistance: 0, authenticity: 0 },
    lastUpdate: Date.now()
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    loadSovereigntyData();
    
    // Random visibility - sometimes shows, sometimes doesn't
    const shouldShow = Math.random() > 0.6;
    setIsVisible(shouldShow);
  }, []);

  const loadSovereigntyData = () => {
    const stored = localStorage.getItem('offswitch-sovereignty');
    if (stored) {
      setSovereignty(JSON.parse(stored));
    }
  };

  const calculateSovereigntyScore = () => {
    // Gather data from various app interactions
    const resistance = localStorage.getItem('offswitch-resistance-date') ? 5 : 0;
    const humanToday = localStorage.getItem(`human-entries-${new Date().toDateString()}`) ? 3 : 0;
    const manualTasks = JSON.parse(localStorage.getItem('manual-choices') || '[]').length;
    const deepSessions = Object.keys(localStorage).filter(key => 
      key.startsWith('offswitch-') && key.includes('session')
    ).length;

    const newScore = resistance + humanToday + (manualTasks * 2) + (deepSessions * 1.5);
    const updatedSovereignty = {
      score: Math.floor(newScore),
      factors: {
        manualChoices: manualTasks,
        deepThinking: deepSessions,
        resistance: resistance > 0 ? 1 : 0,
        authenticity: humanToday > 0 ? 1 : 0
      },
      lastUpdate: Date.now()
    };

    setSovereignty(updatedSovereignty);
    localStorage.setItem('offswitch-sovereignty', JSON.stringify(updatedSovereignty));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-charcoal text-parchment p-4 border border-earth-brown max-w-xs opacity-80 z-30">
      <div className="text-xs text-earth-brown mb-2 uppercase tracking-widest">
        Sovereignty Index
      </div>
      
      <div className="text-2xl font-serif mb-3 text-center">
        {sovereignty.score || '?'}
      </div>
      
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span>Manual Choices</span>
          <span>{sovereignty.factors.manualChoices}</span>
        </div>
        <div className="flex justify-between">
          <span>Deep Sessions</span>
          <span>{sovereignty.factors.deepThinking}</span>
        </div>
        <div className="flex justify-between">
          <span>Daily Resistance</span>
          <span>{sovereignty.factors.resistance ? '✓' : '○'}</span>
        </div>
        <div className="flex justify-between">
          <span>Authenticity</span>
          <span>{sovereignty.factors.authenticity ? '✓' : '○'}</span>
        </div>
      </div>
      
      <button
        onClick={calculateSovereigntyScore}
        className="w-full mt-3 text-xs border border-earth-brown px-2 py-1 hover:bg-earth-brown hover:text-charcoal slow-transition"
      >
        Recalculate
      </button>
      
      <div className="text-xs text-graphite-light mt-2 italic text-center">
        Hidden score. Influences everything.
      </div>
    </div>
  );
};

export default SovereigntyScore;
