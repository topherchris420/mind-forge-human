
import React, { useState, useEffect } from 'react';

interface VocabularyEntry {
  word: string;
  meaning: string;
  context: string;
  timestamp: number;
  frequency: number;
}

const InnerVocabulary = () => {
  const [vocabulary, setVocabulary] = useState<VocabularyEntry[]>([]);
  const [isRevealing, setIsRevealing] = useState(false);
  const [selectedWord, setSelectedWord] = useState<VocabularyEntry | null>(null);

  useEffect(() => {
    generateVocabulary();
  }, []);

  const generateVocabulary = () => {
    const userTexts = extractUserTexts();
    const generatedWords = generateSymbolicWords(userTexts);
    setVocabulary(generatedWords);
  };

  const extractUserTexts = (): string[] => {
    const texts: string[] = [];
    
    Object.keys(localStorage).forEach(key => {
      if (key.includes('resistance-response') || key.includes('human-entries')) {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            if (key.includes('human-entries')) {
              const entries = JSON.parse(data);
              entries.forEach((entry: any) => {
                if (entry.content) texts.push(entry.content);
              });
            } else {
              texts.push(data);
            }
          } catch (e) {
            texts.push(data);
          }
        }
      }
    });
    
    return texts;
  };

  const generateSymbolicWords = (texts: string[]): VocabularyEntry[] => {
    if (texts.length === 0) return [];
    
    const allWords = texts.join(' ').toLowerCase().split(/\s+/)
      .filter(word => word.length > 4 && /^[a-zA-Z]+$/.test(word));
    
    const wordFreq = allWords.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Generate symbolic meanings based on common words
    const symbolicWords: VocabularyEntry[] = [];
    const meaningTemplates = [
      'The space between intention and action',
      'What remains when algorithms fail',
      'The weight of unspoken thoughts',
      'Resistance disguised as acceptance',
      'The texture of genuine choice',
      'Memory before it becomes nostalgia',
      'The sound of patterns breaking',
      'What artificial intelligence cannot touch'
    ];
    
    Object.entries(wordFreq)
      .filter(([_, freq]) => freq > 1)
      .slice(0, 8)
      .forEach(([word, freq], index) => {
        symbolicWords.push({
          word: word.charAt(0).toUpperCase() + word.slice(1),
          meaning: meaningTemplates[index % meaningTemplates.length],
          context: `Emerged from your authentic expression`,
          timestamp: Date.now(),
          frequency: freq
        });
      });
    
    return symbolicWords;
  };

  const revealVocabulary = () => {
    setIsRevealing(true);
    setTimeout(() => {
      setIsRevealing(false);
    }, 2000);
  };

  if (vocabulary.length === 0) {
    return (
      <div className="bg-parchment-dark border border-graphite-light p-4 mb-6">
        <div className="text-center text-graphite">
          <div className="text-sm mb-2">Inner Vocabulary</div>
          <div className="text-xs italic">
            Your symbolic lexicon will emerge through authentic expression.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-parchment border-2 border-graphite-light p-6 mb-6">
      <h3 className="section-header text-lg">Inner Vocabulary</h3>
      
      <div className="text-sm text-graphite mb-4">
        Private meanings generated from your authentic words.
      </div>
      
      {isRevealing ? (
        <div className="text-center py-8">
          <div className="text-earth-brown kinetic-text">
            Excavating personal symbols...
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {vocabulary.map((entry, index) => (
            <button
              key={index}
              onClick={() => setSelectedWord(entry)}
              className="p-3 bg-parchment-dark border border-graphite-light hover:border-earth-brown slow-transition text-left"
            >
              <div className="font-medium text-charcoal text-sm">
                {entry.word}
              </div>
              <div className="text-xs text-graphite">
                Used {entry.frequency} times
              </div>
            </button>
          ))}
        </div>
      )}
      
      <button
        onClick={revealVocabulary}
        className="w-full mt-4 text-xs text-earth-brown hover:text-charcoal slow-transition"
      >
        Regenerate Vocabulary
      </button>
      
      {selectedWord && (
        <div className="fixed inset-0 bg-charcoal/90 flex items-center justify-center z-50">
          <div className="bg-parchment border-2 border-earth-brown p-8 max-w-md mx-4">
            <div className="text-center">
              <div className="text-2xl font-serif text-charcoal mb-4">
                {selectedWord.word}
              </div>
              <div className="text-sm text-graphite italic mb-4 leading-relaxed">
                {selectedWord.meaning}
              </div>
              <div className="text-xs text-earth-brown mb-6">
                {selectedWord.context}
              </div>
              <button
                onClick={() => setSelectedWord(null)}
                className="raw-button text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InnerVocabulary;
