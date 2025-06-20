
import React, { useState, useEffect } from 'react';

interface CandyModule {
  id: string;
  title: string;
  prompt: string;
  unlockCondition: string;
  isUnlocked: boolean;
  mysterLevel: number;
}

const CognitiveCandy = () => {
  const [modules, setModules] = useState<CandyModule[]>([]);
  const [selectedModule, setSelectedModule] = useState<CandyModule | null>(null);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    const resistanceScore = getResistanceScore();
    
    const allModules: CandyModule[] = [
      {
        id: 'thought-shape',
        title: 'Trace Your Thought',
        prompt: 'Draw the shape of your current thought. What would it look like if thoughts had geometry?',
        unlockCondition: 'Complete 1 Daily Resistance',
        isUnlocked: resistanceScore >= 1,
        mysterLevel: 1
      },
      {
        id: 'color-emotion',
        title: 'What Color is Confusion?',
        prompt: 'Describe the exact color of your confusion today. Not metaphorically—literally.',
        unlockCondition: 'Complete 3 Daily Resistances',
        isUnlocked: resistanceScore >= 3,
        mysterLevel: 2
      },
      {
        id: 'silence-weight',
        title: 'Weigh the Silence',
        prompt: 'How much does silence weigh? Measure it using your own units.',
        unlockCondition: 'Complete 7 Daily Resistances',
        isUnlocked: resistanceScore >= 7,
        mysterLevel: 3
      },
      {
        id: 'dream-inventory',
        title: 'Inventory Your Dreams',
        prompt: 'List everything you owned in last night\'s dream. Be specific about impossible objects.',
        unlockCondition: 'Complete 14 Daily Resistances',
        isUnlocked: resistanceScore >= 14,
        mysterLevel: 4
      }
    ];
    
    setModules(allModules);
  }, []);

  const getResistanceScore = () => {
    let score = 0;
    for (let i = 0; i < 30; i++) {
      const checkDate = new Date();
      checkDate.setDate(checkDate.getDate() - i);
      const dateKey = checkDate.toDateString();
      if (localStorage.getItem(`offswitch-resistance-${dateKey}`)) {
        score++;
      }
    }
    return score;
  };

  const completeModule = (moduleId: string) => {
    if (!userInput.trim()) return;
    
    const today = new Date().toDateString();
    localStorage.setItem(`offswitch-candy-${moduleId}-${today}`, userInput);
    
    setSelectedModule(null);
    setUserInput('');
  };

  const getMysteryOpacity = (level: number) => {
    return level <= 2 ? 1 : Math.max(0.3, 1 - (level - 2) * 0.2);
  };

  return (
    <div className="bg-parchment border-2 border-graphite-light p-6 mb-8">
      <h2 className="section-header">Cognitive Candy</h2>
      
      <div className="mb-4">
        <p className="text-graphite text-sm italic">
          Unlock through resistance. No explanations provided.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((module) => (
          <div
            key={module.id}
            className={`p-4 border transition-all duration-500 ${
              module.isUnlocked
                ? 'border-graphite-light bg-parchment-dark hover:border-graphite cursor-pointer'
                : 'border-graphite-light/30 bg-parchment/50 cursor-not-allowed'
            }`}
            style={{ opacity: getMysteryOpacity(module.mysterLevel) }}
            onClick={() => module.isUnlocked && setSelectedModule(module)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className={`font-medium ${
                module.isUnlocked ? 'text-charcoal' : 'text-graphite-light'
              }`}>
                {module.isUnlocked ? module.title : '???'}
              </h3>
              <div className="text-xs text-earth-brown">
                Level {module.mysterLevel}
              </div>
            </div>
            
            {module.isUnlocked ? (
              <p className="text-sm text-graphite leading-relaxed">
                {module.prompt.substring(0, 60)}...
              </p>
            ) : (
              <p className="text-xs text-graphite-light italic">
                {module.unlockCondition}
              </p>
            )}
          </div>
        ))}
      </div>

      {selectedModule && (
        <div className="fixed inset-0 bg-charcoal/80 flex items-center justify-center p-4 z-50">
          <div className="bg-parchment border-2 border-charcoal max-w-lg w-full p-6">
            <h3 className="text-lg font-medium text-charcoal mb-4">
              {selectedModule.title}
            </h3>
            
            <p className="text-graphite mb-4 leading-relaxed">
              {selectedModule.prompt}
            </p>
            
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="raw-input w-full h-24 resize-none mb-4"
              placeholder="Let curiosity guide your response..."
            />
            
            <div className="flex space-x-3">
              <button
                onClick={() => completeModule(selectedModule.id)}
                disabled={!userInput.trim()}
                className="raw-button disabled:opacity-50"
              >
                Complete
              </button>
              <button
                onClick={() => setSelectedModule(null)}
                className="px-4 py-2 border border-graphite text-graphite hover:bg-graphite hover:text-parchment slow-transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CognitiveCandy;
