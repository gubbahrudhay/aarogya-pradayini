import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import FloatingDonateButton from './components/FloatingDonateButton';
import { AuthProvider } from './admin/contexts/AuthContext';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const MonthlyCampPage = lazy(() => import('./pages/MonthlyCampPage'));
const Gallery = lazy(() => import('./pages/Gallery'));
const VolunteerPage = lazy(() => import('./pages/VolunteerPage'));
const DonatePage = lazy(() => import('./pages/DonatePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const Blogs = lazy(() => import('./pages/Blogs'));
const BlogDetails = lazy(() => import('./pages/BlogDetails'));

// Admin Lazy Pages
const Login = lazy(() => import('./admin/pages/Login'));
const AdminLayout = lazy(() => import('./admin/layouts/AdminLayout'));
const Dashboard = lazy(() => import('./admin/pages/Dashboard'));
const CampManager = lazy(() => import('./admin/pages/CampManager'));
const GalleryManager = lazy(() => import('./admin/pages/GalleryManager'));
const VolunteerManager = lazy(() => import('./admin/pages/VolunteerManager'));
const BlogManager = lazy(() => import('./admin/pages/BlogManager'));
const Settings = lazy(() => import('./admin/pages/Settings'));
const UserManager = lazy(() => import('./admin/pages/UserManager'));
const ProtectedRoute = lazy(() => import('./admin/components/ProtectedRoute'));

// Page transition wrapper
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-bg">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      <p className="text-text-secondary font-inter text-sm">Loading...</p>
    </div>
  </div>
);

// App Router (needs to be inside BrowserRouter to use useLocation)
function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      {!isAdmin && <FloatingDonateButton />}
      <main className={isAdmin ? 'bg-bg' : ''}>
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Public Routes */}
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
              <Route path="/services" element={<PageWrapper><ServicesPage /></PageWrapper>} />
              <Route path="/monthly-camp" element={<PageWrapper><MonthlyCampPage /></PageWrapper>} />
              <Route path="/gallery" element={<PageWrapper><Gallery /></PageWrapper>} />
              <Route path="/blog" element={<PageWrapper><Blogs /></PageWrapper>} />
              <Route path="/blog/:slug" element={<PageWrapper><BlogDetails /></PageWrapper>} />
              <Route path="/volunteer" element={<PageWrapper><VolunteerPage /></PageWrapper>} />
              <Route path="/donate" element={<PageWrapper><DonatePage /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<PageWrapper><Login /></PageWrapper>} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="camps" element={<CampManager />} />
                <Route path="volunteers" element={<VolunteerManager />} />
                <Route path="gallery" element={<GalleryManager />} />
                <Route path="health-blogs" element={<BlogManager />} />
                <Route path="settings" element={<Settings />} />
                <Route
                  path="users"
                  element={
                    <ProtectedRoute allowedRoles={['super-admin']}>
                      <UserManager />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      {!isAdmin && <Footer />}
    </>
  );
}

export default function App() {
  // Dynamic schema migrations: if cached localStorage databases contain old stats (e.g., Cardiology or General Medicine),
  // clear them to fetch the fresh correct layout from the new bundled default datasets.
  try {
    const savedCamps = localStorage.getItem('aarogya_camps');
    if (savedCamps) {
      const parsed = JSON.parse(savedCamps);
      const hasOldStats = parsed.some(c => c.stats?.some(s => s.label === 'Cardiology' || s.label === 'General Medicine'));
      if (hasOldStats) {
        localStorage.removeItem('aarogya_camps');
        localStorage.removeItem('aarogya_blogs');
      }
    }
  } catch (e) {
    console.error('Migration error resetting localStorage stats:', e);
  }

  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
      <Analytics />
    </HelmetProvider>
  );
}
