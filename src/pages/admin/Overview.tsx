
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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Dashboard Overview</h2>
          <p className="text-muted-foreground">Welcome to your admin dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-white border border-stone-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>All time</option>
          </select>
          <button className="bg-primary text-white px-4 py-1.5 rounded-md text-sm hover:bg-primary/90 transition-colors">
            Download Report
          </button>
        </div>
      </div>
      
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
