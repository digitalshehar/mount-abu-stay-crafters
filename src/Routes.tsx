
import React from "react";
import { Routes, Route } from "react-router-dom";
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

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/hotels" element={<Hotels />} />
      <Route path="/hotels/:id" element={<HotelDetail />} />
      <Route path="/adventures" element={<Adventures />} />
      <Route path="/adventures/:id" element={<AdventureDetail />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/bike-rentals" element={<BikeRentals />} />
      <Route path="/rentals/car" element={<CarRentals />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Login />} />
      
      {/* Protected routes */}
      <Route path="/account" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      
      {/* Admin routes */}
      <Route path="/admin/hotels" element={<AdminRoute><Dashboard /></AdminRoute>} />
      <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
      
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
