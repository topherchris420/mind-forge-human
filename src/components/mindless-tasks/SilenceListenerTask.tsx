
import React, { useState, useEffect } from 'react';
import { TaskComponentProps } from './mindlessTaskTypes';

const SilenceListenerTask = ({ onComplete }: TaskComponentProps) => {
  const [timeLeft, setTimeLeft] = useState(20);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
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
