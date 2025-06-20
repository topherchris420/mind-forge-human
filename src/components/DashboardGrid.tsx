
import React from 'react';
import DashboardCard from './DashboardCard';

interface DashboardGridProps {
  getModuleStreak: (moduleKey: string) => number;
  getLastActivity: (moduleKey: string) => string;
  setActiveModule: (module: string) => void;
}

const DashboardGrid = ({ getModuleStreak, getLastActivity, setActiveModule }: DashboardGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <DashboardCard
        title="Cognitive Sovereignty Index"
        description="Daily independence assessment"
        streak={getModuleStreak('csi')}
        lastActivity={getLastActivity('csi')}
      >
        <button
          onClick={() => setActiveModule('csi')}
          className="raw-button w-full text-sm"
        >
          Rate Today's Independence
        </button>
      </DashboardCard>

      <DashboardCard
        title="First Principles Workout"
        description="Break down complex problems from scratch"
        streak={getModuleStreak('workout')}
        lastActivity={getLastActivity('workout')}
      >
        <button
          onClick={() => setActiveModule('workout')}
          className="raw-button w-full text-sm"
        >
          Start Problem Breakdown
        </button>
      </DashboardCard>

      <DashboardCard
        title="Truth Without Oracle"
        description="Weekly prompts for genuine thinking"
        lastActivity={getLastActivity('truth')}
      >
        <button
          onClick={() => setActiveModule('truth')}
          className="raw-button w-full text-sm"
        >
          Answer This Week's Question
        </button>
      </DashboardCard>

      <DashboardCard
        title="Anti-Automation Tracker"
        description="Record moments of intentional manual effort"
        streak={getModuleStreak('automation')}
        lastActivity={getLastActivity('automation')}
      >
        <button
          onClick={() => setActiveModule('automation')}
          className="raw-button w-full text-sm"
        >
          Log Manual Choice
        </button>
      </DashboardCard>
    </div>
  );
};

export default DashboardGrid;
