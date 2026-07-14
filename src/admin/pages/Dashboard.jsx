import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import {
  Calendar,
  FileText,
  Image,
  ShieldCheck,
  PlusCircle,
  Settings,
  ChevronRight,
  TrendingUp,
  HeartHandshake
} from 'lucide-react';
import { db, isMock } from '../services/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { campReports as initialCamps } from '../../data/campReports';
import { blogs as initialBlogs } from '../../data/blogs';
import { photos as initialPhotos } from '../../data/gallery';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function Dashboard() {
  const { user } = useAuth();

  const [campsCount, setCampsCount] = useState(0);
  const [draftsCount, setDraftsCount] = useState(0);
  const [publishedCount, setPublishedCount] = useState(0);
  const [blogsCount, setBlogsCount] = useState(0);
  const [photosCount, setPhotosCount] = useState(0);
  const [volunteersCount, setVolunteersCount] = useState(0);
  const [latestCamps, setLatestCamps] = useState([]);
  const [latestVolunteers, setLatestVolunteers] = useState([]);
  const [camps, setCamps] = useState([]);

  useEffect(() => {
    // 1. Get Camps
    const savedCamps = localStorage.getItem('aarogya_camps');
    const campsList = savedCamps ? JSON.parse(savedCamps) : initialCamps;
    setCamps(campsList);
    setCampsCount(campsList.length);
    const drafts = campsList.filter(c => c.status === 'draft');
    setDraftsCount(drafts.length);
    setPublishedCount(campsList.length - drafts.length);
    setLatestCamps(campsList.slice(0, 3));

    // 2. Get Blogs
    const savedBlogs = localStorage.getItem('aarogya_blogs');
    const blogsList = savedBlogs ? JSON.parse(savedBlogs) : initialBlogs;
    setBlogsCount(blogsList.length);

    // 3. Get Photos
    if (isMock) {
      const savedPhotos = localStorage.getItem('mock_gallery_photos');
      const photosList = savedPhotos ? JSON.parse(savedPhotos) : initialPhotos;
      setPhotosCount(photosList.length);
    } else {
      const fetchPhotos = async () => {
        try {
          const q = collection(db, 'gallery');
          const snap = await getDocs(q);
          setPhotosCount(snap.size + initialPhotos.length);
        } catch (e) {
          console.error(e);
          setPhotosCount(initialPhotos.length);
        }
      };
      fetchPhotos();
    }

    // 4. Get Volunteers
    if (isMock) {
      const savedVols = localStorage.getItem('mock_volunteers');
      const volsList = savedVols ? JSON.parse(savedVols) : [];
      const finalVols = volsList.length > 0 ? volsList : [
        { id: 'mock-1', name: 'Rohan Sharma', email: 'rohan.sharma@gmail.com', phone: '+91 98480 22338', role: 'student', message: 'I am a final year medical student at Gandhi Medical College. Want to volunteer as an assistant.', status: 'pending', createdAt: '2026-07-06T10:00:00Z' },
        { id: 'mock-2', name: 'Dr. Srinivas Rao', email: 'srinivas.med@yahoo.com', phone: '+91 94405 12044', role: 'doctor', message: 'General physician willing to consult patients during the Sunday camps.', status: 'contacted', createdAt: '2026-07-05T08:30:00Z' }
      ];
      setVolunteersCount(finalVols.length);
      setLatestVolunteers(finalVols.slice(0, 3));
    } else {
      const fetchVolunteers = async () => {
        try {
          const q = query(collection(db, 'volunteers'), orderBy('createdAt', 'desc'));
          const snap = await getDocs(q);
          const list = [];
          snap.forEach(d => {
            const data = d.data();
            list.push({
              id: d.id,
              ...data,
              createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString()
            });
          });
          setVolunteersCount(list.length);
          setLatestVolunteers(list.slice(0, 3));
        } catch (e) {
          console.error(e);
        }
      };
      fetchVolunteers();
    }
  }, []);

  const stats = [
    { label: 'Total Camps', value: campsCount.toString(), icon: Calendar, color: 'text-primary', bg: 'bg-blue-50' },
    { label: 'Draft Reports', value: draftsCount.toString(), icon: FileText, color: 'text-accent', bg: 'bg-orange-50' },
    { label: 'Published Reports', value: publishedCount.toString(), icon: FileText, color: 'text-primary', bg: 'bg-blue-50' },
    { label: 'Health Blogs', value: blogsCount.toString(), icon: FileText, color: 'text-accent', bg: 'bg-orange-50' },
    { label: 'Gallery Photos', value: photosCount.toString(), icon: Image, color: 'text-primary', bg: 'bg-blue-50' },
    { label: 'Volunteer Signups', value: volunteersCount.toString(), icon: HeartHandshake, color: 'text-accent', bg: 'bg-orange-50' }
  ];

  const quickActions = [
    { label: 'New Camp', to: '/admin/camps', desc: 'Paste WhatsApp reports & parse stats', icon: PlusCircle, color: 'border-primary/20 hover:border-primary text-primary' },
    { label: 'Write Health Blog', to: '/admin/health-blogs', desc: 'Create a new medical wellness article', icon: FileText, color: 'border-accent/20 hover:border-accent text-accent' },
    { label: 'Manage Gallery', to: '/admin/gallery', desc: 'Upload and sync new camp photographs', icon: Image, color: 'border-primary/20 hover:border-primary text-primary' },
    { label: 'System Settings', to: '/admin/settings', desc: 'Configure social media channels & whitelists', icon: Settings, color: 'border-accent/20 hover:border-accent text-accent' }
  ];

  const chartData = camps.length > 0 
    ? [...camps]
        .filter(c => c.patientsServed || c.patients)
        .map(c => ({
          name: c.month || c.date || 'Camp',
          patients: parseInt(c.patientsServed || c.patients || 0, 10)
        }))
        .reverse()
        .slice(-5)
    : [
        { name: 'Mar 2026', patients: 436 },
        { name: 'Apr 2026', patients: 450 },
        { name: 'May 2026', patients: 442 },
        { name: 'Jun 2026', patients: 520 },
        { name: 'Jul 2026', patients: 507 }
      ];

  const activities = [];
  latestCamps.forEach(c => {
    activities.push({
      type: 'camp',
      title: `Camp report published: ${c.title}`,
      time: c.date || 'Recent',
      badge: 'Camps'
    });
  });

  latestVolunteers.forEach(v => {
    activities.push({
      type: 'volunteer',
      title: `New volunteer: ${v.name} (${v.role})`,
      time: new Date(v.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      badge: 'Volunteers'
    });
  });

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <div>
        <h1 className="font-poppins font-extrabold text-2xl sm:text-3xl text-text-primary mb-1">
          Welcome back, {user?.displayName || user?.email?.split('@')[0]}!
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
                <span className="block font-poppins font-extrabold text-2xl text-text-primary mb-0.5 animate-fade-in">
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

      {/* Grid: Charts, Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Camp Attendance Trends (SVG Graph) & Quick Actions */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white border border-border rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-poppins font-bold text-base text-text-primary flex items-center gap-2">
                <span className="w-1.5 h-4 bg-primary rounded-full" />
                Camp Attendance Trends
              </h2>
              <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase tracking-wider font-inter">
                Last 5 Camps
              </span>
            </div>
            
            {/* Simple SVG Chart */}
            <div className="relative pt-4">
              <svg viewBox="0 0 500 200" className="w-full h-48 overflow-visible">
                <line x1="40" y1="20" x2="480" y2="20" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                <line x1="40" y1="70" x2="480" y2="70" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                <line x1="40" y1="120" x2="480" y2="120" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4" />
                <line x1="40" y1="170" x2="480" y2="170" stroke="#cbd5e1" strokeWidth="1.5" />
                
                {chartData.length > 1 && (() => {
                  const points = chartData.map((d, i) => {
                    const x = 40 + (i * (440 / (chartData.length - 1)));
                    const y = 170 - ((d.patients / 600) * 150);
                    return { x, y, name: d.name, patients: d.patients };
                  });
                  
                  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
                  const areaPath = `${linePath} L ${points[points.length - 1].x} 170 L ${points[0].x} 170 Z`;
                  
                  return (
                    <>
                      <path d={areaPath} fill="url(#chartGradient)" opacity="0.15" />
                      <path d={linePath} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      
                      {points.map((p, idx) => (
                        <g key={idx}>
                          <circle cx={p.x} cy={p.y} r="6" fill="#3b82f6" opacity="0.3" />
                          <circle cx={p.x} cy={p.y} r="3.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="2.5" />
                          <text x={p.x} y={p.y - 10} textAnchor="middle" className="text-[10px] font-bold fill-text-primary font-inter">
                            {p.patients}
                          </text>
                          <text x={p.x} y="190" textAnchor="middle" className="text-[9px] font-semibold fill-text-secondary/80 font-inter">
                            {p.name.split(' ')[0]}
                          </text>
                        </g>
                      ))}
                    </>
                  );
                })()}
              </svg>
            </div>
          </div>

          <div className="space-y-6">
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
        </div>

        {/* Right: Connectivity Status & Recent Activity Log */}
        <div className="lg:col-span-5 space-y-8">
          {/* Whitelisting / System Status */}
          <div className="bg-white border border-border rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="font-poppins font-bold text-base text-text-primary flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              System Status
            </h2>
            <div className="space-y-3 font-inter text-xs">
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-text-secondary">Database Connection:</span>
                <span className={`font-bold ${isMock ? 'text-orange-500' : 'text-green-600'} flex items-center gap-1.5`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${isMock ? 'bg-orange-500 animate-pulse' : 'bg-green-600'}`} />
                  {isMock ? 'Sandbox (Mock Mode)' : 'Production (Live)'}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-text-secondary">GitHub Sync API:</span>
                <span className="text-green-600 font-bold flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-600" />
                  Active & Connected
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-text-secondary">Active User:</span>
                <span className="text-text-primary font-bold truncate max-w-[180px]">{user?.email}</span>
              </div>
            </div>
          </div>

          {/* Activity Logs */}
          <div className="space-y-6">
            <h2 className="font-poppins font-bold text-lg text-text-primary flex items-center gap-2">
              <span className="w-1.5 h-4 bg-accent rounded-full" />
              Recent Activity Feed
            </h2>
            <div className="bg-white border border-border rounded-3xl p-6 shadow-sm space-y-5">
              {activities.length === 0 ? (
                <p className="text-xs text-text-secondary font-inter">No recent operations logged.</p>
              ) : (
                activities.slice(0, 5).map((act, idx) => (
                  <div key={idx} className="flex gap-4 items-start border-b border-border/60 last:border-b-0 pb-4 last:pb-0">
                    <div className="w-8 h-8 rounded-lg bg-bg border border-border flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[9px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full uppercase tracking-wider font-inter">
                          {act.badge}
                        </span>
                        <span className="text-[10px] text-text-secondary/60 font-inter">
                          {act.time}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-text-primary leading-normal font-inter">
                        {act.title}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
