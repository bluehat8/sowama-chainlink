import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from './lib/wagmi';
import supabase from './supabaseClient';
import { Session } from '@supabase/supabase-js';
import '@rainbow-me/rainbowkit/styles.css';

import Dashboard from "./pages/Dashboard";
import WasteDelivery from "./pages/WasteDelivery";
import Marketplace from "./pages/Marketplace";
import EnvironmentalImpact from "./pages/EnvironmentalImpact";
import Admin from "./pages/Admin";
import NFTRewards from "./pages/NFTRewards";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Auth from './pages/Auth';

const queryClient = new QueryClient();

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            {!session ? (
              <Auth />
            ) : (
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/waste-delivery" element={<WasteDelivery />} />
                  <Route path="/marketplace" element={<Marketplace />} />
                  <Route path="/impact" element={<EnvironmentalImpact />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/collector" element={<Admin />} />
                  <Route path="/partner" element={<Admin />} />
                  <Route path="/org" element={<Admin />} />
                  <Route path="/nft-rewards" element={<NFTRewards />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            )}
          </TooltipProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
