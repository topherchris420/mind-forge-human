
import React, { useState, useEffect } from 'react';

interface ManualTask {
  id: string;
  task: string;
  date: string;
  category: string;
}

const AntiAutomationTracker = () => {
  const [tasks, setTasks] = useState<ManualTask[]>([]);
  const [newTask, setNewTask] = useState('');
  const [category, setCategory] = useState('physical');

  useEffect(() => {
    const stored = localStorage.getItem('offswitch-manual-tasks');
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  const addTask = () => {
    if (!newTask.trim()) return;
    
    const task: ManualTask = {
      id: Date.now().toString(),
      task: newTask.trim(),
      date: new Date().toLocaleDateString(),
      category
    };
    
    const updated = [task, ...tasks].slice(0, 50);
    setTasks(updated);
    localStorage.setItem('offswitch-manual-tasks', JSON.stringify(updated));
    
    setNewTask('');
  };

  const getWeeklyScore = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const weeklyTasks = tasks.filter(task => 
      new Date(task.date) >= weekAgo
    );
    
    return weeklyTasks.length;
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'physical': return 'text-earth-brown';
      case 'mental': return 'text-faded-blue';
      case 'creative': return 'text-graphite';
      case 'social': return 'text-charcoal';
      default: return 'text-charcoal';
    }
  };

  const getCategoryTasks = () => {
    const categories = ['physical', 'mental', 'creative', 'social'];
    return categories.map(cat => ({
      name: cat,
      count: tasks.filter(task => task.category === cat).length
    }));
  };

  return (
    <div className="bg-parchment border-2 border-graphite-light p-6 mb-8">
      <h2 className="section-header">Anti-Automation Tracker</h2>
      
      <div className="mb-6">
        <p className="text-graphite mb-4">
          Log tasks completed without scripts, apps, or digital assistance.
        </p>
        
        <div className="p-4 bg-earth-brown/10 border border-earth-brown/30 mb-4">
          <h3 className="text-lg font-medium text-earth-brown mb-2">Manual Integrity Score</h3>
          <div className="text-3xl font-bold text-earth-brown">
            {getWeeklyScore()}/week
          </div>
          <p className="text-sm text-graphite mt-1">
            Tasks completed manually in the last 7 days
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-charcoal font-medium mb-2">Task Completed</label>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="raw-input w-full"
            placeholder="e.g., Wrote letter by hand, Calculated tip without phone..."
          />
        </div>
        
        <div>
          <label className="block text-charcoal font-medium mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="raw-input w-full"
          >
            <option value="physical">Physical (handwriting, manual tools)</option>
            <option value="mental">Mental (math, memory, reasoning)</option>
            <option value="creative">Creative (art, music, writing)</option>
            <option value="social">Social (conversation, letter writing)</option>
          </select>
        </div>
        
        <button
          onClick={addTask}
          disabled={!newTask.trim()}
          className="raw-button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Log Manual Task
        </button>
      </div>

      {tasks.length > 0 && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {getCategoryTasks().map((cat) => (
              <div key={cat.name} className="text-center p-3 bg-parchment-dark border border-graphite-light">
                <div className={`text-2xl font-bold ${getCategoryColor(cat.name)}`}>
                  {cat.count}
                </div>
                <div className="text-sm text-graphite capitalize">{cat.name}</div>
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-charcoal">Recent Manual Tasks</h3>
            {tasks.slice(0, 10).map((task) => (
              <div key={task.id} className="flex justify-between items-center p-2 bg-parchment-dark/50 border border-graphite-light/50">
                <span className="text-charcoal">{task.task}</span>
                <div className="text-right">
                  <span className={`text-xs uppercase ${getCategoryColor(task.category)}`}>
                    {task.category}
                  </span>
                  <div className="text-xs text-graphite">{task.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AntiAutomationTracker;
