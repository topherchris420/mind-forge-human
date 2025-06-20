
import React, { useState, useEffect } from 'react';

interface ArchaeologicalFind {
  id: string;
  fragment: string;
  depth: number;
  age: string;
  clarity: 'buried' | 'emerging' | 'clear';
}

const CognitiveArchaeology = () => {
  const [currentDig, setCurrentDig] = useState<ArchaeologicalFind | null>(null);
  const [excavationLevel, setExcavationLevel] = useState(1);
  const [isDigging, setIsDigging] = useState(false);
  const [discoveries, setDiscoveries] = useState<ArchaeologicalFind[]>([]);

  const thoughtFragments = [
    "What did I believe before I knew I was supposed to believe it?",
    "The texture of a childhood fear I can't quite name",
    "A conversation I had with myself at age seven",
    "The sound my thoughts made before language",
    "What I wanted to become before the world told me what was possible",
    "The first lie I told myself that felt like truth",
    "A dream I abandoned without remembering why",
    "The weight of a decision I never made",
    "Words I said in my mind but never aloud",
    "The shape of an intuition I ignored"
  ];

  useEffect(() => {
    // Check for buried discoveries from previous sessions
    const buried = JSON.parse(localStorage.getItem('cognitive-archaeology') || '[]');
    setDiscoveries(buried);
  }, []);

  const startExcavation = () => {
    if (isDigging) return;
    
    setIsDigging(true);
    
    // Slow, contemplative digging process
    setTimeout(() => {
      const fragment = thoughtFragments[Math.floor(Math.random() * thoughtFragments.length)];
      const depth = Math.floor(Math.random() * 10) + 1;
      const age = generateAge();
      
      const find: ArchaeologicalFind = {
        id: Date.now().toString(),
        fragment,
        depth,
        age,
        clarity: depth > 7 ? 'buried' : depth > 4 ? 'emerging' : 'clear'
      };
      
      setCurrentDig(find);
      setExcavationLevel(prev => prev + 1);
      setIsDigging(false);
      
      // Archive the discovery
      const newDiscoveries = [...discoveries, find];
      setDiscoveries(newDiscoveries);
      localStorage.setItem('cognitive-archaeology', JSON.stringify(newDiscoveries));
      
    }, 3000 + Math.random() * 4000); // Variable timing for mystery
  };

  const generateAge = () => {
    const ages = [
      'Childhood sediment',
      'Adolescent layers', 
      'Recent formation',
      'Pre-digital stratum',
      'Ancient intuition',
      'Forgotten era',
      'Dawn of questioning'
    ];
    return ages[Math.floor(Math.random() * ages.length)];
  };

  const getClarityStyle = (clarity: string) => {
    switch (clarity) {
      case 'buried': return 'opacity-40 blur-sm';
      case 'emerging': return 'opacity-70 blur-xs';
      default: return 'opacity-100';
    }
  };

  return (
    <div className="bg-parchment border-2 border-earth-brown p-6 mb-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-earth-brown via-transparent to-graphite"></div>
      </div>
      
      <h2 className="section-header">Cognitive Archaeology</h2>
      
      <div className="mb-6">
        <p className="text-graphite text-sm italic leading-relaxed">
          Excavate buried thoughts from the sediment of consciousness. 
          Each dig reveals fragments of pre-conditioned thinking.
        </p>
      </div>

      {/* Excavation Site */}
      <div className="relative mb-6">
        <div className="w-full h-32 bg-gradient-to-b from-parchment-dark to-earth-brown/30 border border-graphite-light relative overflow-hidden">
          {/* Soil layers */}
          <div className="absolute inset-0">
            {Array.from({ length: 8 }, (_, i) => (
              <div 
                key={i}
                className="absolute w-full border-b border-earth-brown/20"
                style={{ 
                  top: `${(i + 1) * 12}%`,
                  height: '2px',
                  opacity: 0.3 + (i * 0.1)
                }}
              />
            ))}
          </div>
          
          {/* Current excavation marker */}
          <div 
            className="absolute w-4 h-4 bg-warning-red transform rotate-45 animate-pulse"
            style={{ 
              left: '50%', 
              top: `${Math.min(excavationLevel * 8, 80)}%`,
              transform: 'translateX(-50%) rotate(45deg)'
            }}
          />
          
          {isDigging && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-earth-brown animate-pulse">
                Excavating consciousness...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Discovery Display */}
      {currentDig && (
        <div className={`p-4 bg-charcoal text-parchment border border-earth-brown mb-4 ${getClarityStyle(currentDig.clarity)} transition-all duration-2000`}>
          <div className="text-xs text-earth-brown mb-2 uppercase tracking-wide">
            Depth: {currentDig.depth}m • {currentDig.age}
          </div>
          <div className="italic leading-relaxed">
            "{currentDig.fragment}"
          </div>
          <div className="text-xs text-graphite mt-2">
            Clarity: {currentDig.clarity}
          </div>
        </div>
      )}

      {/* Excavation Controls */}
      <button
        onClick={startExcavation}
        disabled={isDigging}
        className="raw-button disabled:opacity-50 w-full"
      >
        {isDigging ? 'Digging...' : 'Begin Excavation'}
      </button>

      {/* Discovery Archive */}
      {discoveries.length > 0 && (
        <div className="mt-6 pt-4 border-t border-graphite-light">
          <div className="text-sm text-graphite mb-3">
            Archaeological Record ({discoveries.length} fragments)
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto smooth-scroll">
            {discoveries.slice(-3).map((find) => (
              <div key={find.id} className="text-xs text-graphite-light p-2 bg-parchment-dark border border-graphite-light/30">
                <span className="text-earth-brown">D{find.depth}:</span> {find.fragment.substring(0, 40)}...
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CognitiveArchaeology;
