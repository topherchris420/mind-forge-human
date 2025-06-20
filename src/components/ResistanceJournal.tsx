
import React, { useState, useEffect } from 'react';
import AnalogInteractions from './AnalogInteractions';

interface JournalEntry {
  id: string;
  date: string;
  prompt: string;
  response: string;
  resistance_level: number;
}

const journalPrompts = [
  "What automation did you consciously reject today?",
  "Describe a moment when you chose the harder path.",
  "What did you create with your hands instead of outsourcing?",
  "Write about a time you trusted your intuition over algorithms.",
  "What question did you answer without consulting the internet?",
  "Describe the physical sensation of manual effort.",
  "What did you remember instead of looking up?",
  "Write about choosing presence over productivity.",
  "What traditional skill are you cultivating?",
  "Describe the weight of a decision made without data."
];

const ResistanceJournal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [currentResponse, setCurrentResponse] = useState('');
  const [resistanceLevel, setResistanceLevel] = useState(1);
  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    // Load journal entries
    const savedEntries = JSON.parse(localStorage.getItem('resistance-journal') || '[]');
    setEntries(savedEntries);
    
    // Set today's prompt
    const today = new Date();
    const dayIndex = Math.floor(today.getTime() / (1000 * 60 * 60 * 24)) % journalPrompts.length;
    setCurrentPrompt(journalPrompts[dayIndex]);
  }, []);

  const saveEntry = () => {
    if (!currentResponse.trim()) return;
    
    setIsWriting(true);
    
    // Slow, contemplative writing process
    setTimeout(() => {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: new Date().toDateString(),
        prompt: currentPrompt,
        response: currentResponse,
        resistance_level: resistanceLevel
      };
      
      const updatedEntries = [newEntry, ...entries].slice(0, 30); // Keep last 30 entries
      setEntries(updatedEntries);
      localStorage.setItem('resistance-journal', JSON.stringify(updatedEntries));
      
      setCurrentResponse('');
      setIsWriting(false);
      
      // Generate new prompt for next time
      const newPromptIndex = Math.floor(Math.random() * journalPrompts.length);
      setCurrentPrompt(journalPrompts[newPromptIndex]);
    }, 2000);
  };

  return (
    <div className="bg-parchment border-2 border-graphite-light p-6 mb-8 relative">
      <div className="absolute inset-0 analog-texture pointer-events-none"></div>
      
      <h2 className="section-header">Resistance Journal</h2>
      
      <div className="mb-6">
        <p className="text-graphite text-sm italic">
          Daily practice in conscious opposition to unconscious habits.
        </p>
      </div>

      {/* Today's Prompt */}
      <div className="mb-6 p-4 bg-parchment-dark border border-graphite-light relative">
        <div className="text-xs text-earth-brown mb-2 uppercase tracking-wide">
          Today's Reflection
        </div>
        <div className="text-charcoal font-medium leading-relaxed">
          {currentPrompt}
        </div>
      </div>

      {/* Writing Area */}
      <AnalogInteractions soundType="pencil">
        <div className="space-y-4">
          <textarea
            value={currentResponse}
            onChange={(e) => setCurrentResponse(e.target.value)}
            className="raw-input w-full h-32 resize-none"
            placeholder="Write slowly. Let resistance emerge naturally..."
            disabled={isWriting}
          />
          
          {/* Resistance Level Selector */}
          <div className="flex items-center space-x-4">
            <label className="text-sm text-graphite">Resistance Level:</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => setResistanceLevel(level)}
                  className={`w-8 h-8 border border-graphite text-sm ${
                    resistanceLevel >= level ? 'bg-earth-brown text-parchment' : 'bg-parchment text-graphite'
                  } slow-transition`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={saveEntry}
            disabled={isWriting || !currentResponse.trim()}
            className="raw-button disabled:opacity-50"
          >
            {isWriting ? 'Recording...' : 'Archive Entry'}
          </button>
        </div>
      </AnalogInteractions>

      {/* Recent Entries */}
      {entries.length > 0 && (
        <div className="mt-8 pt-6 border-t border-graphite-light">
          <div className="text-sm text-graphite mb-4">Recent Resistance</div>
          <div className="space-y-4 max-h-64 overflow-y-auto smooth-scroll">
            {entries.slice(0, 3).map((entry) => (
              <div key={entry.id} className="p-3 bg-parchment-dark border border-graphite-light/50">
                <div className="text-xs text-earth-brown mb-2">
                  {entry.date} • Level {entry.resistance_level}
                </div>
                <div className="text-xs text-graphite mb-2 italic">
                  {entry.prompt}
                </div>
                <div className="text-sm text-charcoal leading-relaxed">
                  {entry.response.substring(0, 120)}...
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResistanceJournal;
