
import React, { useState, useEffect, useRef } from 'react';

interface ThresholdRitualProps {
  onEnter: () => void;
}

const ThresholdRitual = ({ onEnter }: ThresholdRitualProps) => {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [glowIntensity, setGlowIntensity] = useState(0.3);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const glowRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Subtle glow animation
    glowRef.current = setInterval(() => {
      setGlowIntensity(prev => 0.3 + Math.sin(Date.now() / 1000) * 0.2);
    }, 50);

    return () => {
      if (glowRef.current) clearInterval(glowRef.current);
    };
  }, []);

  const startRitual = () => {
    setIsHolding(true);
    setProgress(0);
    
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setTimeout(onEnter, 500); // Brief pause before entrance
          return 100;
        }
        return newProgress;
      });
    }, 100); // 10 seconds total
  };

  const stopRitual = () => {
    setIsHolding(false);
    setProgress(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div className="fixed inset-0 bg-charcoal flex items-center justify-center">
      <div className="text-center">
        {/* Mystical instruction text */}
        <div className="text-parchment/60 text-sm mb-12 font-serif italic">
          Hold the spiral to enter
        </div>
        
        {/* The ritual shape */}
        <div 
          className="relative cursor-pointer select-none"
          onMouseDown={startRitual}
          onMouseUp={stopRitual}
          onMouseLeave={stopRitual}
          onTouchStart={startRitual}
          onTouchEnd={stopRitual}
        >
          {/* Outer glow ring */}
          <div 
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              width: '120px',
              height: '120px',
              margin: 'auto',
              boxShadow: `0 0 ${20 + glowIntensity * 30}px rgba(139, 69, 19, ${glowIntensity})`,
              transform: 'scale(1.2)',
            }}
          />
          
          {/* Main spiral shape */}
          <div 
            className="relative w-24 h-24 border-2 border-earth-brown rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              backgroundColor: `rgba(139, 69, 19, ${0.1 + progress * 0.005})`,
              borderColor: `rgba(139, 69, 19, ${0.5 + progress * 0.005})`,
              transform: `scale(${1 + progress * 0.002}) rotate(${progress * 3.6}deg)`,
            }}
          >
            {/* Inner spiral */}
            <div className="w-12 h-12 border border-earth-brown rounded-full flex items-center justify-center">
              <div className="w-6 h-6 border border-earth-brown rounded-full">
                <div className="w-full h-full bg-earth-brown/20 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Subtle progress indication through opacity, not bars */}
        {isHolding && (
          <div className="mt-8 text-earth-brown/60 text-xs font-serif italic animate-pulse">
            {progress < 30 && "The spiral awakens..."}
            {progress >= 30 && progress < 60 && "Presence deepens..."}
            {progress >= 60 && progress < 90 && "The threshold opens..."}
            {progress >= 90 && "Enter."}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThresholdRitual;
