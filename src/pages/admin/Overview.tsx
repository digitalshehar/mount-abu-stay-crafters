
import React from 'react';
import DashboardStats from '@/components/admin/DashboardStats';
import DashboardCharts from '@/components/admin/DashboardCharts';
import RecentRecords from '@/components/admin/RecentRecords';
import QuickActions from '@/components/admin/QuickActions';
import SiteMonitoring from '@/components/admin/SiteMonitoring';
import ActivityLog from '@/components/admin/ActivityLog';

const Overview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex space-x-2">
          <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardCharts />
        </div>
        <div>
          <SiteMonitoring />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentRecords />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <ActivityLog />
        </div>
      </div>
    </div>
  );
};

export default Overview;
