
import React, { useEffect } from 'react';

interface SovereigntyFactors {
  frictionEndured: number;
  originalityScore: number;
  sessionConsistency: number;
  mindfulPauses: number;
  manualChoices: number;
}

const calculateSovereigntyScore = (): number => {
  const factors: SovereigntyFactors = {
    frictionEndured: 0,
    originalityScore: 0,
    sessionConsistency: 0,
    mindfulPauses: 0,
    manualChoices: 0
  };

  // Calculate friction endured (time in slow interactions)
  const silenceTime = parseInt(localStorage.getItem('offswitch-total-silence-time') || '0');
  const thresholdTime = parseInt(localStorage.getItem('offswitch-threshold-time') || '0');
  factors.frictionEndured = Math.min(100, (silenceTime + thresholdTime) / 60); // Minutes to score

  // Calculate originality (entropy of writing)
  const allEntries = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('offswitch-') && key.includes('workout')) {
      const content = localStorage.getItem(key);
      if (content) allEntries.push(content);
    }
  }
  
  if (allEntries.length > 0) {
    const totalLength = allEntries.join(' ').length;
    const uniqueWords = new Set(allEntries.join(' ').split(' ')).size;
    factors.originalityScore = Math.min(100, (uniqueWords / totalLength) * 1000);
  }

  // Calculate session consistency
  let consecutiveDays = 0;
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateKey = date.toDateString();
    const hasActivity = localStorage.getItem(`offswitch-workout-${dateKey}`) || 
                      localStorage.getItem(`offswitch-resistance-${dateKey}`);
    if (hasActivity) {
      consecutiveDays++;
    } else {
      break;
    }
  }
  factors.sessionConsistency = Math.min(100, consecutiveDays * 5);

  // Calculate mindful pauses (silence completions)
  factors.mindfulPauses = Math.min(100, parseInt(localStorage.getItem('offswitch-silence-completions') || '0') * 10);

  // Calculate manual choices (anti-automation entries)
  factors.manualChoices = Math.min(100, parseInt(localStorage.getItem('offswitch-manual-choices') || '0') * 5);

  // Weighted average
  const score = (
    factors.frictionEndured * 0.3 +
    factors.originalityScore * 0.25 +
    factors.sessionConsistency * 0.25 +
    factors.mindfulPauses * 0.1 +
    factors.manualChoices * 0.1
  );

  return Math.round(score);
};

// This component modulates the interface based on sovereignty score
const SovereigntyModulator = () => {
  useEffect(() => {
    const score = calculateSovereigntyScore();
    
    // Store score for other components to use
    localStorage.setItem('offswitch-sovereignty-score', score.toString());
    
    // Modulate CSS variables based on score
    const root = document.documentElement;
    
    // Higher scores get subtly different colors
    const hueShift = score * 0.5; // 0-50 degree shift
    const saturationBoost = Math.min(10, score * 0.1); // Slight saturation increase
    const textureOpacity = 0.02 + (score * 0.0003); // More texture with higher scores
    
    root.style.setProperty('--sovereignty-hue-shift', `${hueShift}deg`);
    root.style.setProperty('--sovereignty-saturation', `${saturationBoost}%`);
    root.style.setProperty('--sovereignty-texture-opacity', textureOpacity.toString());
    
  }, []);

  return null; // This is an invisible modulator
};

export const getSovereigntyScore = (): number => {
  return parseInt(localStorage.getItem('offswitch-sovereignty-score') || '0');
};

export const recordFriction = (seconds: number) => {
  const current = parseInt(localStorage.getItem('offswitch-total-silence-time') || '0');
  localStorage.setItem('offswitch-total-silence-time', (current + seconds).toString());
};

export const recordManualChoice = () => {
  const current = parseInt(localStorage.getItem('offswitch-manual-choices') || '0');
  localStorage.setItem('offswitch-manual-choices', (current + 1).toString());
};

export default SovereigntyModulator;
