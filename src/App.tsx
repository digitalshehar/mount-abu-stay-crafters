
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/theme-provider";
import { ResponsiveProvider } from "@/context/ResponsiveContext";
import AppRoutes from "./Routes";
import "./App.css";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1
    },
  },
});

function App() {
  console.log("Rendering App with all providers");
  
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <ThemeProvider defaultTheme="light" storageKey="mount-abu-theme">
              <ResponsiveProvider>
                <AppRoutes />
                <Toaster />
                <SonnerToaster position="top-right" />
              </ResponsiveProvider>
            </ThemeProvider>
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
