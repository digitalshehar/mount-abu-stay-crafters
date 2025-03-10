
import React, { useState } from "react";
import DashboardStats from "@/components/admin/DashboardStats";
import ActivityLog from "@/components/admin/ActivityLog";
import DashboardCharts from "@/components/admin/DashboardCharts";
import QuickActions from "@/components/admin/QuickActions";
import RecentRecords from "@/components/admin/RecentRecords";
import SiteMonitoring from "@/components/admin/SiteMonitoring";
import SeoAnalytics from "@/components/admin/SeoAnalytics";
import TaskManager from "@/components/admin/TaskManager";
import ThemeCustomizer from "@/components/admin/ThemeCustomizer";
import BackupManager from "@/components/admin/BackupManager";
import AnalyticsSummary from "@/components/admin/AnalyticsSummary";
import NotificationsPanel from "@/components/admin/NotificationsPanel";
import { useNotifications } from "@/hooks/useNotifications";

const Overview = () => {
  const [currentTheme, setCurrentTheme] = useState("light");
  
  // Get notifications for the NotificationsPanel
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead 
  } = useNotifications();
  
  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);

  return (
    <div className="container mx-auto p-4 max-w-[1600px]">
      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <DashboardStats />
        </div>

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <TaskManager />
          </div>
          <div>
            <ThemeCustomizer 
              initialTheme={currentTheme} 
              onThemeChange={setCurrentTheme} 
            />
          </div>
          <div>
            <BackupManager />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnalyticsSummary />
          
          {/* Only render the NotificationsPanel if isNotificationsPanelOpen is true */}
          {isNotificationsPanelOpen && (
            <div className="bg-white rounded-lg shadow-lg p-4">
              <NotificationsPanel 
                notifications={notifications}
                onMarkAsRead={markAsRead}
                onMarkAllAsRead={markAllAsRead}
                onClose={() => setIsNotificationsPanelOpen(false)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
