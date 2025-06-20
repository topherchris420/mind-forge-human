import React, { useState, useEffect } from 'react';

interface Echo {
  id: string;
  content: string;
  x: number;
  y: number;
  opacity: number;
  timestamp: number;
}

const SymbolicEchoes = () => {
  const [activeEcho, setActiveEcho] = useState<Echo | null>(null);

  useEffect(() => {
    const showRandomEcho = () => {
      // Collect fragments from localStorage
      const fragments: string[] = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('offswitch-') && !key.includes('echo-shown')) {
          const content = localStorage.getItem(key);
          if (content && content.length > 10) {
            // Extract meaningful fragments
            const sentences = content.split(/[.!?]/).filter(s => s.trim().length > 5);
            fragments.push(...sentences.slice(0, 2));
          }
        }
      }

      if (fragments.length === 0) return;

      // Select random fragment
      const fragment = fragments[Math.floor(Math.random() * fragments.length)];
      const words = fragment.trim().split(' ');
      const echoText = words.slice(0, 3).join(' ') + (words.length > 3 ? '...' : '');

      const echo: Echo = {
        id: Date.now().toString(),
        content: echoText,
        x: Math.random() * 80 + 10, // 10-90% of screen width
        y: Math.random() * 60 + 20, // 20-80% of screen height
        opacity: 0.3 + Math.random() * 0.3, // 0.3-0.6 opacity
        timestamp: Date.now()
      };

      setActiveEcho(echo);

      // Fade out after 3 seconds
      setTimeout(() => {
        setActiveEcho(null);
      }, 3000);
    };

    // Show echo every 2-8 minutes randomly
    const scheduleNextEcho = () => {
      const delay = (2 + Math.random() * 6) * 60 * 1000; // 2-8 minutes
      setTimeout(() => {
        if (Math.random() > 0.3) { // 70% chance to show
          showRandomEcho();
        }
        scheduleNextEcho(); // Schedule next
      }, delay);
    };

    scheduleNextEcho();
  }, []);

  if (!activeEcho) return null;

  return (
    <div
      className="fixed pointer-events-none z-10 text-graphite font-serif italic text-sm animate-fade-in"
      style={{
        left: `${activeEcho.x}%`,
        top: `${activeEcho.y}%`,
        opacity: activeEcho.opacity,
        animation: 'fade-in 1s ease-out, fade-out 1s ease-out 2s forwards',
      }}
    >
      {activeEcho.content}
    </div>
  );
};

// Helper function to store user input fragments
export const captureSymbolicFragment = (text: string, context: string) => {
  if (text.length < 10) return;
  
  const fragments = JSON.parse(localStorage.getItem('offswitch-symbolic-fragments') || '[]');
  
  // Extract meaningful phrases
  const sentences = text.split(/[.!?]/).filter(s => s.trim().length > 5);
  const newFragments = sentences.slice(0, 2).map(sentence => ({
    content: sentence.trim(),
    context,
    timestamp: Date.now()
  }));

  fragments.push(...newFragments);
  
  // Keep only last 50 fragments
  const recentFragments = fragments.slice(-50);
  localStorage.setItem('offswitch-symbolic-fragments', JSON.stringify(recentFragments));
};

export default SymbolicEchoes;
