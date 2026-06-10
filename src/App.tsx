import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Owner from "./pages/Owner";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";

import { adminRoutes } from "@/features/admin";
import FormBookingPage from "./features/client/booking/FormBookingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner
        theme="dark"
        position="top-center"
        richColors
        closeButton
        toastOptions={{
          style: {
            background: "#18181b",
            border: "1px solid #3f3f46",
            color: "#fff",
          },
          duration: 4000,
        }}
      />
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Index />} />
          <Route path="/owner" element={<Owner />} />
          <Route path="/auth/login" element={<LoginPage />} />
          register
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/client/booking" element={<FormBookingPage />} />
          {/* Admin (feature-based) */}
          {adminRoutes}
          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
