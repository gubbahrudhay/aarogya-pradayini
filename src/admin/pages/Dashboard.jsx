import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import {
  Calendar,
  FileText,
  Image,
  Mail,
  ShieldCheck,
  PlusCircle,
  Settings,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function Dashboard() {
  const { user, role } = useAuth();

  const stats = [
    { label: 'Total Camps', value: '36', icon: Calendar, color: 'text-primary', bg: 'bg-blue-50' },
    { label: 'Draft Reports', value: '2', icon: FileText, color: 'text-accent', bg: 'bg-orange-50' },
    { label: 'Published Reports', value: '34', icon: FileText, color: 'text-primary', bg: 'bg-blue-50' },
    { label: 'Health Blogs', value: '5', icon: FileText, color: 'text-accent', bg: 'bg-orange-50' },
    { label: 'Gallery Photos', value: '9', icon: Image, color: 'text-primary', bg: 'bg-blue-50' },
    { label: 'Unread Messages', value: '1', icon: Mail, color: 'text-accent', bg: 'bg-orange-50' }
  ];

  const quickActions = [
    { label: 'New Camp', to: '/admin/camps', desc: 'Paste WhatsApp reports & parse stats', icon: PlusCircle, color: 'border-primary/20 hover:border-primary text-primary' },
    { label: 'Write Health Blog', to: '/admin/health-blogs', desc: 'Create a new medical wellness article', icon: FileText, color: 'border-accent/20 hover:border-accent text-accent' },
    { label: 'Manage Gallery', to: '/admin/gallery', desc: 'Upload and sync new camp photographs', icon: Image, color: 'border-primary/20 hover:border-primary text-primary' },
    { label: 'System Settings', to: '/admin/settings', desc: 'Configure social media channels & whitelists', icon: Settings, color: 'border-accent/20 hover:border-accent text-accent' }
  ];

  const activities = [
    { user: 'admin@sai.org', action: 'Whitelisted user "volunteer@sai.org"', time: '2 hours ago', tag: 'Users' },
    { user: 'editor@sai.org', action: 'Drafted June 2026 Free Medical Camp', time: '1 day ago', tag: 'Camps' },
    { user: 'admin@sai.org', action: 'Connected LinkedIn Profile Account', time: '3 days ago', tag: 'Settings' },
    { user: 'volunteer@sai.org', action: 'Uploaded 7 photos for June Camp', time: '4 days ago', tag: 'Gallery' }
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <div>
        <h1 className="font-poppins font-extrabold text-2xl sm:text-3xl text-text-primary mb-1">
          Welcome back, {user.displayName || user.email.split('@')[0]}!
        </h1>
        <p className="text-text-secondary font-inter text-sm">
          Here's an overview of Sri Satya Sai Aarogya Pradayini's monthly camp operations and media logs.
        </p>
      </div>

      {/* Stats Counter Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5"
      >
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="bg-white border border-border rounded-3xl p-5 shadow-sm hover:shadow-card transition-shadow duration-300 flex flex-col justify-between"
            >
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <span className="block font-poppins font-extrabold text-2xl text-text-primary mb-0.5">
                  {s.value}
                </span>
                <span className="block text-[10px] font-bold text-text-secondary/70 uppercase tracking-wider font-inter">
                  {s.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Grid: Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Quick Actions */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="font-poppins font-bold text-lg text-text-primary flex items-center gap-2">
            <span className="w-1.5 h-4 bg-primary rounded-full" />
            Quick Operations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((act, idx) => {
              const Icon = act.icon;
              return (
                <Link
                  key={idx}
                  to={act.to}
                  className={`bg-white border ${act.color} rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[140px] group`}
                >
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 bg-bg rounded-xl flex items-center justify-center border border-border/50">
                      <Icon className="w-5 h-5" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-secondary/40 group-hover:translate-x-0.5 group-hover:text-primary transition-all" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-bold text-sm text-text-primary mb-1">
                      {act.label}
                    </h3>
                    <p className="text-[11px] text-text-secondary/80 font-inter leading-relaxed">
                      {act.desc}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right: Recent Activity Log */}
        <div className="lg:col-span-5 space-y-6">
          <h2 className="font-poppins font-bold text-lg text-text-primary flex items-center gap-2">
            <span className="w-1.5 h-4 bg-accent rounded-full" />
            Recent Activity
          </h2>
          <div className="bg-white border border-border rounded-3xl p-6 shadow-sm space-y-5">
            {activities.map((act, idx) => (
              <div key={idx} className="flex gap-4 items-start border-b border-border/60 last:border-b-0 pb-4 last:pb-0">
                <div className="w-8 h-8 rounded-lg bg-bg border border-border flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-bold text-text-secondary/60 font-inter truncate">
                      {act.user}
                    </span>
                    <span className="text-[9px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full uppercase tracking-wider font-inter">
                      {act.tag}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-text-primary leading-normal font-inter">
                    {act.action}
                  </p>
                  <span className="block text-[10px] text-text-secondary/60 font-inter mt-1">
                    {act.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
