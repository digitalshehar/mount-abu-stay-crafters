
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import BookingManagementDashboard from '@/components/admin/booking/BookingManagementDashboard';
import Sidebar from '@/components/admin/Sidebar';

const Bookings = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div className="flex min-h-screen bg-stone-50">
      <Helmet>
        <title>Bookings | Admin Dashboard</title>
      </Helmet>
      
      <Sidebar collapsed={collapsed} />
      
      <main className="flex-1 p-8">
        <BookingManagementDashboard />
      </main>
    </div>
  );
};

export default Bookings;
