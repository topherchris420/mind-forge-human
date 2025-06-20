
import React, { useState, useEffect } from 'react';

interface DetoxSession {
  id: string;
  date: string;
  duration: number;
  activity: string;
  clarity_gain: number;
}

const analogActivities = [
  "Hand-wrote in a physical journal",
  "Drew without reference images", 
  "Cooked without looking up recipes",
  "Walked without navigation apps",
  "Read a physical book",
  "Had a conversation without phones present",
  "Solved a problem using only pen and paper",
  "Created something with raw materials",
  "Practiced a skill through repetition",
  "Sat in silence without entertainment"
];

const DigitalDetoxTracker = () => {
  const [sessions, setSessions] = useState<DetoxSession[]>([]);
  const [currentSession, setCurrentSession] = useState<DetoxSession | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [selectedActivity, setSelectedActivity] = useState('');

  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem('detox-sessions') || '[]');
    setSessions(savedSessions);
  }, []);

  const startDetox = () => {
    if (!selectedActivity) return;
    
    setIsActive(true);
    setStartTime(Date.now());
    setCurrentSession({
      id: Date.now().toString(),
      date: new Date().toDateString(),
      duration: 0,
      activity: selectedActivity,
      clarity_gain: 0
    });
  };

  const endDetox = () => {
    if (!currentSession) return;
    
    const duration = Math.floor((Date.now() - startTime) / 60000); // minutes
    const clarity_gain = Math.min(Math.floor(duration / 5), 10); // Max 10 points
    
    const completedSession = {
      ...currentSession,
      duration,
      clarity_gain
    };
    
    const updatedSessions = [completedSession, ...sessions].slice(0, 50);
    setSessions(updatedSessions);
    localStorage.setItem('detox-sessions', JSON.stringify(updatedSessions));
    
    setIsActive(false);
    setCurrentSession(null);
    setSelectedActivity('');
  };

  const getCurrentDuration = () => {
    if (!isActive || !startTime) return 0;
    return Math.floor((Date.now() - startTime) / 60000);
  };

  const getTotalDetoxTime = () => {
    return sessions.reduce((total, session) => total + session.duration, 0);
  };

  const getWeeklyAverage = () => {
    const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    const recentSessions = sessions.filter(s => new Date(s.date).getTime() > weekAgo);
    return recentSessions.length > 0 ? Math.floor(recentSessions.reduce((sum, s) => sum + s.duration, 0) / 7) : 0;
  };

  return (
    <div className="bg-parchment border-2 border-graphite-light p-6 mb-8">
      <h2 className="section-header">Digital Detox Tracker</h2>
      
      <div className="mb-6">
        <p className="text-graphite text-sm italic">
          Measure analog presence. Track digital absence.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 bg-parchment-dark border border-graphite-light text-center">
          <div className="text-lg font-medium text-charcoal">{getTotalDetoxTime()}</div>
          <div className="text-xs text-graphite">Total Minutes</div>
        </div>
        <div className="p-3 bg-parchment-dark border border-graphite-light text-center">
          <div className="text-lg font-medium text-charcoal">{getWeeklyAverage()}</div>
          <div className="text-xs text-graphite">Daily Average</div>
        </div>
      </div>

      {!isActive ? (
        <div className="space-y-4">
          {/* Activity Selection */}
          <div>
            <label className="block text-charcoal font-medium mb-2 text-sm">
              Choose Your Analog Activity
            </label>
            <select
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              className="raw-input w-full"
            >
              <option value="">Select an activity...</option>
              {analogActivities.map((activity, index) => (
                <option key={index} value={activity}>{activity}</option>
              ))}
            </select>
          </div>
          
          <button
            onClick={startDetox}
            disabled={!selectedActivity}
            className="raw-button w-full disabled:opacity-50"
          >
            Begin Analog Session
          </button>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <div className="p-6 bg-earth-brown text-parchment border border-charcoal">
            <div className="text-sm mb-2">Currently Engaged In:</div>
            <div className="font-medium mb-4">{currentSession?.activity}</div>
            <div className="text-2xl font-mono">{getCurrentDuration()} min</div>
          </div>
          
          <button
            onClick={endDetox}
            className="border border-earth-brown text-earth-brown px-6 py-2 hover:bg-earth-brown hover:text-parchment slow-transition"
          >
            Complete Session
          </button>
        </div>
      )}

      {/* Recent Sessions */}
      {sessions.length > 0 && (
        <div className="mt-6 pt-4 border-t border-graphite-light">
          <div className="text-sm text-graphite mb-3">Recent Analog Sessions</div>
          <div className="space-y-2 max-h-32 overflow-y-auto smooth-scroll">
            {sessions.slice(0, 3).map((session) => (
              <div key={session.id} className="flex justify-between items-center p-2 bg-parchment-dark border border-graphite-light/30 text-xs">
                <div className="text-charcoal">{session.activity}</div>
                <div className="text-earth-brown">{session.duration}min • +{session.clarity_gain}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalDetoxTracker;
