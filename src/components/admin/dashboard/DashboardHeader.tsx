
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface DashboardHeaderProps {
  title: string;
  lastUpdated?: string;
  actions?: React.ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, lastUpdated, actions }) => {
  const formattedDate = lastUpdated ? format(new Date(lastUpdated), 'MMM d, yyyy h:mm a') : '';
  
  return (
    <motion.div 
      className="flex flex-col md:flex-row md:items-center justify-between mb-6 bg-white p-4 rounded-lg shadow-sm border border-stone-100"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <motion.h1 
          className="text-2xl font-bold text-stone-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </motion.h1>
        {lastUpdated && (
          <motion.div 
            className="text-sm text-stone-500 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Last updated: {formattedDate}
          </motion.div>
        )}
      </div>
      {actions && (
        <motion.div 
          className={cn("flex mt-4 md:mt-0 space-x-3", 
                    "flex-wrap gap-2 justify-start md:justify-end")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {actions}
        </motion.div>
      )}
    </motion.div>
  );
};

export default DashboardHeader;
