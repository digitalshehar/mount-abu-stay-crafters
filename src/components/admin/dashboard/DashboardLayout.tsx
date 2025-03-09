
import React from "react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <main className={cn(
      "flex-1 p-4 sm:p-6 transition-all duration-300 pt-16 md:pt-6 overflow-y-auto",
      "md:ml-[280px]"
    )}>
      {children}
    </main>
  );
};

export default DashboardLayout;
