
import React, { useState, useEffect } from 'react';

interface ThresholdRitualProps {
  onComplete: () => void;
}

const ThresholdRitual = ({ onComplete }: ThresholdRitualProps) => {
  const [isActive, setIsActive] = useState(true);
  const [glowIntensity, setGlowIntensity] = useState(0.3);
  const [touchCount, setTouchCount] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem('threshold-completed-today');
    const today = new Date().toDateString();
    
    if (completed === today) {
      setIsActive(false);
      onComplete();
      return;
    }

    // Breathing effect
    const interval = setInterval(() => {
      setGlowIntensity(prev => 0.2 + Math.sin(Date.now() * 0.002) * 0.3);
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleInteraction = () => {
    if (isCompleting) return;
    
    const newTouchCount = touchCount + 1;
    setTouchCount(newTouchCount);
    
    // Require 3 deliberate interactions
    if (newTouchCount >= 3) {
      setIsCompleting(true);
      
      setTimeout(() => {
        const today = new Date().toDateString();
        localStorage.setItem('threshold-completed-today', today);
        setIsActive(false);
        onComplete();
      }, 2000);
    }
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 bg-ink z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Glowing geometric shape */}
        <div
          className="w-32 h-32 mx-auto mb-8 cursor-pointer relative"
          onClick={handleInteraction}
          style={{
            background: `radial-gradient(circle, rgba(139, 69, 19, ${glowIntensity}) 0%, transparent 70%)`,
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            transition: 'all 0.1s ease-out'
          }}
        >
          <div className="absolute inset-0 border-2 border-earth-brown opacity-60"
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          />
        </div>
        
        {touchCount > 0 && (
          <div className="text-parchment text-sm mb-4 kinetic-text">
            {touchCount === 1 && "Again."}
            {touchCount === 2 && "Once more."}
            {touchCount >= 3 && "Threshold crossed."}
          </div>
        )}
        
        {isCompleting && (
          <div className="text-earth-brown text-lg font-serif animate-pulse">
            Welcome to conscious resistance.
          </div>
        )}
        
        {touchCount === 0 && (
          <div className="text-parchment-dark text-xs uppercase tracking-widest">
            Touch to enter
          </div>
        )}
      </div>
    </div>
  );
};

export default ThresholdRitual;
