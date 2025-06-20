
import React from 'react';

interface DashboardCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  streak?: number;
  lastActivity?: string;
}

const DashboardCard = ({ title, description, children, streak, lastActivity }: DashboardCardProps) => {
  return (
    <div className="dashboard-card bg-parchment border-2 border-graphite-light p-6 hover:border-graphite">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
        <div className="mb-4 sm:mb-0">
          <h3 className="text-xl font-medium text-charcoal mb-2">{title}</h3>
          <p className="text-sm text-graphite leading-relaxed">{description}</p>
        </div>
        
        {streak !== undefined && (
          <div className="text-right text-sm flex-shrink-0">
            <div className="text-charcoal font-medium text-lg">{streak}</div>
            <div className="text-graphite">days</div>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        {children}
      </div>
      
      {lastActivity && (
        <div className="text-xs text-graphite mt-4 pt-4 border-t border-graphite-light">
          Last: {lastActivity}
        </div>
      )}
      
      {/* Reflective feedback cue */}
      <div className="feedback-cue mt-4">
        This feels honest.
      </div>
    </div>
  );
};

export default DashboardCard;
