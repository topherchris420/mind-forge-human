
import React, { useState, useEffect } from 'react';

interface CSIEntry {
  id: string;
  task: string;
  description: string;
  csiScore: number;
  date: string;
}

const CSITracker = () => {
  const [entries, setEntries] = useState<CSIEntry[]>([]);
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('offswitch-csi-entries');
    if (stored) {
      setEntries(JSON.parse(stored));
    }
  }, []);

  const calculateCSI = (task: string, description: string): number => {
    const text = (task + ' ' + description).toLowerCase();
    
    // AI dependency indicators
    const aiIndicators = [
      'generated', 'chatgpt', 'ai helped', 'automated', 'script', 
      'template', 'copied', 'ai assisted', 'quick', 'instant'
    ];
    
    // Human effort indicators  
    const humanIndicators = [
      'manually', 'by hand', 'researched', 'thought through', 
      'step by step', 'from scratch', 'original', 'reflection'
    ];
    
    let aiScore = 0;
    let humanScore = 0;
    
    aiIndicators.forEach(indicator => {
      if (text.includes(indicator)) aiScore += 20;
    });
    
    humanIndicators.forEach(indicator => {
      if (text.includes(indicator)) humanScore += 15;
    });
    
    // Base score starts at 50 (neutral)
    const csi = Math.max(0, Math.min(100, 50 + aiScore - humanScore));
    return Math.round(csi);
  };

  const addEntry = () => {
    if (!task.trim() || !description.trim()) return;
    
    setIsSubmitting(true);
    
    // Intentional delay to discourage rapid input
    setTimeout(() => {
      const newEntry: CSIEntry = {
        id: Date.now().toString(),
        task: task.trim(),
        description: description.trim(),
        csiScore: calculateCSI(task, description),
        date: new Date().toLocaleDateString()
      };
      
      const updated = [newEntry, ...entries].slice(0, 20); // Keep last 20 entries
      setEntries(updated);
      localStorage.setItem('offswitch-csi-entries', JSON.stringify(updated));
      
      setTask('');
      setDescription('');
      setIsSubmitting(false);
    }, 1500);
  };

  const averageCSI = entries.length > 0 
    ? Math.round(entries.reduce((sum, entry) => sum + entry.csiScore, 0) / entries.length)
    : 0;

  const getCSIColor = (score: number) => {
    if (score < 30) return 'text-earth-brown';
    if (score < 70) return 'text-faded-blue';
    return 'text-warning-red';
  };

  return (
    <div className="bg-parchment border-2 border-graphite-light p-6 mb-8">
      <h2 className="section-header">AI Dependency Audit</h2>
      
      <div className="mb-6">
        <p className="text-graphite mb-4">
          Record a task or reflection. Be honest about your process and any assistance used.
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-charcoal font-medium mb-2">Task Summary</label>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="raw-input w-full"
              placeholder="What did you work on?"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label className="block text-charcoal font-medium mb-2">Process Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="raw-input w-full h-24 resize-none"
              placeholder="Describe your approach, tools used, and level of assistance..."
              disabled={isSubmitting}
            />
          </div>
          
          <button
            onClick={addEntry}
            disabled={isSubmitting || !task.trim() || !description.trim()}
            className="raw-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Processing...' : 'Submit Entry'}
          </button>
        </div>
      </div>

      {entries.length > 0 && (
        <div>
          <div className="mb-4 p-4 bg-parchment-dark border border-graphite-light">
            <h3 className="text-lg font-medium text-charcoal mb-2">Cognitive Substitution Index</h3>
            <div className="text-3xl font-bold">
              <span className={getCSIColor(averageCSI)}>
                {averageCSI}/100
              </span>
            </div>
            <p className="text-sm text-graphite mt-1">
              Average dependency score (0 = Human, 100 = AI-reliant)
            </p>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-charcoal">Recent Entries</h3>
            {entries.slice(0, 5).map((entry) => (
              <div key={entry.id} className="border border-graphite-light p-3 bg-parchment-dark/30">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-charcoal">{entry.task}</h4>
                  <div className="text-right">
                    <span className={`font-bold text-lg ${getCSIColor(entry.csiScore)}`}>
                      {entry.csiScore}
                    </span>
                    <div className="text-xs text-graphite">{entry.date}</div>
                  </div>
                </div>
                <p className="text-sm text-graphite">{entry.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CSITracker;
