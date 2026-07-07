import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';
import logoImg from '../assets/images/logo.jpg';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/monthly-camp', label: 'Monthly Camp' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/blog', label: 'Blog' },
  { to: '/volunteer', label: 'Volunteer' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 bg-white/95 backdrop-blur-md shadow-medium border-b border-border ${
          scrolled
            ? 'lg:bg-white/95 lg:backdrop-blur-md lg:shadow-medium lg:border-b lg:border-border'
            : 'lg:bg-transparent lg:shadow-none lg:border-transparent'
        }`}
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-300 flex-shrink-0 bg-white">
                <img src={logoImg} alt="Sri Satya Sai Aarogya Pradayini Logo" className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block">
                <p className={`font-poppins font-bold text-sm leading-tight transition-colors duration-300 text-primary ${scrolled ? 'lg:text-primary' : 'lg:text-white'}`}>
                  Sri Satya Sai
                </p>
                <p className={`font-poppins font-semibold text-xs transition-colors duration-300 text-text-secondary ${scrolled ? 'lg:text-text-secondary' : 'lg:text-white/80'}`}>
                  Aarogya Pradayini
                </p>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-xl font-inter font-medium text-sm transition-all duration-300 ${
                      isActive
                        ? scrolled
                          ? 'bg-primary/10 text-primary'
                          : 'bg-white/20 text-white'
                        : scrolled
                        ? 'text-text-secondary hover:text-primary hover:bg-primary/5'
                        : 'text-white/85 hover:text-white hover:bg-white/15'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Donate Button + Hamburger */}
            <div className="flex items-center gap-3">
              <Link
                to="/donate"
                className="hidden sm:flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 font-inter"
              >
                <Heart className="w-4 h-4" />
                Donate
              </Link>

              {/* Mobile Hamburger */}
              <button
                id="mobile-menu-btn"
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden p-2 rounded-xl transition-all duration-300 text-primary hover:bg-primary/10 ${
                  scrolled ? 'lg:text-primary lg:hover:bg-primary/10' : 'lg:text-white lg:hover:bg-white/15'
                }`}
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-0 right-0 z-40 bg-white shadow-strong border-b border-border lg:hidden"
          >
            <div className="container-max px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl font-inter font-medium text-sm transition-all duration-300 ${
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-secondary hover:text-primary hover:bg-primary/5'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="pt-2 mt-2 border-t border-border"
              >
                <Link
                  to="/donate"
                  className="flex items-center justify-center gap-2 bg-accent text-white font-semibold text-sm px-5 py-3 rounded-xl w-full font-inter"
                >
                  <Heart className="w-4 h-4" />
                  Donate Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
