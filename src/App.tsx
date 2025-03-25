
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Auth from '@/pages/Auth';
import ForgotPassword from '@/pages/ForgotPassword';
import AdminForgotPassword from '@/pages/AdminForgotPassword';
import AdminRegister from '@/pages/AdminRegister';
import AdminRoute from '@/components/auth/AdminRoute';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import './App.css';

import Index from '@/pages/Index';
import NotFound from '@/components/NotFound';
import AdminDashboard from '@/pages/admin/Dashboard';
import UsersPage from '@/pages/admin/Users';
import Hotels from '@/pages/Hotels';
import BikeRentals from '@/pages/BikeRentals';
import CarRentals from '@/pages/CarRentals';
import AdminHotels from '@/pages/admin/Hotels';
import AdminBikeRentals from '@/pages/admin/BikeRentals';
import AdminCarRentals from '@/pages/admin/CarRentals';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="mount-abu-theme">
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/bike-rentals" element={<BikeRentals />} />
            <Route path="/car-rentals" element={<CarRentals />} />
            
            {/* Protected routes for regular users */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<div>Profile Page</div>} />
              <Route path="/bookings" element={<div>Bookings Page</div>} />
            </Route>
            
            {/* Protected routes for admin users */}
            <Route element={<AdminRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/hotels" element={<AdminHotels />} />
              <Route path="/admin/bikes" element={<AdminBikeRentals />} />
              <Route path="/admin/cars" element={<AdminCarRentals />} />
              <Route path="/admin/bookings" element={<div>Booking Management</div>} />
              <Route path="/admin/users" element={<UsersPage />} />
            </Route>
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
