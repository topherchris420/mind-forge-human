
import React, { useState, useEffect } from 'react';
import { TaskComponentProps } from './mindlessTaskTypes';

const DotRearrangementTask = ({ onComplete }: TaskComponentProps) => {
  const [dots, setDots] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [arranged, setArranged] = useState(0);

  useEffect(() => {
    // Generate 100 random dots
    const newDots = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 300,
      y: Math.random() * 200
    }));
    setDots(newDots);
  }, []);

  const moveDot = (id: number) => {
    setDots(prev => prev.map(dot => 
      dot.id === id 
        ? { ...dot, x: Math.random() * 300, y: Math.random() * 200 }
        : dot
    ));
    
    const newArranged = arranged + 1;
    setArranged(newArranged);
    
    if (newArranged >= 100) {
      setTimeout(onComplete, 500);
    }
  };

  return (
    <div className="text-center">
      <div className="text-sm text-graphite mb-4">
        Rearrange all dots by clicking them ({arranged}/100)
      </div>
      <div className="relative w-80 h-52 mx-auto border border-graphite-light bg-parchment-dark">
        {dots.map(dot => (
          <button
            key={dot.id}
            onClick={() => moveDot(dot.id)}
            className="absolute w-2 h-2 bg-charcoal rounded-full hover:bg-earth-brown slow-transition"
            style={{ left: dot.x, top: dot.y }}
          />
        ))}
      </div>
    </div>
  );
};

export default DotRearrangementTask;
