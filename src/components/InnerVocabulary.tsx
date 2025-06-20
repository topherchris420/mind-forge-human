import React, { useState, useEffect } from 'react';

interface VocabEntry {
  phrase: string;
  resonance: number;
  firstSeen: number;
  context: string;
}

const mysticalPrefixes = [
  'Fractal', 'Quiet', 'Shadow', 'Temporal', 'Void', 'Spiral', 'Whispered', 'Ancient',
  'Liminal', 'Sacred', 'Floating', 'Buried', 'Distant', 'Scattered', 'Folded'
];

const mysticalSuffixes = [
  'Dissonance', 'Spiral', 'Echo', 'Fragment', 'Resonance', 'Threshold', 'Weaving',
  'Silence', 'Current', 'Memory', 'Shift', 'Pattern', 'Depth', 'Portal', 'Whisper'
];

const generateMysticalPhrase = (inputText: string, context: string): string => {
  // Generate based on text characteristics
  const wordCount = inputText.split(' ').length;
  const hasQuestion = inputText.includes('?');
  const hasExclamation = inputText.includes('!');
  const avgWordLength = inputText.split(' ').reduce((sum, word) => sum + word.length, 0) / wordCount;

  let prefixIndex = Math.floor(avgWordLength * 2) % mysticalPrefixes.length;
  let suffixIndex = (wordCount + (hasQuestion ? 5 : 0) + (hasExclamation ? 3 : 0)) % mysticalSuffixes.length;

  // Add context influence
  if (context.includes('workout')) prefixIndex = (prefixIndex + 3) % mysticalPrefixes.length;
  if (context.includes('resistance')) suffixIndex = (suffixIndex + 7) % mysticalSuffixes.length;

  return `${mysticalPrefixes[prefixIndex]} ${mysticalSuffixes[suffixIndex]}`;
};

const InnerVocabulary = () => {
  const [vocabulary, setVocabulary] = useState<VocabEntry[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const loadVocabulary = () => {
      const stored = localStorage.getItem('offswitch-inner-vocabulary');
      if (stored) {
        setVocabulary(JSON.parse(stored));
      }
    };

    loadVocabulary();
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  if (!isVisible) {
    return (
      <button
        onClick={toggleVisibility}
        className="fixed bottom-4 left-4 w-8 h-8 bg-earth-brown/20 border border-earth-brown/50 text-earth-brown text-xs hover:bg-earth-brown/30 slow-transition"
      >
        ◊
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 bg-parchment border-2 border-earth-brown p-6 max-w-sm max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-charcoal font-serif text-lg">Inner Lexicon</h3>
        <button
          onClick={toggleVisibility}
          className="text-graphite hover:text-earth-brown text-sm"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-3">
        {vocabulary.length === 0 ? (
          <div className="text-graphite italic text-sm">
            Your vocabulary grows through practice...
          </div>
        ) : (
          vocabulary.map((entry, index) => (
            <div key={index} className="border-b border-graphite-light pb-2">
              <div className="text-earth-brown font-serif">
                {entry.phrase}
              </div>
              <div className="text-xs text-graphite mt-1">
                Resonance: {'●'.repeat(Math.min(5, entry.resonance))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Helper function to add new vocabulary entries
export const addToInnerVocabulary = (inputText: string, context: string) => {
  if (inputText.length < 20) return; // Only meaningful entries

  const phrase = generateMysticalPhrase(inputText, context);
  const stored = localStorage.getItem('offswitch-inner-vocabulary');
  const vocabulary: VocabEntry[] = stored ? JSON.parse(stored) : [];

  // Check if phrase already exists
  const existing = vocabulary.find(entry => entry.phrase === phrase);
  if (existing) {
    existing.resonance += 1;
  } else {
    vocabulary.push({
      phrase,
      resonance: 1,
      firstSeen: Date.now(),
      context
    });
  }

  // Keep only last 20 entries
  const recentVocabulary = vocabulary.slice(-20);
  localStorage.setItem('offswitch-inner-vocabulary', JSON.stringify(recentVocabulary));
};

export default InnerVocabulary;
