
import React, { useState, useEffect } from 'react';
import { Task } from './mindless-tasks/mindlessTaskTypes';
import { tasks } from './mindless-tasks/mindlessTasksConfig';

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
