
import React, { useState, useEffect } from 'react';

interface MemoryEntry {
  id: string;
  date: string;
  type: string;
  content: string;
  editable: boolean;
}

const MemoryArchive = () => {
  const [entries, setEntries] = useState<MemoryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<MemoryEntry | null>(null);
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    // Load all stored entries from localStorage
    const loadEntries = () => {
      const allEntries: MemoryEntry[] = [];
      const now = new Date();
      
      // Load CSI entries
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('offswitch-csi-')) {
          const date = key.replace('offswitch-csi-', '');
          const content = localStorage.getItem(key);
          if (content) {
            const entryDate = new Date(date);
            const daysDiff = Math.floor((now.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
            
            allEntries.push({
              id: key,
              date: entryDate.toLocaleDateString(),
              type: 'Cognitive Sovereignty',
              content,
              editable: daysDiff >= 2
            });
          }
        } else if (key?.startsWith('offswitch-reflection-')) {
          const date = key.replace('offswitch-reflection-', '');
          const content = localStorage.getItem(key);
          if (content) {
            const entryDate = new Date(date);
            const daysDiff = Math.floor((now.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
            
            allEntries.push({
              id: key,
              date: entryDate.toLocaleDateString(),
              type: 'Weekly Reflection',
              content,
              editable: daysDiff >= 2
            });
          }
        }
      }
      
      // Sort by date, newest first
      allEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setEntries(allEntries);
    };

    loadEntries();
  }, []);

  const handleEdit = (entry: MemoryEntry) => {
    setSelectedEntry(entry);
    setEditedContent(entry.content);
  };

  const saveEdit = () => {
    if (selectedEntry) {
      localStorage.setItem(selectedEntry.id, editedContent);
      setEntries(entries.map(entry => 
        entry.id === selectedEntry.id 
          ? { ...entry, content: editedContent }
          : entry
      ));
      setSelectedEntry(null);
      setEditedContent('');
    }
  };

  return (
    <div className="bg-parchment border-2 border-graphite-light p-6 mb-8">
      <h2 className="section-header">Memory Archive</h2>
      
      <div className="mb-6">
        <p className="text-graphite text-sm">
          Your recorded thoughts and reflections. Entries become editable after 48 hours to preserve authentic first responses.
        </p>
      </div>

      {entries.length === 0 ? (
        <p className="text-graphite italic">No entries yet. Begin practicing to build your archive.</p>
      ) : (
        <div className="space-y-4">
          {entries.map((entry) => (
            <div key={entry.id} className="p-4 bg-parchment-dark border border-graphite-light">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-sm font-medium text-charcoal">{entry.type}</div>
                  <div className="text-xs text-graphite">{entry.date}</div>
                </div>
                
                {entry.editable && (
                  <button
                    onClick={() => handleEdit(entry)}
                    className="text-xs px-2 py-1 border border-graphite text-graphite hover:bg-graphite hover:text-parchment slow-transition"
                  >
                    Edit
                  </button>
                )}
              </div>
              
              <p className="text-sm text-charcoal whitespace-pre-wrap leading-relaxed">
                {entry.content.length > 200 ? `${entry.content.substring(0, 200)}...` : entry.content}
              </p>
              
              {!entry.editable && (
                <div className="text-xs text-earth-brown mt-2">
                  Protected - editable in {2 - Math.floor((new Date().getTime() - new Date(entry.date).getTime()) / (1000 * 60 * 60 * 24))} days
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {selectedEntry && (
        <div className="fixed inset-0 bg-charcoal/80 flex items-center justify-center p-4 z-50">
          <div className="bg-parchment border-2 border-charcoal max-w-2xl w-full p-6">
            <h3 className="text-lg font-medium text-charcoal mb-4">
              Edit {selectedEntry.type} - {selectedEntry.date}
            </h3>
            
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="raw-input w-full h-40 resize-none mb-4"
            />
            
            <div className="flex space-x-3">
              <button onClick={saveEdit} className="raw-button">
                Save Changes
              </button>
              <button
                onClick={() => setSelectedEntry(null)}
                className="px-4 py-2 border border-graphite text-graphite hover:bg-graphite hover:text-parchment slow-transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryArchive;
