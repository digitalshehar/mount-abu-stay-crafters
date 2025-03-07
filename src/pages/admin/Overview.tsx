
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
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const AdminOverview = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-bold">Dashboard Overview</h1>
      
      {/* Dashboard Statistics */}
      <Suspense fallback={<Skeleton className="h-32 w-full" />}>
        <DashboardStats />
      </Suspense>
      
      {/* Website Analytics */}
      <div className="mb-6">
        <h2 className="text-md sm:text-lg font-semibold mb-3">Website Analytics</h2>
        <Suspense fallback={<Skeleton className="h-32 w-full" />}>
          <AnalyticsSummary />
        </Suspense>
      </div>
      
      {/* Quick Actions */}
      <div className="mb-6">
        <Suspense fallback={<Skeleton className="h-24 w-full" />}>
          <QuickActions />
        </Suspense>
      </div>

      {/* Charts Section */}
      <Suspense fallback={<Skeleton className="h-80 w-full" />}>
        <DashboardCharts />
      </Suspense>
      
      {/* Featured Hotels */}
      <div className="mb-6">
        <h2 className="text-md sm:text-lg font-semibold mb-3">Featured Hotels</h2>
        <Suspense fallback={<Skeleton className="h-48 w-full" />}>
          <FeaturedHotels />
        </Suspense>
      </div>
      
      {/* SEO Analytics */}
      <div className="mb-6">
        <h2 className="text-md sm:text-lg font-semibold mb-3">SEO Performance</h2>
        <Suspense fallback={<Skeleton className="h-32 w-full" />}>
          <SeoAnalytics />
        </Suspense>
      </div>

      {/* Three Column Layout for Different Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Suspense fallback={<Skeleton className="h-40 w-full" />}>
          <NotificationsPanel />
        </Suspense>
        
        <Suspense fallback={<Skeleton className="h-40 w-full" />}>
          <TaskManager />
        </Suspense>
        
        <div className="space-y-6">
          <Suspense fallback={<Skeleton className="h-40 w-full" />}>
            <SiteMonitoring />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-40 w-full" />}>
            <ActivityLog />
          </Suspense>
        </div>
      </div>
      
      {/* Recent Records Section */}
      <Suspense fallback={<Skeleton className="h-64 w-full" />}>
        <RecentRecords />
      </Suspense>
    </div>
  );
};

export default AdminOverview;
