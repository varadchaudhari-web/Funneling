import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppProvider } from '@/contexts/AppContext';
import { Toaster } from '@/components/ui/sonner';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

import Home from '@/pages/Home';
import About from '@/pages/About';
import Features from '@/pages/Features';
import Pricing from '@/pages/Pricing';
import Contact from '@/pages/Contact';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import UserDashboard from '@/pages/UserDashboard';
import FunnelBuilder from '@/pages/FunnelBuilder';
import CRMDashboard from '@/pages/CRMDashboard';
import Analytics from '@/pages/Analytics';
import CampaignManager from '@/pages/CampaignManager';
import PaymentDemo from '@/pages/PaymentDemo';
import NotificationCenter from '@/pages/NotificationCenter';
import AffiliateDashboard from '@/pages/AffiliateDashboard';
import Settings from '@/pages/Settings';
import LandingPageBuilder from '@/pages/LandingPageBuilder';
import WebsiteBuilder from '@/pages/WebsiteBuilder';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Cookies from '@/pages/Cookies';
import GDPR from '@/pages/GDPR';
import NotFound from '@/pages/NotFound';
import ProtectedRoute from '@/components/features/ProtectedRoute';

const DASHBOARD_ROUTES = [
  '/dashboard', '/admin-dashboard', '/user-dashboard', '/funnel-builder',
  '/crm', '/analytics', '/client-reports', '/campaigns', '/payment', '/notifications',
  '/affiliate', '/settings', '/landing-builder', '/website-builder',
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
}

function AppLayout() {
  const { pathname } = useLocation();
  const isDashboard = DASHBOARD_ROUTES.some(r => pathname.startsWith(r));

  return (
    <div className="min-h-screen flex flex-col">
      {!isDashboard && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/gdpr" element={<GDPR />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
          <Route path="/funnel-builder" element={<ProtectedRoute><FunnelBuilder /></ProtectedRoute>} />
          <Route path="/funnel-builder/:id" element={<ProtectedRoute><FunnelBuilder /></ProtectedRoute>} />
          <Route path="/crm" element={<ProtectedRoute><CRMDashboard /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/client-reports" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/campaigns" element={<ProtectedRoute><CampaignManager /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><PaymentDemo /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><NotificationCenter /></ProtectedRoute>} />
          <Route path="/affiliate" element={<ProtectedRoute><AffiliateDashboard /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/landing-builder" element={<ProtectedRoute><LandingPageBuilder /></ProtectedRoute>} />
          <Route path="/website-builder" element={<ProtectedRoute><WebsiteBuilder /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppLayout />
          <Toaster position="top-right" richColors />
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}
