import { Link } from 'react-router-dom';
import { Heart, MapPin, Phone, Mail, Share2 } from 'lucide-react';
import logoImg from '../assets/images/logo.jpg';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/monthly-camp', label: 'Monthly Camp' },
  { to: '/gallery', label: 'Gallery' },
];

const supportLinks = [
  { to: '/volunteer', label: 'Volunteer With Us' },
  { to: '/donate', label: 'Donate' },
  { href: 'https://docs.google.com/spreadsheets/d/1EbkL-2bzJ_vJjtToTV5E_oKdbQrmTVpDqhpWYPF-DpI/edit?usp=sharing', label: 'Financial Report', isExternal: true },
  { to: '/contact', label: 'Contact Us' },
];

const serviceLinks = [
  'General Medicine',
  'Cardiology',
  'Eye Screening',
  'Cataract Surgery',
  'Blood Sugar Testing',
  'Health Awareness',
];

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* Main Footer */}
      <div className="container-max section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-white">
                <img src={logoImg} alt="Sri Satya Sai Aarogya Pradayini Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-poppins font-bold text-sm">Sri Satya Sai</p>
                <p className="font-poppins text-xs text-white/70">Aarogya Pradayini</p>
              </div>
            </div>
            <p className="text-white/75 text-sm font-inter leading-relaxed mb-6">
              Serving the community of Kalwakurthy with free monthly medical camps since our founding.
              <span className="block mt-2 font-semibold text-accent italic">"Love All, Serve All"</span>
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Sri Satya Sai Aarogya Pradayini',
                      text: 'Free monthly medical camps in Kalwakurthy.',
                      url: window.location.origin,
                    }).catch((err) => console.log(err));
                  } else {
                    navigator.clipboard.writeText(window.location.origin);
                    alert('Website link copied to clipboard!');
                  }
                }}
                aria-label="Share website link"
                className="w-9 h-9 bg-white/15 hover:bg-accent rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 text-white"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <a
                href="https://www.linkedin.com/company/sri-satya-sai-aarogya-pradayini/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 bg-white/15 hover:bg-accent rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 text-white"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/srisatyasaiaarogyapradayini/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 bg-white/15 hover:bg-accent rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 text-white"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 bg-white/15 hover:bg-accent rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 text-white"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.388.511a3.002 3.002 0 0 0-2.11 2.107C0 8.053 0 12 0 12s0 3.947.502 5.837a3.003 3.003 0 0 0 2.11 2.107C4.495 20.455 12 20.455 12 20.455s7.505 0 9.388-.511a3.003 3.003 0 0 0 2.11-2.107C24 15.947 24 12 24 12s0-3.947-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/70 hover:text-accent text-sm font-inter transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60 group-hover:bg-accent transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
              {supportLinks.map((link) => (
                <li key={link.label}>
                  {link.isExternal ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-accent text-sm font-inter transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/60 group-hover:bg-accent transition-colors" />
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      className="text-white/70 hover:text-accent text-sm font-inter transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/60 group-hover:bg-accent transition-colors" />
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-white/70 hover:text-accent text-sm font-inter transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60 group-hover:bg-accent transition-colors" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-white/90 text-sm font-inter">Kalwakurthy, Nagarkurnool District</p>
                  <p className="text-white/60 text-xs font-inter">Telangana, India</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <a href="tel:+919492502927" className="text-white/80 hover:text-accent text-sm font-inter transition-colors">
                  +91 94925 02927
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <a href="mailto:srisatyasaiaarogyapradayini@gmail.com" className="text-white/80 hover:text-accent text-sm font-inter transition-colors">
                  srisatyasaiaarogyapradayini@gmail.com
                </a>
              </li>
            </ul>

            {/* Camp info */}
            <div className="mt-6 p-4 bg-white/10 rounded-2xl border border-white/15">
              <p className="text-xs font-semibold text-accent font-inter mb-1">Next Camp</p>
              <p className="text-white text-sm font-poppins font-semibold">Every 2nd Sunday</p>
              <p className="text-white/70 text-xs font-inter">Kalwakurthy — Free for all</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/15">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/60 text-sm font-inter text-center sm:text-left">
            © {new Date().getFullYear()} Sri Satya Sai Aarogya Pradayini. All rights reserved.
          </p>
          <p className="text-white/50 text-xs font-inter flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-accent fill-accent" /> for the community
          </p>
        </div>
      </div>
    </footer>
  );
}
