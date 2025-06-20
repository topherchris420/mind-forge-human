
import React, { useState, useEffect } from 'react';

interface Task {
  name: string;
  instruction: string;
  duration: number;
  component: React.ComponentType<{ onComplete: () => void }>;
}

const DotRearrangement = ({ onComplete }: { onComplete: () => void }) => {
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

const SilenceListener = ({ onComplete }: { onComplete: () => void }) => {
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

const PixelClicker = ({ onComplete }: { onComplete: () => void }) => {
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

const tasks: Task[] = [
  {
    name: "Dot Rearrangement",
    instruction: "Rearrange 100 dots by clicking each one",
    duration: 90,
    component: DotRearrangement
  },
  {
    name: "Silence Meditation",
    instruction: "Listen to 20 seconds of silence",
    duration: 20,
    component: SilenceListener
  },
  {
    name: "Pixel Precision",
    instruction: "Click every third pixel in the grid",
    duration: 90,
    component: PixelClicker
  }
];

interface MindlessTaskUnlockerProps {
  targetModule: string;
  onUnlock: () => void;
  isLocked: boolean;
}

const MindlessTaskUnlocker = ({ targetModule, onUnlock, isLocked }: MindlessTaskUnlockerProps) => {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const unlockedModules = JSON.parse(localStorage.getItem('unlocked-modules') || '[]');
    if (unlockedModules.includes(targetModule)) {
      setIsCompleted(true);
    }
  }, [targetModule]);

  const startTask = () => {
    const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
    setCurrentTask(randomTask);
  };

  const completeTask = () => {
    const unlockedModules = JSON.parse(localStorage.getItem('unlocked-modules') || '[]');
    unlockedModules.push(targetModule);
    localStorage.setItem('unlocked-modules', JSON.stringify(unlockedModules));
    
    setIsCompleted(true);
    setCurrentTask(null);
    onUnlock();
  };

  if (isCompleted || !isLocked) {
    return null;
  }

  if (currentTask) {
    const TaskComponent = currentTask.component;
    
    return (
      <div className="fixed inset-0 bg-charcoal/95 flex items-center justify-center z-50">
        <div className="bg-parchment border-2 border-earth-brown p-8 max-w-lg w-full mx-4">
          <div className="text-center mb-6">
            <div className="text-xs text-earth-brown mb-2 uppercase tracking-wide">
              Mindless Task Required
            </div>
            <div className="text-lg font-medium text-charcoal mb-2">
              {currentTask.name}
            </div>
            <div className="text-sm text-graphite">
              {currentTask.instruction}
            </div>
          </div>
          
          <TaskComponent onComplete={completeTask} />
          
          <div className="text-xs text-graphite text-center mt-6 italic">
            Intention requires friction.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-warning-red/10 border border-warning-red p-6 mb-6">
      <div className="text-center">
        <div className="text-sm text-warning-red mb-4">
          This module requires intentional access.
        </div>
        <button
          onClick={startTask}
          className="border border-warning-red text-warning-red px-4 py-2 hover:bg-warning-red hover:text-parchment slow-transition"
        >
          Begin Mindless Task
        </button>
      </div>
    </div>
  );
};

export default MindlessTaskUnlocker;
