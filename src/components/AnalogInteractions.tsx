
import React, { useRef, useEffect } from 'react';

interface AnalogInteractionsProps {
  children: React.ReactNode;
  soundType?: 'pencil' | 'chalk' | 'typewriter' | 'page-turn' | 'breath';
  onInteraction?: () => void;
}

const AnalogInteractions = ({ children, soundType = 'pencil', onInteraction }: AnalogInteractionsProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio context for ASMR sounds (simulated with CSS animations)
    const createSound = () => {
      if (onInteraction) onInteraction();
      
      // Visual feedback based on sound type
      const element = document.createElement('div');
      element.className = `analog-sound-${soundType}`;
      document.body.appendChild(element);
      
      setTimeout(() => {
        document.body.removeChild(element);
      }, 1000);
    };

    return createSound;
  }, [soundType, onInteraction]);

  return (
    <div className="analog-interaction-wrapper">
      {children}
      <style jsx>{`
        .analog-sound-pencil::before {
          content: '';
          position: fixed;
          top: 50%;
          left: 50%;
          width: 2px;
          height: 20px;
          background: linear-gradient(to bottom, #8b4513, #654321);
          transform: translate(-50%, -50%) rotate(45deg);
          animation: pencil-scratch 0.3s ease-out;
          pointer-events: none;
          z-index: 1000;
        }
        
        @keyframes pencil-scratch {
          0% { opacity: 0; transform: translate(-50%, -50%) rotate(45deg) scale(0); }
          50% { opacity: 1; transform: translate(-50%, -50%) rotate(45deg) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) rotate(45deg) scale(1) translateX(10px); }
        }
        
        .analog-sound-chalk::before {
          content: '';
          position: fixed;
          top: 50%;
          left: 50%;
          width: 4px;
          height: 4px;
          background: #f5f5f5;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: chalk-dust 0.5s ease-out;
          pointer-events: none;
          z-index: 1000;
          box-shadow: 2px 2px 4px rgba(245, 245, 245, 0.3);
        }
        
        @keyframes chalk-dust {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5); }
        }
      `}</style>
    </div>
  );
};

export default AnalogInteractions;
