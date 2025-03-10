
import React from 'react';

interface DashboardHeaderProps {
  title: string;
  lastUpdated?: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, lastUpdated }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      {lastUpdated && (
        <div className="flex space-x-2">
          <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
            Last updated: {lastUpdated}
          </span>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
