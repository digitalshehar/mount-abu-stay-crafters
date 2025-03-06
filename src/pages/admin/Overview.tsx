
import React from "react";
import AnalyticsSummary from "@/components/admin/AnalyticsSummary";
import NotificationsPanel from "@/components/admin/NotificationsPanel";
import QuickActions from "@/components/admin/QuickActions";
import ActivityLog from "@/components/admin/ActivityLog";
import TaskManager from "@/components/admin/TaskManager";
import SiteMonitoring from "@/components/admin/SiteMonitoring";
import SeoAnalytics from "@/components/admin/SeoAnalytics";
import DashboardStats from "@/components/admin/DashboardStats";
import DashboardCharts from "@/components/admin/DashboardCharts";
import RecentRecords from "@/components/admin/RecentRecords";
import FeaturedHotels from "@/components/admin/hotels/FeaturedHotels";

const AdminOverview = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      
      {/* Dashboard Statistics */}
      <DashboardStats />
      
      {/* Website Analytics */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Website Analytics</h2>
        <AnalyticsSummary />
      </div>
      
      {/* Quick Actions */}
      <div className="mb-6">
        <QuickActions />
      </div>

      {/* Charts Section */}
      <DashboardCharts />
      
      {/* Featured Hotels */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Featured Hotels</h2>
        <FeaturedHotels />
      </div>
      
      {/* SEO Analytics */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">SEO Performance</h2>
        <SeoAnalytics />
      </div>

      {/* Three Column Layout for Different Components */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="space-y-6">
          <NotificationsPanel />
        </div>
        
        <div className="space-y-6">
          <TaskManager />
        </div>
        
        <div className="space-y-6">
          <SiteMonitoring />
          <ActivityLog />
        </div>
      </div>
      
      {/* Recent Records Section */}
      <RecentRecords />
    </div>
  );
};

export default AdminOverview;
