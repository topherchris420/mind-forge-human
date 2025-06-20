
import React, { useState, useEffect } from 'react';

interface TimeGate {
  key: string;
  name: string;
  description: string;
  isAvailable: () => boolean;
  poeticUnavailable: string;
}

const timeGates: TimeGate[] = [
  {
    key: 'silence-mode',
    name: 'Silence Mode',
    description: 'Deep listening practice for the night hours',
    poeticUnavailable: 'The silence retreats with dawn. Return when shadows lengthen.',
    isAvailable: () => {
      const hour = new Date().getHours();
      return hour >= 21 || hour < 6; // 9 PM to 6 AM
    }
  },
  {
    key: 'paradox-mirror',
    name: 'Paradox Mirror',
    description: 'Confront your contradictions',
    poeticUnavailable: 'The mirror faces away. It turns again in time.',
    isAvailable: () => {
      const today = new Date();
      const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
      return dayOfYear % 5 === 0; // Every 5th day
    }
  }
];

export const TimeGatedExperiences = () => {
  const [checkedGates, setCheckedGates] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    const checkGates = () => {
      const newChecked: {[key: string]: boolean} = {};
      timeGates.forEach(gate => {
        newChecked[gate.key] = gate.isAvailable();
      });
      setCheckedGates(newChecked);
    };

    checkGates();
    const interval = setInterval(checkGates, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return null; // This is a utility component
};

export const isTimeGateOpen = (gateKey: string): boolean => {
  const gate = timeGates.find(g => g.key === gateKey);
  return gate ? gate.isAvailable() : false;
};

export const getTimeGateMessage = (gateKey: string): string => {
  const gate = timeGates.find(g => g.key === gateKey);
  return gate ? gate.poeticUnavailable : 'This path is closed.';
};

export const TimeGateGuard = ({ gateKey, children }: { gateKey: string; children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkGate = () => {
      setIsOpen(isTimeGateOpen(gateKey));
    };
    
    checkGate();
    const interval = setInterval(checkGate, 60000);
    return () => clearInterval(interval);
  }, [gateKey]);

  if (!isOpen) {
    return (
      <div className="p-8 text-center bg-charcoal/5 border border-graphite-light">
        <div className="text-graphite italic font-serif">
          {getTimeGateMessage(gateKey)}
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default TimeGatedExperiences;
