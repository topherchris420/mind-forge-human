
import React, { useState, useEffect } from 'react';

interface DislocatedEntry {
  id: string;
  content: string;
  originalDate: string;
  viewCount: number;
  scrambled: boolean;
}

const TemporalDislocator = () => {
  const [dislocatedContent, setDislocatedContent] = useState<DislocatedEntry | null>(null);
  const [hasViewedToday, setHasViewedToday] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const lastViewDate = localStorage.getItem('temporal-last-view');
    
    if (lastViewDate === today) {
      setHasViewedToday(true);
      return;
    }

    // Gather all historical entries from localStorage
    const allEntries: DislocatedEntry[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('offswitch-') && !key.includes('temporal')) {
        const content = localStorage.getItem(key);
        if (content && content.length > 20) {
          allEntries.push({
            id: key,
            content,
            originalDate: key.split('-').pop() || '',
            viewCount: 0,
            scrambled: false
          });
        }
      }
    }

    if (allEntries.length > 0) {
      // Select random historical content
      const randomEntry = allEntries[Math.floor(Math.random() * allEntries.length)];
      
      // Scramble or mask based on mysterious criteria
      const shouldScramble = Math.random() > 0.6;
      if (shouldScramble) {
        randomEntry.content = scrambleText(randomEntry.content);
        randomEntry.scrambled = true;
      }
      
      setDislocatedContent(randomEntry);
    }
  }, []);

  const scrambleText = (text: string): string => {
    return text
      .split(' ')
      .map(word => {
        if (Math.random() > 0.7) return '█'.repeat(word.length);
        if (Math.random() > 0.5) return word.split('').reverse().join('');
        return word;
      })
      .join(' ');
  };

  const viewContent = () => {
    const today = new Date().toDateString();
    localStorage.setItem('temporal-last-view', today);
    setHasViewedToday(true);
    
    // Content becomes inaccessible after viewing
    setTimeout(() => {
      setDislocatedContent(null);
    }, 15000); // 15 seconds to read, then gone
  };

  if (hasViewedToday) {
    return (
      <div className="bg-charcoal text-parchment p-6 border border-graphite-light mb-8">
        <div className="text-center py-12">
          <div className="text-sm text-graphite mb-4">Temporal displacement complete.</div>
          <div className="text-xs text-graphite italic">
            Memory fragments return tomorrow.
          </div>
        </div>
      </div>
    );
  }

  if (!dislocatedContent) {
    return (
      <div className="bg-parchment border border-graphite-light p-6 mb-8">
        <div className="text-center py-8">
          <div className="text-graphite italic">
            No temporal fragments detected.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-charcoal text-parchment p-6 border border-earth-brown mb-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-earth-brown to-transparent animate-pulse"></div>
      
      <div className="text-sm text-earth-brown mb-4 uppercase tracking-wide">
        Temporal Fragment
        {dislocatedContent.scrambled && <span className="ml-2 text-xs">— Degraded —</span>}
      </div>
      
      <div className="text-parchment leading-relaxed mb-6 font-mono text-sm">
        {dislocatedContent.content}
      </div>
      
      <button
        onClick={viewContent}
        className="text-xs border border-earth-brown text-earth-brown px-3 py-1 hover:bg-earth-brown hover:text-charcoal slow-transition"
      >
        Witness Once
      </button>
      
      <div className="text-xs text-graphite mt-4 italic">
        Origin unknown. Sequence collapsed. View destroys.
      </div>
    </div>
  );
};

export default TemporalDislocator;
