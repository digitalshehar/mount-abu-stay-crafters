
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Auth from '@/pages/Auth';
import ForgotPassword from '@/pages/ForgotPassword';
import AdminForgotPassword from '@/pages/AdminForgotPassword';
import AdminRegister from '@/pages/AdminRegister';
import AdminRoute from '@/components/auth/AdminRoute';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import './App.css';

import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import AdminDashboard from '@/pages/admin/Dashboard';
import UsersPage from '@/pages/admin/Users';
import Hotels from '@/pages/Hotels';
import BikeRentals from '@/pages/BikeRentals';
import CarRentals from '@/pages/CarRentals';
import AdminHotels from '@/pages/admin/Hotels';
import AdminBikeRentals from '@/pages/admin/BikeRentals';
import AdminCarRentals from '@/pages/admin/CarRentals';
import AdminAdventures from '@/pages/admin/Adventures';
import AdminBlog from '@/pages/admin/Blog';
import AdminSettings from '@/pages/admin/Settings';
import AdminBookings from '@/pages/admin/Bookings';
import Destinations from '@/pages/Destinations';
import Adventures from '@/pages/Adventures';
import Blog from '@/pages/Blog';
import HotelDetail from '@/pages/HotelDetail';
import HotelHtmlView from '@/pages/HotelHtmlView';
import HotelNotFound from '@/pages/HotelNotFound';
import DestinationDetail from '@/pages/DestinationDetail';
import DestinationNotFound from '@/pages/DestinationNotFound';
import AdventureDetail from '@/pages/AdventureDetail';
import AdventureNotFound from '@/pages/AdventureNotFound';
import BikeRentalDetail from '@/pages/BikeRentalDetail';
import CarRentalDetail from '@/pages/CarRentalDetail';
import BookingNotFound from '@/pages/BookingNotFound';
import AdminOverview from '@/pages/admin/Overview';
import AdminPageBuilder from '@/pages/admin/PageBuilder';
import EarlyHotels from '@/pages/EarlyHotels';
import EarlyHotelDetail from '@/pages/EarlyHotelDetail';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <ThemeProvider defaultTheme="light" storageKey="mount-abu-theme">
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
                <Route path="/admin/register" element={<AdminRegister />} />
                
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/hotel/:hotelSlug" element={<HotelDetail />} />
                <Route path="/hotels/html/:hotelSlug" element={<HotelHtmlView />} />
                <Route path="/hotel-not-found" element={<HotelNotFound />} />
                
                <Route path="/early-hotels" element={<EarlyHotels />} />
                <Route path="/early-hotel/:hotelId" element={<EarlyHotelDetail />} />
                
                <Route path="/bike-rentals" element={<BikeRentals />} />
                <Route path="/rentals/bike" element={<BikeRentals />} />
                <Route path="/bike-rental/:id" element={<BikeRentalDetail />} />
                <Route path="/car-rentals" element={<CarRentals />} />
                <Route path="/rentals/car" element={<CarRentals />} /> 
                <Route path="/rentals/car/:id" element={<CarRentalDetail />} />
                <Route path="/car-rental/:id" element={<CarRentalDetail />} />
                
                <Route path="/destinations" element={<Destinations />} />
                <Route path="/destination/:destinationSlug" element={<DestinationDetail />} />
                <Route path="/destination-not-found" element={<DestinationNotFound />} />
                
                <Route path="/adventures" element={<Adventures />} />
                <Route path="/adventure/:adventureSlug" element={<AdventureDetail />} />
                <Route path="/adventure-not-found" element={<AdventureNotFound />} />
                
                <Route path="/blog" element={<Blog />} />
                <Route path="/booking-not-found" element={<BookingNotFound />} />
                
                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<div>Profile Page</div>} />
                  <Route path="/bookings" element={<div>Bookings Page</div>} />
                </Route>
                
                {/* Admin Routes - All under a shared layout */}
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }>
                  <Route index element={<AdminOverview />} />
                  <Route path="dashboard" element={<AdminOverview />} />
                  <Route path="hotels" element={<AdminHotels />} />
                  <Route path="bikes" element={<AdminBikeRentals />} />
                  <Route path="cars" element={<AdminCarRentals />} />
                  <Route path="adventures" element={<AdminAdventures />} />
                  <Route path="blog" element={<AdminBlog />} />
                  <Route path="bookings" element={<AdminBookings />} />
                  <Route path="users" element={<UsersPage />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="page-builder" element={<AdminPageBuilder />} />
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </AuthProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default App;
