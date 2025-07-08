
import React, { useState, useEffect } from 'react';

interface Echo {
  id: string;
  text: string;
  x: number;
  y: number;
  opacity: number;
  size: number;
}

const SymbolicEchoes = () => {
  const [echoes, setEchoes] = useState<Echo[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) { // 15% chance every 5 seconds
        createEcho();
      }
      
      // Fade existing echoes
      setEchoes(prev => prev
        .map(echo => ({ ...echo, opacity: echo.opacity - 0.02 }))
        .filter(echo => echo.opacity > 0)
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const createEcho = () => {
    // Extract fragments from localStorage
    const fragments = extractUserFragments();
    if (fragments.length === 0) return;

    const fragment = fragments[Math.floor(Math.random() * fragments.length)];
    const newEcho: Echo = {
      id: Date.now().toString(),
      text: fragment,
      x: Math.random() * 80 + 10, // 10-90% of screen width
      y: Math.random() * 70 + 15, // 15-85% of screen height
      opacity: 0.6,
      size: Math.random() * 0.3 + 0.7 // 0.7-1.0 scale
    };

    setEchoes(prev => [...prev, newEcho]);
  };

  const extractUserFragments = (): string[] => {
    const fragments: string[] = [];
    
    // Get fragments from various sources
    Object.keys(localStorage).forEach(key => {
      if (key.includes('offswitch-resistance-response')) {
        const response = localStorage.getItem(key);
        if (response) {
          const words = response.split(' ').filter(word => word.length > 4);
          fragments.push(...words.slice(0, 3)); // First 3 meaningful words
        }
      }
      
      if (key.includes('human-entries')) {
        const entries = JSON.parse(localStorage.getItem(key) || '[]');
        entries.forEach((entry: any) => {
          if (entry.content) {
            const words = entry.content.split(' ').filter(word => word.length > 5);
            fragments.push(...words.slice(0, 2));
          }
        });
      }
    });

    return fragments.slice(0, 10); // Limit to prevent overflow
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {echoes.map(echo => (
        <div
          key={echo.id}
          className="absolute text-graphite-light font-serif italic transform -rotate-12"
          style={{
            left: `${echo.x}%`,
            top: `${echo.y}%`,
            opacity: echo.opacity,
            fontSize: `${echo.size * 0.8}rem`,
            transform: `scale(${echo.size}) rotate(${Math.random() * 20 - 10}deg)`
          }}
        >
          {echo.text}
        </div>
      ))}
    </div>
  );
};

export default SymbolicEchoes;
