
import React from 'react';
import { Helmet } from 'react-helmet-async';
import UserManagement from '@/components/admin/UserManagement';

const UsersPage = () => {
  return (
    <div className="container mx-auto p-6">
      <Helmet>
        <title>User Management | Admin Dashboard</title>
      </Helmet>
      
      <UserManagement />
    </div>
  );
};

export default UsersPage;
