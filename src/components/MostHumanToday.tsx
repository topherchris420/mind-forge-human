
import React, { useState, useEffect } from 'react';

interface HumanEntry {
  id: string;
  content: string;
  type: 'thought' | 'drawing' | 'principle';
  timestamp: number;
  humanityScore: number;
  imageUrl?: string;
}

const MostHumanToday = () => {
  const [entries, setEntries] = useState<HumanEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [entryType, setEntryType] = useState<'thought' | 'drawing' | 'principle'>('thought');
  const [hasContributedToday, setHasContributedToday] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  useEffect(() => {
    loadTodaysEntries();
    checkTodaysContribution();
  }, []);

  const loadTodaysEntries = () => {
    // In a real app, this would fetch from a global database
    // For demo, we'll simulate with localStorage and some sample data
    const today = new Date().toDateString();
    const storedEntries = localStorage.getItem(`human-entries-${today}`);
    
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    } else {
      // Sample entries to populate the board
      const sampleEntries: HumanEntry[] = [
        {
          id: '1',
          content: 'I watched my coffee steam disappear and realized I\'ve been disappearing too, little by little, into other people\'s algorithms.',
          type: 'thought',
          timestamp: Date.now() - 1000000,
          humanityScore: 12
        },
        {
          id: '2', 
          content: 'Drew my grandmother\'s hands from memory. Got the wrinkles wrong but remembered how they felt when she taught me to knead bread.',
          type: 'drawing',
          timestamp: Date.now() - 2000000,
          humanityScore: 8
        },
        {
          id: '3',
          content: 'Why do we say \'save time\' when time can\'t be stored? Maybe we mean \'spend time better\' but that implies time has value beyond just being.',
          type: 'principle',
          timestamp: Date.now() - 500000,
          humanityScore: 15
        }
      ];
      setEntries(sampleEntries);
      localStorage.setItem(`human-entries-${today}`, JSON.stringify(sampleEntries));
    }
  };

  const checkTodaysContribution = () => {
    const today = new Date().toDateString();
    const contributed = localStorage.getItem(`human-contributed-${today}`);
    setHasContributedToday(!!contributed);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setUploadedImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitEntry = () => {
    if (entryType === 'drawing' && !uploadedImage && !newEntry.trim()) return;
    if (entryType !== 'drawing' && !newEntry.trim()) return;

    const entry: HumanEntry = {
      id: Date.now().toString(),
      content: newEntry,
      type: entryType,
      timestamp: Date.now(),
      humanityScore: 0,
      imageUrl: uploadedImage || undefined
    };

    const updatedEntries = [...entries, entry];
    setEntries(updatedEntries);
    
    const today = new Date().toDateString();
    localStorage.setItem(`human-entries-${today}`, JSON.stringify(updatedEntries));
    localStorage.setItem(`human-contributed-${today}`, 'true');
    
    setNewEntry('');
    setUploadedImage(null);
    setHasContributedToday(true);
  };

  const upvoteEntry = (entryId: string) => {
    const updatedEntries = entries.map(entry =>
      entry.id === entryId 
        ? { ...entry, humanityScore: entry.humanityScore + 1 }
        : entry
    );
    
    setEntries(updatedEntries);
    
    const today = new Date().toDateString();
    localStorage.setItem(`human-entries-${today}`, JSON.stringify(updatedEntries));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'thought': return '💭';
      case 'drawing': return '✏️';
      case 'principle': return '🔍';
      default: return '💭';
    }
  };

  // Sort by humanity score (most human first)
  const sortedEntries = [...entries].sort((a, b) => b.humanityScore - a.humanityScore);

  return (
    <div className="bg-parchment border-2 border-graphite-light p-6 mb-8">
      <h2 className="section-header">Most Human Today</h2>
      
      <div className="mb-6">
        <p className="text-graphite text-sm mb-4">
          Anonymous raw thoughts, drawings, and first-principles thinking. Vote for the most genuinely human.
        </p>
      </div>

      {!hasContributedToday && (
        <div className="mb-6 p-4 bg-parchment-dark border border-graphite-light">
          <h3 className="text-lg font-medium text-charcoal mb-3">
            Share Your Humanity
          </h3>
          
          <div className="mb-3">
            <div className="flex space-x-4 mb-3">
              {(['thought', 'drawing', 'principle'] as const).map(type => (
                <label key={type} className="flex items-center">
                  <input
                    type="radio"
                    value={type}
                    checked={entryType === type}
                    onChange={(e) => {
                      setEntryType(e.target.value as any);
                      setUploadedImage(null);
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {entryType === 'drawing' && (
            <div className="mb-3">
              <label className="block text-sm text-graphite mb-2">
                Upload your drawing or artwork:
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-graphite file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-parchment-dark file:text-charcoal hover:file:bg-earth-brown hover:file:text-parchment"
              />
              {uploadedImage && (
                <div className="mt-3">
                  <img
                    src={uploadedImage}
                    alt="Uploaded drawing"
                    className="max-w-xs max-h-40 object-contain border border-graphite-light"
                  />
                </div>
              )}
            </div>
          )}
          
          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            className="raw-input w-full h-20 resize-none mb-3"
            placeholder={
              entryType === 'drawing' 
                ? "Describe your drawing or the process of creating it..." 
                : "Share something unfiltered, unoptimized, authentically human..."
            }
          />
          
          <button
            onClick={submitEntry}
            disabled={entryType === 'drawing' ? (!uploadedImage && !newEntry.trim()) : !newEntry.trim()}
            className="raw-button text-sm disabled:opacity-50"
          >
            Contribute Anonymously
          </button>
        </div>
      )}

      <div className="space-y-4">
        {sortedEntries.map((entry, index) => (
          <div key={entry.id} className="p-4 bg-parchment border border-graphite-light relative">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getTypeIcon(entry.type)}</span>
                <span className="text-xs text-earth-brown">#{index + 1}</span>
              </div>
              
              <button
                onClick={() => upvoteEntry(entry.id)}
                className="text-xs px-2 py-1 border border-earth-brown text-earth-brown hover:bg-earth-brown hover:text-parchment slow-transition"
              >
                ↑ {entry.humanityScore}
              </button>
            </div>

            {entry.imageUrl && (
              <div className="mb-3">
                <img
                  src={entry.imageUrl}
                  alt="Shared drawing"
                  className="max-w-sm max-h-48 object-contain border border-graphite-light"
                />
              </div>
            )}
            
            <p className="text-charcoal leading-relaxed text-sm whitespace-pre-wrap">
              {entry.content}
            </p>
            
            <div className="text-xs text-graphite mt-2">
              {Math.floor((Date.now() - entry.timestamp) / 60000)} minutes ago
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-xs text-graphite italic">
          Board refreshes daily. Yesterday's humanity becomes today's foundation.
        </p>
      </div>
    </div>
  );
};

export default MostHumanToday;
