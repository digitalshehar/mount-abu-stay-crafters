
import React from 'react';
import { Helmet } from 'react-helmet-async';
import BookingDashboard from '@/components/admin/dashboard/BookingDashboard';
import Sidebar from '@/components/admin/Sidebar';

const Bookings = () => {
  return (
    <div className="flex min-h-screen bg-stone-50">
      <Helmet>
        <title>Bookings | Admin Dashboard</title>
      </Helmet>
      
      <Sidebar />
      
      <main className="flex-1 p-8">
        <BookingDashboard />
      </main>
    </div>
  );
};

export default Bookings;
