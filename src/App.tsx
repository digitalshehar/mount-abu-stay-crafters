
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import Home from '@/pages/Home';
import Hotels from '@/pages/Hotels';
import HotelDetail from '@/pages/HotelDetail';
import AboutUs from '@/pages/AboutUs';
import NotFound from '@/pages/NotFound';
import Dashboard from '@/pages/admin/Dashboard';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import Overview from '@/pages/admin/Overview';
import HotelsManagement from '@/pages/admin/Hotels';
import BikeRentalsManagement from '@/pages/admin/BikeRentals';
import CarRentalsManagement from '@/pages/admin/CarRentals';
import AdventuresManagement from '@/pages/admin/Adventures';
import BookingManagement from '@/pages/admin/Bookings';
import BlogManagement from '@/pages/admin/BlogManagement';
import WebsiteSettings from '@/pages/admin/WebsiteSettings';
import PublicLayout from '@/layouts/PublicLayout';
import AdminLayout from '@/layouts/AdminLayout';
import { AuthProvider } from '@/context/AuthContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { Toaster } from '@/components/ui/toaster';
import ErrorFallback from '@/components/ErrorBoundary';
import { FavoritesProvider } from '@/context/FavoritesContext';
import './App.css';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AuthProvider>
        <FavoritesProvider>
          <NotificationProvider>
            <Router>
              <Routes>
                {/* Public Routes */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/hotels" element={<Hotels />} />
                  <Route path="/hotels/:id" element={<HotelDetail />} />
                  <Route path="/about" element={<AboutUs />} />
                </Route>

                {/* Auth Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<Dashboard />}>
                    <Route index element={<Overview />} />
                    <Route path="hotels" element={<HotelsManagement />} />
                    <Route path="bike-rentals" element={<BikeRentalsManagement />} />
                    <Route path="car-rentals" element={<CarRentalsManagement />} />
                    <Route path="adventures" element={<AdventuresManagement />} />
                    <Route path="bookings" element={<BookingManagement />} />
                    <Route path="blog" element={<BlogManagement />} />
                    <Route path="settings" element={<WebsiteSettings />} />
                  </Route>
                </Route>

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
            <Toaster />
          </NotificationProvider>
        </FavoritesProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
