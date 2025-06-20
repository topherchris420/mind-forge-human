
import React, { useState, useEffect } from 'react';
import AnalogInteractions from './AnalogInteractions';

const resistanceChallenges = [
  {
    id: 'memory-diagram',
    title: 'Hand-Draw Your Memory',
    prompt: 'Draw a diagram of how you remember your childhood home. Use only lines and shapes. No words.',
    type: 'visual',
    reward: 'The mind sees what the hand remembers.'
  },
  {
    id: 'dream-concrete',
    title: 'Describe Without Metaphor',
    prompt: 'Describe last night\'s dream using only concrete, literal language. No "like" or "as if".',
    type: 'writing',
    reward: 'Dreams speak in facts when stripped of comparison.'
  },
  {
    id: 'sound-archeology',
    title: 'Sound Archaeology',
    prompt: 'Close your eyes. Write down every sound you can hear right now. Include the ones you usually ignore.',
    type: 'listening',
    reward: 'The world whispers to those who listen.'
  },
  {
    id: 'past-argument',
    title: 'Argue With Yesterday',
    prompt: 'Write a letter disagreeing with a decision you made yesterday. Defend today\'s perspective.',
    type: 'reflection',
    reward: 'Growth lives in the space between selves.'
  }
];

const DailyResistance = () => {
  const [todaysChallenge, setTodaysChallenge] = useState<any>(null);
  const [userResponse, setUserResponse] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const completedDate = localStorage.getItem('offswitch-resistance-date');
    
    if (completedDate === today) {
      setIsCompleted(true);
    }
    
    // Daily challenge based on date
    const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24)) % resistanceChallenges.length;
    setTodaysChallenge(resistanceChallenges[dayIndex]);
  }, []);

  const completeChallenge = () => {
    if (!userResponse.trim()) return;
    
    setIsSubmitting(true);
    
    // Slow, contemplative submission
    setTimeout(() => {
      const today = new Date().toDateString();
      localStorage.setItem('offswitch-resistance-date', today);
      localStorage.setItem('offswitch-resistance-response', userResponse);
      
      setIsCompleted(true);
      setShowReward(true);
      setIsSubmitting(false);
      
      // Hide reward after reading time
      setTimeout(() => setShowReward(false), 5000);
    }, 2000);
  };

  if (!todaysChallenge) return null;

  return (
    <div className="bg-parchment border-2 border-graphite-light p-6 mb-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-earth-brown to-transparent"></div>
      
      <h2 className="section-header flex items-center">
        <span className="mr-3">Daily Resistance</span>
        {isCompleted && <span className="text-earth-brown text-sm">✓ Completed</span>}
      </h2>
      
      {!isCompleted ? (
        <div className="space-y-6">
          <div className="p-4 bg-parchment-dark border border-graphite-light relative">
            <div className="text-sm text-earth-brown font-medium mb-2 uppercase tracking-wide">
              {todaysChallenge.type}
            </div>
            <h3 className="text-xl font-medium text-charcoal mb-3">
              {todaysChallenge.title}
            </h3>
            <p className="text-graphite leading-relaxed">
              {todaysChallenge.prompt}
            </p>
            
            {/* Subtle paper texture */}
            <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-transparent via-graphite-light to-transparent pointer-events-none"></div>
          </div>
          
          <AnalogInteractions soundType="pencil">
            <div>
              <label className="block text-charcoal font-medium mb-2">
                Your Response
              </label>
              <textarea
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                className="raw-input w-full h-32 resize-none"
                placeholder="Take your time. Let the resistance guide you..."
                disabled={isSubmitting}
              />
            </div>
          </AnalogInteractions>
          
          <button
            onClick={completeChallenge}
            disabled={isSubmitting || !userResponse.trim()}
            className="raw-button disabled:opacity-50"
          >
            {isSubmitting ? 'Contemplating...' : 'Complete Resistance'}
          </button>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-earth-brown text-lg font-medium mb-4">
            Today's resistance complete.
          </div>
          <p className="text-graphite italic">
            Return tomorrow for a new challenge in conscious living.
          </p>
        </div>
      )}
      
      {showReward && (
        <div className="fixed inset-0 bg-charcoal/90 flex items-center justify-center z-50">
          <div className="bg-parchment border-2 border-earth-brown p-8 max-w-lg text-center">
            <div className="text-earth-brown text-2xl font-medium mb-4 kinetic-text">
              {todaysChallenge.reward}
            </div>
            <div className="text-sm text-graphite">
              This wisdom fades in moments. Let it settle naturally.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyResistance;
