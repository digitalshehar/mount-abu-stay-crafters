
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
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
              <Route path="/" element={<Index />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/hotels/map" element={<HotelMap />} />
              <Route path="/hotel/:hotelSlug" element={<HotelDetail />} />
              <Route path="/hotel-not-found" element={<HotelNotFound />} />
              <Route path="/hotel/:hotelSlug/html" element={<HotelHtmlView />} />
              <Route path="/hotel/:hotelSlug.html" element={<HotelHtmlView />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destination/:destinationSlug" element={<DestinationDetail />} />
              <Route path="/destination-not-found" element={<DestinationNotFound />} />
              <Route path="/rentals/car" element={<CarRentals />} />
              <Route path="/rentals/car/:id" element={<CarRentalDetail />} />
              <Route path="/rentals/bike" element={<BikeRentals />} />
              <Route path="/rentals/bike/:id" element={<BikeRentalDetail />} />
              <Route path="/adventures" element={<Adventures />} />
              <Route path="/adventure/:adventureSlug" element={<AdventureDetail />} />
              <Route path="/adventure-not-found" element={<AdventureNotFound />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/travel-guide" element={<TravelGuide />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cancellation-policy" element={<CancellationPolicy />} />
              
              {/* Auth Routes */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
