
import React from 'react';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import DashboardStats from '@/components/admin/DashboardStats';
import DashboardCharts from '@/components/admin/DashboardCharts';
import RecentRecords from '@/components/admin/RecentRecords';
import QuickActions from '@/components/admin/QuickActions';
import SiteMonitoring from '@/components/admin/SiteMonitoring';
import ActivityLog from '@/components/admin/ActivityLog';

const Overview: React.FC = () => {
  console.log("Overview component rendering");
  
  return (
    <div className="space-y-6">
      <DashboardHeader 
        title="Dashboard Overview" 
        lastUpdated={new Date().toLocaleTimeString()} 
      />
      
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
