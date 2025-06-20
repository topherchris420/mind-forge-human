
import React, { useState, useEffect } from 'react';

const staticPrompts = [
  "Imagine a triangle arguing with gravity.",
  "Describe joy without verbs.",
  "What color is the sound of forgetting?",
  "Draw the weight of anticipation.",
  "Listen to the texture of Thursday.",
  "Smell the echo of a digital photograph.",
  "How does silence taste when it's hurried?",
  "What temperature is the space between thoughts?",
  "Describe the shape of 'almost'.",
  "Paint the sound of light bending.",
  "Feel the rhythm of a question mark.",
  "What does 'maybe' weigh in your left hand?",
  "Translate the color of doubt into music.",
  "How does emptiness move when no one watches?",
  "Describe the flavor of unfinished sentences."
];

const MentalStatic = () => {
  const [currentStatic, setCurrentStatic] = useState<string>('');
  const [isActive, setIsActive] = useState(false);
  const [intensity, setIntensity] = useState(1);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        const randomPrompt = staticPrompts[Math.floor(Math.random() * staticPrompts.length)];
        setCurrentStatic(randomPrompt);
        
        // Randomly intensify
        if (Math.random() > 0.7) {
          setIntensity(prev => Math.min(prev + 1, 3));
        }
      }, 3000 + Math.random() * 5000); // Random intervals

      return () => clearInterval(interval);
    }
  }, [isActive]);

  const activateStatic = () => {
    setIsActive(true);
    const duration = 30000 + Math.random() * 60000; // 30-90 seconds
    
    setTimeout(() => {
      setIsActive(false);
      setCurrentStatic('');
      setIntensity(1);
    }, duration);
  };

  if (!isActive && !currentStatic) {
    return (
      <div className="bg-parchment-dark border border-graphite-light p-4 mb-6">
        <button
          onClick={activateStatic}
          className="w-full text-sm text-charcoal hover:text-earth-brown slow-transition py-2"
        >
          Generate Mental Static
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed top-1/4 right-4 left-4 bg-charcoal text-parchment p-6 border-2 border-warning-red z-40 ${
      intensity > 1 ? 'animate-pulse' : ''
    } ${intensity > 2 ? 'transform rotate-1' : ''}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-warning-red/20 to-transparent animate-breathe pointer-events-none"></div>
      
      <div className={`text-center ${intensity > 1 ? 'kinetic-text' : ''}`}>
        <div className="text-xs text-warning-red mb-2 uppercase tracking-widest">
          ∿ COGNITIVE INTERFERENCE ∿
        </div>
        
        <div className="text-lg leading-relaxed font-serif">
          {currentStatic}
        </div>
        
        {intensity > 2 && (
          <div className="text-xs text-graphite mt-4 italic animate-pulse">
            Let this disturb your patterns.
          </div>
        )}
      </div>
    </div>
  );
};

export default MentalStatic;
