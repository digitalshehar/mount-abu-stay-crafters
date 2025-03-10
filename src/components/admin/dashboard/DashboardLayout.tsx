
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <motion.main 
      className={cn(
        "flex-1 p-4 sm:p-6 transition-all duration-300 pt-16 md:pt-6 overflow-y-auto",
        "md:ml-[280px] bg-gradient-to-br from-stone-50 to-white"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </motion.main>
  );
};

export default DashboardLayout;
