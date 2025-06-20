
import React, { useState, useEffect } from 'react';

interface Challenge {
  id: string;
  question: string;
  type: 'logic' | 'synthesis' | 'analysis';
}

const challenges: Challenge[] = [
  {
    id: '1',
    question: 'You have 8 balls, one of which is slightly heavier. Using a balance scale only twice, how do you identify the heavier ball? Explain your reasoning step by step.',
    type: 'logic'
  },
  {
    id: '2', 
    question: 'Connect these concepts without using analogies: Democracy, Photosynthesis, Jazz Music. Find the underlying principle that unites them.',
    type: 'synthesis'
  },
  {
    id: '3',
    question: 'Why do people form queues naturally, even when not instructed? Break this down to first principles of human behavior.',
    type: 'analysis'
  },
  {
    id: '4',
    question: 'Design a fair method to divide a cake between 5 people where everyone thinks they got the best piece. No cutting tools except one knife.',
    type: 'logic'
  },
  {
    id: '5',
    question: 'What do shadows, echoes, and memories have in common at the most fundamental level? Build your answer from basic principles.',
    type: 'synthesis'
  }
];

const FirstPrinciplesWorkout = () => {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedToday, setCompletedToday] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const lastCompleted = localStorage.getItem('offswitch-workout-date');
    setCompletedToday(lastCompleted === today);
  }, []);

  const startChallenge = () => {
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    setCurrentChallenge(randomChallenge);
    setStartTime(Date.now());
    setUserAnswer('');
  };

  const submitAnswer = () => {
    if (!userAnswer.trim() || !startTime) return;
    
    setIsSubmitting(true);
    
    // Intentional delay to encourage reflection
    setTimeout(() => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      const today = new Date().toDateString();
      
      // Store completion
      localStorage.setItem('offswitch-workout-date', today);
      localStorage.setItem('offswitch-workout-time', timeSpent.toString());
      
      setCompletedToday(true);
      setCurrentChallenge(null);
      setUserAnswer('');
      setStartTime(null);
      setIsSubmitting(false);
    }, 2000);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'logic': return 'text-faded-blue';
      case 'synthesis': return 'text-earth-brown';
      case 'analysis': return 'text-graphite';
      default: return 'text-charcoal';
    }
  };

  return (
    <div className="bg-parchment border-2 border-graphite-light p-6 mb-8">
      <h2 className="section-header">First Principles Workout</h2>
      
      <div className="mb-6">
        <p className="text-graphite mb-4">
          Mental exercise that requires original thinking. No external help, no shortcuts.
        </p>
        
        {completedToday && !currentChallenge ? (
          <div className="p-4 bg-earth-brown/10 border border-earth-brown/30">
            <p className="text-earth-brown font-medium">
              ✓ Today's cognitive workout completed. Return tomorrow for a new challenge.
            </p>
          </div>
        ) : null}
      </div>

      {!currentChallenge && !completedToday ? (
        <button
          onClick={startChallenge}
          className="raw-button"
        >
          Begin Today's Challenge
        </button>
      ) : null}

      {currentChallenge && (
        <div className="space-y-6">
          <div className="p-4 bg-parchment-dark border border-graphite-light">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-sm font-medium uppercase tracking-wide ${getTypeColor(currentChallenge.type)}`}>
                {currentChallenge.type}
              </span>
              {startTime && (
                <span className="text-sm text-graphite">
                  Started {Math.round((Date.now() - startTime) / 1000 / 60)} min ago
                </span>
              )}
            </div>
            <p className="text-charcoal text-lg leading-relaxed">
              {currentChallenge.question}
            </p>
          </div>
          
          <div>
            <label className="block text-charcoal font-medium mb-2">
              Your Response (manual input only)
            </label>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="raw-input w-full h-32 resize-none"
              placeholder="Think step by step. Build from basic principles. No rush."
              disabled={isSubmitting}
            />
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={submitAnswer}
              disabled={isSubmitting || !userAnswer.trim()}
              className="raw-button disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Response'}
            </button>
            
            <button
              onClick={() => {
                setCurrentChallenge(null);
                setUserAnswer('');
                setStartTime(null);
              }}
              className="border-2 border-graphite-light text-graphite px-4 py-2 hover:bg-parchment-dark slow-transition"
              disabled={isSubmitting}
            >
              Cancel
            </button>
          </div>
          
          <div className="text-sm text-graphite italic">
            Note: There are no "correct" answers stored. This is about your thinking process.
          </div>
        </div>
      )}
    </div>
  );
};

export default FirstPrinciplesWorkout;
