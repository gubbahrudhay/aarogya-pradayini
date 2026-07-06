import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function FloatingDonateButton() {
  const location = useLocation();

  // Hide the floating button on the donate page itself
  if (location.pathname === '/donate') return null;

  return createPortal(
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8" style={{ zIndex: 2147483647 }}>
      <Link
        to="/donate"
        aria-label="Donate Now"
        className="flex items-center justify-center w-14 h-14 bg-accent hover:bg-accent-dark text-white rounded-full shadow-strong transition-all duration-300"
      >
        <Heart className="w-6 h-6 text-white fill-white" />
      </Link>
    </div>,
    document.body
  );
}
