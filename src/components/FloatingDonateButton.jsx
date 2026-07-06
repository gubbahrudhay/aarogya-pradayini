import { Link, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function FloatingDonateButton() {
  const location = useLocation();

  // Hide the floating button on the donate page itself
  if (location.pathname === '/donate') return null;

  return (
    <div className="fixed bottom-8 right-8 z-45">
      <Link
        to="/donate"
        aria-label="Donate Now"
        className="flex items-center justify-center w-14 h-14 bg-accent hover:bg-accent-dark text-white rounded-full shadow-strong transition-all duration-300"
      >
        <Heart className="w-6 h-6 text-white fill-white" />
      </Link>
    </div>
  );
}
