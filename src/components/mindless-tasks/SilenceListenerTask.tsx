
import React, { useState, useEffect } from 'react';
import { TaskComponentProps } from './mindlessTaskTypes';
import { recordFriction } from '../SovereigntyScore';

const SilenceListenerTask = ({ onComplete }: TaskComponentProps) => {
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Record completion for mystery unlocks and sovereignty
          const completions = parseInt(localStorage.getItem('offswitch-silence-completions') || '0');
          localStorage.setItem('offswitch-silence-completions', (completions + 1).toString());
          
          // Record friction time for sovereignty score
          recordFriction(20);
          
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="text-center py-12">
      <div className="text-sm text-graphite mb-8">
        Listen to the silence for {timeLeft} seconds
      </div>
      <div className="text-6xl text-charcoal font-thin">
        {timeLeft}
      </div>
      <div className="text-xs text-graphite mt-4 italic">
        What do you hear in the emptiness?
      </div>
    </div>
  );
};

export default SilenceListenerTask;
