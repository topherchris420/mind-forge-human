
import React, { useState, useEffect } from 'react';
import { TaskComponentProps } from './mindlessTaskTypes';

const PixelClickerTask = ({ onComplete }: TaskComponentProps) => {
  const [clicked, setClicked] = useState(0);
  const [pattern, setPattern] = useState<number[]>([]);

  useEffect(() => {
    // Generate pattern: every third pixel in a 20x20 grid
    const newPattern = [];
    for (let i = 0; i < 400; i++) {
      if ((i + 1) % 3 === 0) newPattern.push(i);
    }
    setPattern(newPattern);
  }, []);

  const clickPixel = (index: number) => {
    if (pattern.includes(index)) {
      const newClicked = clicked + 1;
      setClicked(newClicked);
      
      if (newClicked >= pattern.length) {
        setTimeout(onComplete, 500);
      }
    }
  };

  return (
    <div className="text-center">
      <div className="text-sm text-graphite mb-4">
        Click every third pixel ({clicked}/{pattern.length})
      </div>
      <div className="grid grid-cols-20 gap-0 w-80 h-80 mx-auto border border-graphite-light">
        {Array.from({ length: 400 }, (_, i) => (
          <button
            key={i}
            onClick={() => clickPixel(i)}
            className={`w-4 h-4 border border-graphite-light/30 ${
              pattern.includes(i) 
                ? clicked > pattern.indexOf(i) 
                  ? 'bg-earth-brown' 
                  : 'bg-parchment hover:bg-parchment-dark'
                : 'bg-graphite-light/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PixelClickerTask;
