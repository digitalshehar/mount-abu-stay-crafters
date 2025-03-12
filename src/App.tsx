import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { BookingProvider } from "./context/BookingContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AdminRoute from "./components/auth/AdminRoute";
import LoadingScreen from "./components/LoadingScreen";

// Lazy-loaded pages
const Index = lazy(() => import("./pages/Index"));
const Hotels = lazy(() => import("./pages/Hotels"));
const HotelDetail = lazy(() => import("./pages/HotelDetail"));
const Destinations = lazy(() => import("./pages/Destinations"));
const DestinationDetail = lazy(() => import("./pages/DestinationDetail"));
const Adventures = lazy(() => import("./pages/Adventures"));
const AdventureDetail = lazy(() => import("./pages/AdventureDetail"));
const CarRentals = lazy(() => import("./pages/CarRentals"));
const BikeRentals = lazy(() => import("./pages/BikeRentals"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Auth = lazy(() => import("./pages/Auth"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const Checkout = lazy(() => import("./pages/Checkout"));
const BookingConfirmation = lazy(() => import("./pages/BookingConfirmation"));
const BookingHistory = lazy(() => import("./pages/BookingHistory"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin pages
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminHotels = lazy(() => import("./pages/admin/Hotels"));
const AdminHotelEdit = lazy(() => import("./pages/admin/HotelEdit"));
const AdminBookings = lazy(() => import("./pages/admin/Bookings"));
const AdminUsers = lazy(() => import("./pages/admin/Users"));
const AdminReviews = lazy(() => import("./pages/admin/Reviews"));
const AdminSettings = lazy(() => import("./pages/admin/Settings"));
const WebsiteSettings = lazy(() => import("./pages/admin/WebsiteSettings"));
const WebsiteContent = lazy(() => import("./pages/admin/WebsiteContent"));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App() {
  useEffect(() => {
    // Initialize any global services or listeners here
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BookingProvider>
            <Router>
              <Suspense fallback={<LoadingScreen />}>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Index />} />
                  <Route path="/hotels" element={<Hotels />} />
                  <Route path="/hotel/:slug" element={<HotelDetail />} />
                  <Route path="/destinations" element={<Destinations />} />
                  <Route path="/destination/:slug" element={<DestinationDetail />} />
                  <Route path="/adventures" element={<Adventures />} />
                  <Route path="/adventure/:slug" element={<AdventureDetail />} />
                  <Route path="/rentals/car" element={<CarRentals />} />
                  <Route path="/rentals/bike" element={<BikeRentals />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/auth" element={<Auth />} />

                  {/* Protected routes */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/booking/confirmation" element={<BookingConfirmation />} />
                    <Route path="/bookings" element={<BookingHistory />} />
                  </Route>

                  {/* Admin routes */}
                  <Route element={<AdminRoute />}>
                    <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/hotels" element={<AdminHotels />} />
                    <Route path="/admin/hotels/:id" element={<AdminHotelEdit />} />
                    <Route path="/admin/bookings" element={<AdminBookings />} />
                    <Route path="/admin/users" element={<AdminUsers />} />
                    <Route path="/admin/reviews" element={<AdminReviews />} />
                    <Route path="/admin/settings" element={<AdminSettings />} />
                    <Route path="/admin/website-settings" element={<WebsiteSettings />} />
                    <Route path="/admin/website-content" element={<WebsiteContent />} />
                  </Route>

                  {/* 404 route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </Router>
            <Toaster />
          </BookingProvider>
        </AuthProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
