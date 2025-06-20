
import React, { useState, useEffect } from 'react';

interface MissedInteraction {
  id: string;
  poeticMessage: string;
  timestamp: number;
  fadeAfter: number;
}

const poeticMessages = [
  "The glyph you didn't draw has faded.",
  "A thought arrived but wasn't written. It won't return.",
  "The spiral waited. It has since stilled.",
  "Your silence spoke, but no one listened.",
  "The words you didn't say have found another voice.",
  "An echo called your name. The sound has passed.",
  "The mirror turned away, unreflected.",
  "Time folded where you didn't step.",
  "The void held space for you. It has closed.",
  "A fragment sought your attention. It has scattered."
];

const ReverseNotifications = () => {
  const [missedInteractions, setMissedInteractions] = useState<MissedInteraction[]>([]);

  useEffect(() => {
    const checkMissedInteractions = () => {
      const today = new Date().toDateString();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();

      // Check for missed daily interactions
      const missedToday = [];

      // Check if they missed First Principles yesterday
      if (!localStorage.getItem(`offswitch-workout-${yesterdayStr}`)) {
        const lastShown = localStorage.getItem('missed-workout-shown');
        if (lastShown !== yesterdayStr) {
          missedToday.push({
            id: `workout-${yesterdayStr}`,
            poeticMessage: poeticMessages[Math.floor(Math.random() * poeticMessages.length)],
            timestamp: Date.now(),
            fadeAfter: Date.now() + 8000 // 8 seconds
          });
          localStorage.setItem('missed-workout-shown', yesterdayStr);
        }
      }

      // Check if they missed resistance journal
      if (!localStorage.getItem(`offswitch-resistance-${yesterdayStr}`)) {
        const lastShown = localStorage.getItem('missed-resistance-shown');
        if (lastShown !== yesterdayStr) {
          missedToday.push({
            id: `resistance-${yesterdayStr}`,
            poeticMessage: poeticMessages[Math.floor(Math.random() * poeticMessages.length)],
            timestamp: Date.now() + 2000, // Stagger notifications
            fadeAfter: Date.now() + 10000
          });
          localStorage.setItem('missed-resistance-shown', yesterdayStr);
        }
      }

      if (missedToday.length > 0) {
        setMissedInteractions(prev => [...prev, ...missedToday]);
      }
    };

    // Check on app start, then periodically
    checkMissedInteractions();
    const interval = setInterval(checkMissedInteractions, 5 * 60 * 1000); // Every 5 minutes

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Clean up expired notifications
    const cleanup = setInterval(() => {
      const now = Date.now();
      setMissedInteractions(prev => 
        prev.filter(notification => now < notification.fadeAfter)
      );
    }, 1000);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <>
      {missedInteractions.map(notification => (
        <div
          key={notification.id}
          className="fixed top-4 right-4 bg-charcoal/90 text-parchment p-4 max-w-xs border border-earth-brown/50 animate-fade-in z-50"
          style={{
            animationDelay: `${Math.max(0, notification.timestamp - Date.now())}ms`
          }}
        >
          <div className="text-sm font-serif italic leading-relaxed">
            {notification.poeticMessage}
          </div>
        </div>
      ))}
    </>
  );
};

export default ReverseNotifications;
