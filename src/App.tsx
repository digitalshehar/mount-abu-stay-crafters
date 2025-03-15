
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import PageTransition from "./components/PageTransition";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CarRentals from "./pages/CarRentals";
import BikeRentals from "./pages/BikeRentals";
import Adventures from "./pages/Adventures";
import Blog from "./pages/Blog";
import HotelDetail from "./pages/HotelDetail";
import HotelHtmlView from "./pages/HotelHtmlView";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import TravelGuide from "./pages/TravelGuide";
import FAQs from "./pages/FAQs";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import CancellationPolicy from "./pages/CancellationPolicy";
import Hotels from "./pages/Hotels";
import HotelMap from "./pages/HotelMap";
import Destinations from "./pages/Destinations";
import AdventureDetail from "./pages/AdventureDetail";
import DestinationDetail from "./pages/DestinationDetail";
import CarRentalDetail from "./pages/CarRentalDetail";
import BikeRentalDetail from "./pages/BikeRentalDetail";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import HotelNotFound from "./pages/HotelNotFound";
import DestinationNotFound from "./pages/DestinationNotFound";
import AdventureNotFound from "./pages/AdventureNotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminOverview from "./pages/admin/Overview";
import AdminHotels from "./pages/admin/Hotels";
import AdminBlog from "./pages/admin/Blog";
import AdminCarRentals from "./pages/admin/CarRentals";
import AdminBikeRentals from "./pages/admin/BikeRentals";
import AdminAdventures from "./pages/admin/Adventures";
import AdminSettings from "./pages/admin/Settings";
import AdminPageBuilder from "./pages/admin/PageBuilder";
import AdminWebsiteSettings from "./pages/admin/WebsiteSettings";
import AdminBookings from "./pages/admin/Bookings";
import AdminRoute from "./components/auth/AdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<PageTransition><Index /></PageTransition>} />
              <Route path="/hotels" element={<PageTransition><Hotels /></PageTransition>} />
              <Route path="/hotels/map" element={<PageTransition><HotelMap /></PageTransition>} />
              <Route path="/hotel/:hotelSlug" element={<PageTransition><HotelDetail /></PageTransition>} />
              <Route path="/hotel-not-found" element={<PageTransition><HotelNotFound /></PageTransition>} />
              <Route path="/hotel/:hotelSlug/html" element={<PageTransition><HotelHtmlView /></PageTransition>} />
              <Route path="/hotel/:hotelSlug.html" element={<PageTransition><HotelHtmlView /></PageTransition>} />
              <Route path="/destinations" element={<PageTransition><Destinations /></PageTransition>} />
              <Route path="/destination/:destinationSlug" element={<PageTransition><DestinationDetail /></PageTransition>} />
              <Route path="/destination-not-found" element={<PageTransition><DestinationNotFound /></PageTransition>} />
              <Route path="/rentals/car" element={<PageTransition><CarRentals /></PageTransition>} />
              <Route path="/rentals/car/:id" element={<PageTransition><CarRentalDetail /></PageTransition>} />
              <Route path="/rentals/bike" element={<PageTransition><BikeRentals /></PageTransition>} />
              <Route path="/rentals/bike/:id" element={<PageTransition><BikeRentalDetail /></PageTransition>} />
              <Route path="/adventures" element={<PageTransition><Adventures /></PageTransition>} />
              <Route path="/adventure/:adventureSlug" element={<PageTransition><AdventureDetail /></PageTransition>} />
              <Route path="/adventure-not-found" element={<PageTransition><AdventureNotFound /></PageTransition>} />
              <Route path="/blog" element={<PageTransition><Blog /></PageTransition>} />
              <Route path="/about-us" element={<PageTransition><AboutUs /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="/travel-guide" element={<PageTransition><TravelGuide /></PageTransition>} />
              <Route path="/faqs" element={<PageTransition><FAQs /></PageTransition>} />
              <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
              <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
              <Route path="/cancellation-policy" element={<PageTransition><CancellationPolicy /></PageTransition>} />
              
              {/* Auth Routes */}
              <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
              <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
              
              {/* Admin Routes - Protected by AdminRoute */}
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>}>
                <Route index element={<AdminOverview />} />
                <Route path="hotels" element={<AdminHotels />} />
                <Route path="blog" element={<AdminBlog />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="rentals/car" element={<AdminCarRentals />} />
                <Route path="rentals/bike" element={<AdminBikeRentals />} />
                <Route path="adventures" element={<AdminAdventures />} />
                <Route path="page-builder" element={<AdminPageBuilder />} />
                <Route path="website-settings" element={<AdminWebsiteSettings />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
              
              {/* Catch All Route */}
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
