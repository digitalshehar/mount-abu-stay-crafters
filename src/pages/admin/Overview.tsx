
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import DashboardStats from '@/components/admin/DashboardStats';
import DashboardCharts from '@/components/admin/DashboardCharts';
import RecentRecords from '@/components/admin/RecentRecords';
import QuickActions from '@/components/admin/QuickActions';
import SiteMonitoring from '@/components/admin/SiteMonitoring';
import ActivityLog from '@/components/admin/ActivityLog';
import { Button } from '@/components/ui/button';
import { DownloadCloud, RefreshCw } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const Overview: React.FC = () => {
  useEffect(() => {
    console.log("Overview component rendering");
  }, []);
  
  const lastUpdated = new Date().toISOString();
  
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
    <motion.div 
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <DashboardHeader 
        title="Dashboard Overview" 
        lastUpdated={lastUpdated}
        actions={headerActions}
      />
      
      <motion.div variants={item}>
        <DashboardStats />
      </motion.div>
      
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardCharts />
        </div>
        <div>
          <SiteMonitoring />
        </div>
      </motion.div>
      
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentRecords />
        </div>
        <div className="space-y-6">
          <QuickActions />
          <ActivityLog />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Overview;
