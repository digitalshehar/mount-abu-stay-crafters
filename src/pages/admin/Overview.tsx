
import React from "react";
import DashboardStats from "@/components/admin/DashboardStats";
import ActivityLog from "@/components/admin/ActivityLog";
import DashboardCharts from "@/components/admin/DashboardCharts";
import QuickActions from "@/components/admin/QuickActions";
import RecentRecords from "@/components/admin/RecentRecords";
import SiteMonitoring from "@/components/admin/SiteMonitoring";
import SeoAnalytics from "@/components/admin/SeoAnalytics";

const Overview = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardCharts />
        </div>
        <div>
          <ActivityLog />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentRecords />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SiteMonitoring />
        <SeoAnalytics />
      </div>
    </div>
  );
};

export default Overview;
