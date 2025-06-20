
import React from 'react';
import CSITracker from './CSITracker';
import FirstPrinciplesWorkout from './FirstPrinciplesWorkout';
import TruthWithoutOracle from './TruthWithoutOracle';
import AntiAutomationTracker from './AntiAutomationTracker';

interface ModuleViewProps {
  activeModule: string;
  setActiveModule: (module: string | null) => void;
}

const ModuleView = ({ activeModule, setActiveModule }: ModuleViewProps) => {
  const BackButton = () => (
    <button
      onClick={() => setActiveModule(null)}
      className="mb-4 text-sm text-graphite hover:text-charcoal slow-transition"
    >
      ← Back to Dashboard
    </button>
  );

  switch (activeModule) {
    case 'csi':
      return (
        <div>
          <BackButton />
          <CSITracker />
        </div>
      );
    case 'workout':
      return (
        <div>
          <BackButton />
          <FirstPrinciplesWorkout />
        </div>
      );
    case 'truth':
      return (
        <div>
          <BackButton />
          <TruthWithoutOracle />
        </div>
      );
    case 'automation':
      return (
        <div>
          <BackButton />
          <AntiAutomationTracker />
        </div>
      );
    default:
      return null;
  }
};

export default ModuleView;
