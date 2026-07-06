import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Calendar, Heart } from 'lucide-react';

// Simple custom animated counter hook
function useAnimatedCounter(end, duration = 2000, enabled = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, enabled]);
  return count;
}

// Single counter component with IntersectionObserver
function AnimatedCounter({ end, suffix }) {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  const count = useAnimatedCounter(end, 2000, started);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  {
    icon: Users,
    end: 1000,
    suffix: '+',
    label: 'Patients Served',
    desc: 'Lives touched through free healthcare',
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
  },
  {
    icon: Award,
    end: 12,
    suffix: '+',
    label: 'Medical Specialists',
    desc: 'Experienced doctors volunteering their time',
    color: 'text-orange-400',
    bg: 'bg-orange-500/20',
  },
  {
    icon: Calendar,
    value: 'Every',
    suffix: ' Month',
    label: 'Medical Camp',
    desc: 'Consistent, reliable community healthcare',
    color: 'text-green-400',
    bg: 'bg-green-500/20',
    isText: true,
  },
  {
    icon: Heart,
    end: 100,
    suffix: '%',
    label: 'Free Consultation',
    desc: 'Zero cost for every patient, every time',
    color: 'text-red-400',
    bg: 'bg-red-500/20',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function Impact() {
  return (
    <section
      id="impact"
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0D4A8B 0%, #1a5fa3 50%, #1E6FB9 100%)' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30px 30px, rgba(255,255,255,0.5) 2px, transparent 0)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container-max relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/15 text-white text-sm font-semibold px-4 py-2 rounded-full font-inter mb-4"
          >
            Our Impact
          </motion.span>
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-poppins font-bold text-white mb-4"
          >
            Numbers That{' '}
            <span className="text-accent">Matter</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-white/75 font-inter text-xl max-w-2xl mx-auto"
          >
            Every number represents a real person, a real life improved through the power of free healthcare.
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="glass rounded-2xl p-8 text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${stat.color}`} />
                </div>
                <div className="font-poppins font-black text-4xl md:text-5xl text-white mb-1">
                  {stat.isText ? (
                    <span>{stat.value}<span className="text-accent">{stat.suffix}</span></span>
                  ) : (
                    <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                  )}
                </div>
                <p className="font-poppins font-semibold text-white text-lg mb-2">{stat.label}</p>
                <p className="text-white/60 text-sm font-inter">{stat.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
