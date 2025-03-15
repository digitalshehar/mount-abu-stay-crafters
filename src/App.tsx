
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import Auth from './pages/Auth';
import Hotels from './pages/Hotels';
import HotelDetail from './pages/HotelDetail';
import AdminRoute from './components/auth/AdminRoute';
import NotFound from './components/NotFound';
import Dashboard from './pages/admin/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:slug" element={<HotelDetail />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          {/* Add other admin routes as needed */}
        </Route>
        
        {/* Fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
