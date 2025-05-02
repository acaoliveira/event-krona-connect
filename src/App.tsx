
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EventListing from "./pages/EventListing";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import EventRequests from "./pages/EventRequests";
import EventRequestDetail from "./pages/EventRequestDetail";
import DashboardIndicators from "./pages/DashboardIndicators";
import EventSpaceRequest from "./pages/EventSpaceRequest";
import EventDetail from "./pages/EventDetail";
import CalendarDashboard from "./pages/CalendarDashboard";
import Configurations from "./pages/Configurations";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/events" element={<EventListing />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/event-space-request" element={<EventSpaceRequest />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<CalendarDashboard />} />
          <Route path="/dashboard/solicitacoes" element={<EventRequests />} />
          <Route path="/dashboard/solicitacoes/:id" element={<EventRequestDetail />} />
          <Route path="/dashboard/indicadores" element={<DashboardIndicators />} />
          <Route path="/dashboard/configuracoes" element={<Configurations />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
