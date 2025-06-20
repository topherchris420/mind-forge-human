
import React, { useState, useEffect } from 'react';

interface WeightReading {
  text: string;
  symbol: string;
  intensity: number;
}

const weightReadings = [
  { text: "Like holding a hot stone", symbol: "🔥", intensity: 3 },
  { text: "Light as a leaf", symbol: "🍃", intensity: 1 },
  { text: "Impossible to carry", symbol: "⚡", intensity: 5 },
  { text: "Dense as old grief", symbol: "🌑", intensity: 4 },
  { text: "Weightless but permanent", symbol: "∞", intensity: 2 },
  { text: "Sharp like winter air", symbol: "❄️", intensity: 3 },
  { text: "Heavy as unspoken truth", symbol: "⚖️", intensity: 4 },
  { text: "Soft like forgotten names", symbol: "~", intensity: 2 },
  { text: "Rough as morning thoughts", symbol: "⟐", intensity: 3 },
  { text: "Smooth like worn worry", symbol: "○", intensity: 1 },
  { text: "Burning like good questions", symbol: "?", intensity: 4 },
  { text: "Cool like distant music", symbol: "♪", intensity: 2 }
];

interface CognitiveWeightProps {
  sessionData?: string;
  onWeightAssigned?: (weight: WeightReading) => void;
}

const CognitiveWeight = ({ sessionData, onWeightAssigned }: CognitiveWeightProps) => {
  const [currentWeight, setCurrentWeight] = useState<WeightReading | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  const calculateWeight = (data: string): WeightReading => {
    // Analyze text for complexity, originality, depth
    const wordCount = data.split(' ').length;
    const uniqueWords = new Set(data.toLowerCase().split(' ')).size;
    const avgWordLength = data.length / wordCount;
    
    // Questions indicate depth
    const questionCount = (data.match(/\?/g) || []).length;
    
    // Calculate complexity score
    const complexityScore = (uniqueWords / wordCount) * avgWordLength + (questionCount * 0.1);
    
    // Map to weight reading
    let weightIndex = Math.floor(complexityScore * 3) % weightReadings.length;
    
    // Add some randomness for mystery
    if (Math.random() > 0.7) {
      weightIndex = (weightIndex + Math.floor(Math.random() * 3)) % weightReadings.length;
    }
    
    return weightReadings[weightIndex];
  };

  const revealWeight = () => {
    if (!sessionData) return;
    
    setIsRevealing(true);
    
    // Dramatic reveal delay
    setTimeout(() => {
      const weight = calculateWeight(sessionData);
      setCurrentWeight(weight);
      setIsRevealing(false);
      
      if (onWeightAssigned) {
        onWeightAssigned(weight);
      }
    }, 2000);
  };

  if (isRevealing) {
    return (
      <div className="bg-charcoal text-parchment p-6 border border-earth-brown mb-6">
        <div className="text-center py-8">
          <div className="text-earth-brown text-lg mb-4 kinetic-text">
            Measuring cognitive density...
          </div>
          <div className="w-12 h-12 mx-auto border-2 border-earth-brown animate-spin rounded-full border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (currentWeight) {
    return (
      <div className="bg-parchment border-2 border-earth-brown p-6 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-earth-brown to-transparent"></div>
        
        <div className="text-center">
          <div className="text-xs text-earth-brown mb-2 uppercase tracking-wide">
            Cognitive Weight Index
          </div>
          
          <div className="text-4xl mb-4">{currentWeight.symbol}</div>
          
          <div className="text-xl font-serif text-charcoal italic">
            {currentWeight.text}
          </div>
          
          <div className="text-xs text-graphite mt-4">
            Density assessed. Weight assigned. Pattern recorded.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-parchment-dark border border-graphite-light p-4 mb-6">
      <button
        onClick={revealWeight}
        disabled={!sessionData}
        className="w-full text-sm text-charcoal hover:text-earth-brown slow-transition py-2 disabled:opacity-50"
      >
        Weigh This Session
      </button>
    </div>
  );
};

export default CognitiveWeight;
