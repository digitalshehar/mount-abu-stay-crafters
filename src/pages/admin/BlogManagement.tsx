
import React from 'react';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';

const BlogManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <DashboardHeader title="Blog Management" />
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <p className="text-gray-600">Blog management features will be added here.</p>
      </div>
    </div>
  );
};

export default BlogManagement;
