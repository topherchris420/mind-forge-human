
import React, { useState, useEffect } from 'react';

const TimeGatedExperiences = () => {
  const [currentExperience, setCurrentExperience] = useState<string | null>(null);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    checkTimeGatedAvailability();
    
    const interval = setInterval(checkTimeGatedAvailability, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const checkTimeGatedAvailability = () => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    // Golden Hour Experience (6-8 AM or 6-8 PM)
    if ((hour >= 6 && hour < 8) || (hour >= 18 && hour < 20)) {
      setCurrentExperience('golden-hour');
      setIsAvailable(true);
    }
    // Midnight Contemplation (11 PM - 1 AM)
    else if (hour >= 23 || hour < 1) {
      setCurrentExperience('midnight-contemplation');
      setIsAvailable(true);
    }
    // Prime Time Resistance (7-9 PM on weekdays)
    else if (hour >= 19 && hour < 21 && now.getDay() >= 1 && now.getDay() <= 5) {
      setCurrentExperience('prime-resistance');
      setIsAvailable(true);
    }
    // Specific minute experiences (e.g., 11:11, 12:34)
    else if ((hour === 11 && minute === 11) || (hour === 12 && minute === 34)) {
      setCurrentExperience('synchronicity-moment');
      setIsAvailable(true);
    }
    else {
      setIsAvailable(false);
      setCurrentExperience(null);
    }
  };

  const getExperienceContent = () => {
    switch (currentExperience) {
      case 'golden-hour':
        return {
          title: 'Golden Hour Reflection',
          prompt: 'Write about the quality of light right now. How does it change your thoughts?',
          atmosphere: 'The liminal hours when day becomes night, or night becomes day.'
        };
      case 'midnight-contemplation':
        return {
          title: 'Midnight Contemplation',
          prompt: 'What truth emerges in darkness that daylight obscures?',
          atmosphere: 'The deep quiet when the world sleeps and thoughts become clear.'
        };
      case 'prime-resistance':
        return {
          title: 'Prime Time Resistance',
          prompt: 'While others consume, what will you create? What will you resist?',
          atmosphere: 'The hours when algorithms compete for attention. Choose consciousness.'
        };
      case 'synchronicity-moment':
        return {
          title: 'Synchronicity Moment',
          prompt: 'Notice this moment. What patterns are aligning in your life right now?',
          atmosphere: 'Time alignment. Numerical poetry. Meaning in the clock face.'
        };
      default:
        return null;
    }
  };

  if (!isAvailable || !currentExperience) return null;

  const experience = getExperienceContent();
  if (!experience) return null;

  return (
    <div className="bg-charcoal text-parchment border-2 border-earth-brown p-6 mb-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-earth-brown/10 to-transparent"></div>
      
      <div className="text-center mb-4">
        <div className="text-xs text-earth-brown mb-2 uppercase tracking-widest">
          Time-Gated Experience Available Now
        </div>
        <h3 className="text-xl font-serif text-parchment mb-2">
          {experience.title}
        </h3>
        <p className="text-sm text-graphite-light italic mb-4">
          {experience.atmosphere}
        </p>
      </div>
      
      <div className="bg-parchment-dark p-4 border border-graphite-light mb-4">
        <p className="text-charcoal leading-relaxed">
          {experience.prompt}
        </p>
      </div>
      
      <div className="text-xs text-earth-brown text-center">
        This experience is only available during specific times.
        <br />
        It will disappear when the moment passes.
      </div>
    </div>
  );
};

export default TimeGatedExperiences;
