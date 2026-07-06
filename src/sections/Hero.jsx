import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Users } from 'lucide-react';
import heroBg from '../assets/images/hero_bg.png';

const badges = [
  { icon: Calendar, label: 'Every 2nd Sunday' },
  { icon: MapPin, label: 'Kalwakurthy' },
  { icon: Users, label: 'Free for All' },
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Free medical camp in Kalwakurthy"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25px 25px, rgba(255,255,255,0.3) 2px, transparent 0)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass text-white text-sm font-semibold px-5 py-2.5 rounded-full mb-8 font-inter"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Sri Satya Sai Aarogya Pradayini
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-poppins font-bold text-white text-shadow leading-tight mb-6"
        >
          Free Healthcare.
          <br />
          <span className="text-accent">2nd Sunday.</span>
          <br />
          For Everyone.
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-base sm:text-xl md:text-2xl text-white/85 font-inter max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Sri Satya Sai Aarogya Pradayini organizes free medical camps on the second Sunday of every month in Kalwakurthy
          where everyone is welcome — regardless of background or ability to pay.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <Link
            to="/monthly-camp"
            id="hero-upcoming-camp-btn"
            className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 font-inter text-lg"
          >
            Upcoming Camp
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/volunteer"
            id="hero-volunteer-btn"
            className="btn-outline-white text-lg"
          >
            Volunteer With Us
          </Link>
        </motion.div>

        {/* Info Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {badges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 glass text-white text-sm font-inter font-medium px-5 py-2.5 rounded-xl"
            >
              <Icon className="w-4 h-4 text-accent" />
              {label}
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
