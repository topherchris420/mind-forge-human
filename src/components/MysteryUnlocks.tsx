
import React, { useEffect, useState } from 'react';

interface UnlockCondition {
  key: string;
  name: string;
  description: string;
  checkCondition: () => boolean;
  mysticalHint: string;
}

const mysteryModules: UnlockCondition[] = [
  {
    key: 'paradox-mirror',
    name: 'Paradox Mirror',
    description: 'Reflect on contradictions within yourself',
    mysticalHint: 'When logic bends thrice, the mirror appears',
    checkCondition: () => {
      // Unlocks after using First Principles 3 times
      let count = 0;
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const key = `offswitch-workout-${date.toDateString()}`;
        if (localStorage.getItem(key)) count++;
      }
      return count >= 3;
    }
  },
  {
    key: 'void-scribe',
    name: 'Void Scribe',
    description: 'Write into the darkness',
    mysticalHint: 'When silence has been honored seven times',
    checkCondition: () => {
      // Unlocks after completing silence tasks multiple times
      const silenceCount = localStorage.getItem('offswitch-silence-completions');
      return silenceCount ? parseInt(silenceCount) >= 7 : false;
    }
  },
  {
    key: 'temporal-weaver',
    name: 'Temporal Weaver',
    description: 'Manipulate the flow of perception',
    mysticalHint: 'When you have witnessed fragments from beyond',
    checkCondition: () => {
      // Unlocks after viewing temporal fragments multiple times
      const fragmentViews = localStorage.getItem('temporal-fragment-views');
      return fragmentViews ? parseInt(fragmentViews) >= 5 : false;
    }
  }
];

const MysteryUnlocks = () => {
  const [unlockedModules, setUnlockedModules] = useState<string[]>([]);
  const [newlyUnlocked, setNewlyUnlocked] = useState<string | null>(null);

  useEffect(() => {
    const checkUnlocks = () => {
      const currentUnlocked = JSON.parse(localStorage.getItem('offswitch-unlocked-mysteries') || '[]');
      const newUnlocks: string[] = [];

      mysteryModules.forEach(module => {
        if (!currentUnlocked.includes(module.key) && module.checkCondition()) {
          newUnlocks.push(module.key);
          currentUnlocked.push(module.key);
        }
      });

      if (newUnlocks.length > 0) {
        localStorage.setItem('offswitch-unlocked-mysteries', JSON.stringify(currentUnlocked));
        setNewlyUnlocked(newUnlocks[0]);
        setTimeout(() => setNewlyUnlocked(null), 5000);
      }

      setUnlockedModules(currentUnlocked);
    };

    checkUnlocks();
    
    // Check periodically for new unlocks
    const interval = setInterval(checkUnlocks, 30000);
    return () => clearInterval(interval);
  }, []);

  const getUnlockedModule = (key: string) => {
    return mysteryModules.find(m => m.key === key);
  };

  if (newlyUnlocked) {
    const module = getUnlockedModule(newlyUnlocked);
    return (
      <div className="fixed inset-0 bg-charcoal/80 flex items-center justify-center z-50 animate-fade-in">
        <div className="bg-parchment border-2 border-earth-brown p-8 max-w-md text-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-earth-brown/10 to-transparent" />
          <div className="text-earth-brown text-sm uppercase tracking-wider mb-4 relative">
            Mystery Unveiled
          </div>
          <div className="text-charcoal text-xl font-serif mb-4 relative">
            {module?.name}
          </div>
          <div className="text-graphite text-sm italic relative">
            {module?.description}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export const useUnlockedModules = () => {
  const [unlockedModules, setUnlockedModules] = useState<string[]>([]);

  useEffect(() => {
    const unlocked = JSON.parse(localStorage.getItem('offswitch-unlocked-mysteries') || '[]');
    setUnlockedModules(unlocked);
  }, []);

  return unlockedModules;
};

export const isModuleUnlocked = (moduleKey: string): boolean => {
  const unlocked = JSON.parse(localStorage.getItem('offswitch-unlocked-mysteries') || '[]');
  return unlocked.includes(moduleKey);
};

export default MysteryUnlocks;
