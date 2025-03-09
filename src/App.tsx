import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { NotificationProvider } from './context/NotificationContext';
import { Toaster } from 'sonner';
import Loading from './components/Loading';
import PublicLayout from './layouts/PublicLayout';
import NotFound from './pages/NotFound';
import './App.css';

// Lazy-loaded components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Hotels = lazy(() => import('./pages/Hotels'));
const HotelDetails = lazy(() => import('./pages/HotelDetails'));
const Adventures = lazy(() => import('./pages/Adventures'));
const AdventureDetails = lazy(() => import('./pages/AdventureDetails'));
const CarRentals = lazy(() => import('./pages/CarRentals'));
const CarRentalDetails = lazy(() => import('./pages/CarRentalDetails'));
const BikeRentals = lazy(() => import('./pages/BikeRentals'));
const BikeRentalDetails = lazy(() => import('./pages/BikeRentalDetails'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Profile = lazy(() => import('./pages/Profile'));
const Bookings = lazy(() => import('./pages/Bookings'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

// Admin Components
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Overview = lazy(() => import('./pages/admin/Overview'));
const AdventuresManagement = lazy(() => import('./pages/admin/AdventuresManagement'));
const CarRentalsManagement = lazy(() => import('./pages/admin/CarRentalsManagement'));
const BikeRentalsManagement = lazy(() => import('./pages/admin/BikeRentalsManagement'));
const BlogManagement = lazy(() => import('./pages/admin/BlogManagement'));
const Settings = lazy(() => import('./pages/admin/Settings'));
const WebsiteSettings = lazy(() => import('./pages/admin/WebsiteSettings'));
const PageBuilder = lazy(() => import('./pages/admin/PageBuilder'));
const BookingManagement = lazy(() => import('./pages/admin/BookingManagement'));

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <NotificationProvider>
          <Router>
            <Toaster position="bottom-right" richColors closeButton />
            <Suspense fallback={<Loading />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<PublicLayout />}>
                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="hotels" element={<Hotels />} />
                  <Route path="hotels/:slug" element={<HotelDetails />} />
                  <Route path="adventures" element={<Adventures />} />
                  <Route path="adventures/:slug" element={<AdventureDetails />} />
                  <Route path="car-rentals" element={<CarRentals />} />
                  <Route path="car-rentals/:slug" element={<CarRentalDetails />} />
                  <Route path="bike-rentals" element={<BikeRentals />} />
                  <Route path="bike-rentals/:slug" element={<BikeRentalDetails />} />
                  <Route path="blog" element={<Blog />} />
                  <Route path="blog/:slug" element={<BlogPost />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="bookings" element={<Bookings />} />
                </Route>

                {/* Authentication Routes */}
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />

                {/* Admin Routes - Using Dashboard component directly instead of AdminLayout */}
                <Route path="admin" element={<Dashboard />}>
                  <Route index element={<Overview />} />
                  <Route path="hotels" element={<Hotels />} />
                  <Route path="booking-management" element={<BookingManagement />} />
                  <Route path="adventures" element={<AdventuresManagement />} />
                  <Route path="car-rentals" element={<CarRentalsManagement />} />
                  <Route path="bike-rentals" element={<BikeRentalsManagement />} />
                  <Route path="blog" element={<BlogManagement />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="website-settings" element={<WebsiteSettings />} />
                  <Route path="page-builder" element={<PageBuilder />} />
                </Route>

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Router>
        </NotificationProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
