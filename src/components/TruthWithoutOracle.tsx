
import React, { useState, useEffect } from 'react';

interface DailyPrompt {
  date: string;
  prompt: string;
  category: string;
}

const prompts = [
  {
    prompt: "Should a person always tell the truth, even when it causes harm? Defend your position.",
    category: "Ethics"
  },
  {
    prompt: "What is the difference between being smart and being wise? Use examples from your own experience.",
    category: "Philosophy" 
  },
  {
    prompt: "Is progress always good? Consider both technological and social progress.",
    category: "Values"
  },
  {
    prompt: "What makes a life meaningful? Answer without referencing external authorities or popular definitions.",
    category: "Meaning"
  },
  {
    prompt: "Should there be limits to free speech? Where would you draw the line and why?",
    category: "Ethics"
  },
  {
    prompt: "Is it possible to be truly objective? What influences your ability to see clearly?",
    category: "Epistemology"
  },
  {
    prompt: "What do you owe to future generations? Consider your personal and collective responsibilities.",
    category: "Values"
  }
];

const TruthWithoutOracle = () => {
  const [todaysPrompt, setTodaysPrompt] = useState<DailyPrompt | null>(null);
  const [userResponse, setUserResponse] = useState('');
  const [hasResponded, setHasResponded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('offswitch-oracle-date');
    const storedResponse = localStorage.getItem('offswitch-oracle-response');
    
    if (storedDate === today && storedResponse) {
      setHasResponded(true);
      setUserResponse(storedResponse);
    } else {
      setHasResponded(false);
      setUserResponse('');
    }
    
    // Generate consistent daily prompt based on date
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const selectedPrompt = prompts[dayOfYear % prompts.length];
    
    setTodaysPrompt({
      date: today,
      prompt: selectedPrompt.prompt,
      category: selectedPrompt.category
    });
  }, []);

  const submitResponse = () => {
    if (!userResponse.trim()) return;
    
    setIsSubmitting(true);
    
    // Deliberate delay for contemplation
    setTimeout(() => {
      const today = new Date().toDateString();
      localStorage.setItem('offswitch-oracle-date', today);
      localStorage.setItem('offswitch-oracle-response', userResponse);
      
      setHasResponded(true);
      setIsSubmitting(false);
    }, 1000);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'ethics': return 'text-earth-brown';
      case 'philosophy': return 'text-faded-blue';
      case 'values': return 'text-graphite';
      case 'meaning': return 'text-charcoal';
      case 'epistemology': return 'text-warning-red';
      default: return 'text-charcoal';
    }
  };

  if (!todaysPrompt) return null;

  return (
    <div className="bg-parchment border-2 border-graphite-light p-6 mb-8">
      <h2 className="section-header">Truth Without Oracle</h2>
      
      <div className="mb-6">
        <p className="text-graphite mb-4">
          Daily ethical prompt. Your unassisted thoughts only. No research, no external validation.
        </p>
      </div>

      <div className="space-y-6">
        <div className="p-4 bg-parchment-dark border border-graphite-light">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-sm font-medium uppercase tracking-wide ${getCategoryColor(todaysPrompt.category)}`}>
              {todaysPrompt.category}
            </span>
            <span className="text-sm text-graphite">
              {new Date().toLocaleDateString()}
            </span>
          </div>
          <p className="text-charcoal text-lg leading-relaxed">
            {todaysPrompt.prompt}
          </p>
        </div>

        {!hasResponded ? (
          <div>
            <label className="block text-charcoal font-medium mb-2">
              Your Authentic Response
            </label>
            <textarea
              value={userResponse}
              onChange={(e) => setUserResponse(e.target.value)}
              className="raw-input w-full h-40 resize-none"
              placeholder="Write from your own understanding and experience. Take your time."
              disabled={isSubmitting}
            />
            
            <div className="mt-4">
              <button
                onClick={submitResponse}
                disabled={isSubmitting || !userResponse.trim()}
                className="raw-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Recording...' : 'Record Response'}
              </button>
            </div>
            
            <p className="text-sm text-graphite mt-3 italic">
              One response per day. Make it count.
            </p>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-medium text-charcoal mb-3">Your Response:</h3>
            <div className="p-4 bg-parchment border border-graphite-light">
              <p className="text-charcoal whitespace-pre-wrap leading-relaxed">
                {userResponse}
              </p>
            </div>
            <p className="text-sm text-earth-brown mt-3">
              ✓ Today's reflection complete. Return tomorrow for a new prompt.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TruthWithoutOracle;
