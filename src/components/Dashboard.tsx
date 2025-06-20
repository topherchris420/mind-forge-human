
import React from 'react';
import TemporalDislocator from './TemporalDislocation';
import DailyResistance from './DailyResistance';
import CognitiveWeight from './CognitiveWeight';
import EgoFurnace from './EgoFurnace';
import MostHumanToday from './MostHumanToday';
import CognitiveCandy from './CognitiveCandy';
import DashboardGrid from './DashboardGrid';
import WeeklyReflection from './WeeklyReflection';

interface DashboardProps {
  sessionData: string;
  getModuleStreak: (moduleKey: string) => number;
  getLastActivity: (moduleKey: string) => string;
  setActiveModule: (module: string) => void;
}

const Dashboard = ({ sessionData, getModuleStreak, getLastActivity, setActiveModule }: DashboardProps) => {
  return (
    <>
      {/* Temporal Dislocation - Shows historical content out of sequence */}
      <TemporalDislocator />
      
      <div className="mb-8 p-6 bg-parchment-dark border border-graphite-light relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-earth-brown/5 to-transparent"></div>
        <h2 className="text-xl font-medium text-charcoal mb-3 relative">Resistance Through Practice</h2>
        <p className="text-graphite leading-relaxed relative">
          OffSwitch is a tool for cognitive sovereignty. Each exercise here is designed to strengthen 
          your capacity for independent thought, manual effort, and first-principles reasoning. 
          Progress is measured not in efficiency, but in authentic human capability.
        </p>
      </div>

      {/* Daily Resistance - Featured prominently */}
      <DailyResistance />

      {/* Cognitive Weight Assessment */}
      {sessionData && <CognitiveWeight sessionData={sessionData} />}

      {/* Ego Furnace - Visual transformation */}
      <EgoFurnace />

      {/* Most Human Today - Community element */}
      <MostHumanToday />

      {/* Cognitive Candy - Mystery modules */}
      <CognitiveCandy />

      {/* Dashboard Grid */}
      <DashboardGrid
        getModuleStreak={getModuleStreak}
        getLastActivity={getLastActivity}
        setActiveModule={setActiveModule}
      />

      {/* Memory Archive Access */}
      <div className="mb-8">
        <button
          onClick={() => setActiveModule('memory-archive')}
          className="w-full p-4 bg-parchment-dark border border-graphite-light hover:border-graphite slow-transition text-left relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-earth-brown/10 to-transparent"></div>
          <div className="text-lg font-medium text-charcoal mb-2 relative">Memory Archive</div>
          <div className="text-sm text-graphite relative">Review and reflect on past entries</div>
        </button>
      </div>

      <WeeklyReflection />
    </>
  );
};

export default Dashboard;
