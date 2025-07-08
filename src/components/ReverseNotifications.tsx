
import React, { useState, useEffect } from 'react';

interface MissedInteraction {
  type: string;
  message: string;
  timestamp: number;
}

const ReverseNotifications = () => {
  const [missedInteraction, setMissedInteraction] = useState<MissedInteraction | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    checkForMissedInteractions();
    
    const interval = setInterval(checkForMissedInteractions, 300000); // Check every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const checkForMissedInteractions = () => {
    const now = Date.now();
    const today = new Date().toDateString();
    
    // Check if daily resistance was missed
    const lastResistance = localStorage.getItem('offswitch-resistance-date');
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (lastResistance !== today && lastResistance !== yesterday.toDateString()) {
      showReverseNotification({
        type: 'resistance',
        message: 'The resistance waits for no one. Patterns solidify in silence.',
        timestamp: now
      });
      return;
    }
    
    // Check if user hasn't contributed to humanity board
    const humanEntries = localStorage.getItem(`human-entries-${today}`);
    if (!humanEntries && Math.random() > 0.7) {
      showReverseNotification({
        type: 'humanity',
        message: 'Your voice remains unheard. The collective grows quieter without you.',
        timestamp: now
      });
      return;
    }
    
    // Check for prolonged absence
    const lastVisit = localStorage.getItem('offswitch-last-visit');
    if (lastVisit && (now - parseInt(lastVisit)) > 24 * 60 * 60 * 1000) {
      showReverseNotification({
        type: 'absence',
        message: 'Digital gravity pulls you back toward the ordinary. Resistance requires presence.',
        timestamp: now
      });
      return;
    }
    
    // Update last visit
    localStorage.setItem('offswitch-last-visit', now.toString());
  };

  const showReverseNotification = (interaction: MissedInteraction) => {
    // Don't show if already shown recently
    const lastShown = localStorage.getItem('reverse-notification-shown');
    if (lastShown && (Date.now() - parseInt(lastShown)) < 60 * 60 * 1000) {
      return;
    }
    
    setMissedInteraction(interaction);
    setIsVisible(true);
    
    localStorage.setItem('reverse-notification-shown', Date.now().toString());
    
    // Auto-hide after 8 seconds
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => setMissedInteraction(null), 500);
    }, 8000);
  };

  const dismissNotification = () => {
    setIsVisible(false);
    setTimeout(() => setMissedInteraction(null), 500);
  };

  if (!missedInteraction) return null;

  return (
    <div 
      className={`fixed top-4 left-4 right-4 bg-warning-red text-parchment p-4 border border-parchment z-40 transition-all duration-500 ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="text-xs uppercase tracking-widest mb-2 opacity-80">
            Missed Interaction
          </div>
          <div className="text-sm font-serif italic leading-relaxed">
            {missedInteraction.message}
          </div>
        </div>
        
        <button
          onClick={dismissNotification}
          className="text-parchment hover:text-warning-red ml-4 text-lg leading-none"
        >
          ×
        </button>
      </div>
      
      <div className="text-xs opacity-60 mt-3">
        Gentle accountability. Poetic consequence.
      </div>
    </div>
  );
};

export default ReverseNotifications;
