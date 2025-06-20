
import React, { useState, useEffect } from 'react';

const WeeklyReflection = () => {
  const [reflection, setReflection] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [weekOf, setWeekOf] = useState('');

  useEffect(() => {
    // Get start of current week (Monday)
    const now = new Date();
    const monday = new Date(now);
    const day = monday.getDay();
    const diff = monday.getDate() - day + (day === 0 ? -6 : 1);
    monday.setDate(diff);
    
    const weekKey = monday.toDateString();
    setWeekOf(weekKey);
    
    const storedReflection = localStorage.getItem(`offswitch-reflection-${weekKey}`);
    if (storedReflection) {
      setReflection(storedReflection);
      setHasSubmitted(true);
    } else {
      setHasSubmitted(false);
      setReflection('');
    }
  }, []);

  const submitReflection = () => {
    if (!reflection.trim()) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      localStorage.setItem(`offswitch-reflection-${weekOf}`, reflection);
      setHasSubmitted(true);
      setIsSubmitting(false);
    }, 1500);
  };

  const isNewWeek = () => {
    return !hasSubmitted;
  };

  return (
    <div className="bg-parchment border-2 border-graphite-light p-6 mb-8">
      <h2 className="section-header">Utility Without Spectacle</h2>
      
      <div className="mb-6">
        <p className="text-graphite mb-4">
          Weekly reflection on tangible contributions made without digital assistance.
        </p>
        
        <div className="text-sm text-graphite mb-4">
          Week of: {new Date(weekOf).toLocaleDateString()}
        </div>
      </div>

      {!hasSubmitted ? (
        <div className="space-y-4">
          <div>
            <label className="block text-charcoal font-medium mb-2">
              What did you build, create, or contribute this week without digital shortcuts?
            </label>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              className="raw-input w-full h-40 resize-none"
              placeholder="Focus on tangible outcomes: objects made, problems solved manually, skills developed, conversations held, physical improvements, etc. No copy-paste allowed."
              disabled={isSubmitting}
            />
          </div>
          
          <div className="text-sm text-graphite italic mb-4">
            Guidelines: Be specific about manual effort. Avoid vague accomplishments. Focus on what exists now that didn't exist before your direct, unassisted work.
          </div>
          
          <button
            onClick={submitReflection}
            disabled={isSubmitting || !reflection.trim()}
            className="raw-button disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Recording...' : 'Submit Weekly Reflection'}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-medium text-charcoal mb-3">Your Weekly Contribution:</h3>
          <div className="p-4 bg-parchment-dark border border-graphite-light">
            <p className="text-charcoal whitespace-pre-wrap leading-relaxed">
              {reflection}
            </p>
          </div>
          <p className="text-sm text-earth-brown mt-3">
            ✓ This week's reflection recorded. New week starts Monday.
          </p>
        </div>
      )}
    </div>
  );
};

export default WeeklyReflection;
