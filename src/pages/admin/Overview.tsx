
import React, { useEffect } from 'react';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import DashboardStats from '@/components/admin/DashboardStats';
import DashboardCharts from '@/components/admin/DashboardCharts';
import RecentRecords from '@/components/admin/RecentRecords';
import QuickActions from '@/components/admin/QuickActions';
import SiteMonitoring from '@/components/admin/SiteMonitoring';
import ActivityLog from '@/components/admin/ActivityLog';
import { Button } from '@/components/ui/button';
import { DownloadCloud, RefreshCw } from 'lucide-react';

const Overview: React.FC = () => {
  useEffect(() => {
    console.log("Overview component rendering");
  }, []);
  
  const lastUpdated = new Date().toLocaleTimeString();
  
  const headerActions = (
    <>
      <Button variant="outline" size="sm" className="flex items-center gap-1">
        <RefreshCw size={14} />
        <span>Refresh</span>
      </Button>
      <Button variant="outline" size="sm" className="flex items-center gap-1">
        <DownloadCloud size={14} />
        <span>Export</span>
      </Button>
    </>
  );
  
  return (
    <div className="space-y-6">
      <DashboardHeader 
        title="Dashboard Overview" 
        lastUpdated={lastUpdated}
        actions={headerActions}
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
