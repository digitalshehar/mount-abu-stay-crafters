import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./components/NotFound";
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import Adventures from "./pages/Adventures";
import AdventureDetail from "./pages/AdventureDetail";
import Destinations from "./pages/Destinations";
import BikeRentals from "./pages/BikeRentals";
import CarRentals from "./pages/CarRentals";
import Login from "./pages/Auth";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import Dashboard from "./pages/admin/Dashboard";
import HotelNotFound from "./pages/HotelNotFound";
import EarlyHotelDetailPage from "./pages/EarlyHotelDetailPage";
import EnhancedHotels from "./pages/EnhancedHotels";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import HotelsManagement from "./pages/admin/Hotels";

const AppRoutes: React.FC = () => {
  const location = useLocation();
  
  // Log navigation for debugging
  useEffect(() => {
    console.log("Navigation to:", location.pathname);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      
      {/* Hotel routes */}
      <Route path="/hotels" element={<Hotels />} />
      <Route path="/hotels/enhanced" element={<EnhancedHotels />} />
      <Route path="/hotel/:hotelSlug" element={<HotelDetail />} />
      <Route path="/hotel-not-found" element={<HotelNotFound />} />
      <Route path="/early-hotel/:id" element={<EarlyHotelDetailPage />} />
      
      {/* Information pages */}
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/blog" element={<Blog />} />
      
      {/* Other routes */}
      <Route path="/adventures" element={<Adventures />} />
      <Route path="/adventures/:id" element={<AdventureDetail />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/bike-rentals" element={<BikeRentals />} />
      <Route path="/rentals/car" element={<CarRentals />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Login />} />
      <Route path="/auth" element={<Login />} />
      
      {/* Protected routes */}
      <Route path="/account" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      
      {/* Admin routes */}
      <Route path="/admin/hotels" element={<AdminRoute><HotelsManagement /></AdminRoute>} />
      <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
      
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
