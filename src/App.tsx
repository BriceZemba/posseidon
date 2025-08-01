
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Whiteboard from "./pages/Whiteboard";
import Templates from "./pages/Templates";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route 
            path="/dashboard" 
            element={
              <SignedIn>
                <Dashboard />
              </SignedIn>
            } 
          />
          <Route 
            path="/whiteboard/:id" 
            element={
              <SignedIn>
                <Whiteboard />
              </SignedIn>
            } 
          />
          <Route 
            path="/whiteboard" 
            element={
              <SignedIn>
                <Whiteboard />
              </SignedIn>
            } 
          />
          <Route 
            path="/templates" 
            element={
              <SignedIn>
                <Templates />
              </SignedIn>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <SignedIn>
                <Settings />
              </SignedIn>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
