
import React from 'react';

interface DashboardHeaderProps {
  title: string;
  lastUpdated?: string;
  actions?: React.ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, lastUpdated, actions }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {lastUpdated && (
          <div className="text-sm text-muted-foreground mt-1">
            Last updated: {lastUpdated}
          </div>
        )}
      </div>
      {actions && (
        <div className="flex space-x-3">
          {actions}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
