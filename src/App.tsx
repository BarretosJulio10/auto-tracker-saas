
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Admin Panel
import AdminDashboard from "./pages/admin/Index";
import AdminDevices from "./pages/admin/devices";
import AdminMapPage from "./pages/admin/map";

// Company Panel
import CompanyDashboard from "./pages/company/Index";

// Client Panel
import ClientDashboard from "./pages/client/Index";

// Not Found Page
import NotFound from "./pages/NotFound";

// Panel Switcher Component
import PanelSwitcher from "./components/layout/PanelSwitcher";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Temporary redirect from root to admin dashboard for demo purposes */}
            <Route path="/" element={<Navigate to="/admin" replace />} />
            
            {/* Admin Panel Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/devices" element={<AdminDevices />} />
            <Route path="/admin/map" element={<AdminMapPage />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            
            {/* Company Panel Routes */}
            <Route path="/company" element={<CompanyDashboard />} />
            <Route path="/company/*" element={<CompanyDashboard />} />
            
            {/* Client Panel Routes */}
            <Route path="/client" element={<ClientDashboard />} />
            <Route path="/client/*" element={<ClientDashboard />} />
            
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
        <PanelSwitcher />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
