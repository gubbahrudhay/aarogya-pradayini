import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { isMock } from '../services/firebase';
import {
  LayoutDashboard,
  Calendar,
  Image,
  FileText,
  Mail,
  Settings,
  Users,
  LogOut,
  ArrowUpRight,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import logoImg from '../../assets/images/logo.jpg';

export default function AdminLayout() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const navItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/camps', label: 'Medical Camps', icon: Calendar },
    { to: '/admin/gallery', label: 'Gallery', icon: Image },
    { to: '/admin/health-blogs', label: 'Health Blogs', icon: FileText },
    { to: '/admin/settings', label: 'Settings', icon: Settings },
    { to: '/admin/users', label: 'Users', icon: Users, allowedRoles: ['super-admin'] }
  ];

  return (
    <div className="min-h-screen bg-bg flex font-inter">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-border h-screen sticky top-0">
        {/* Brand */}
        <div className="h-20 border-b border-border flex items-center gap-3 px-6">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-border flex-shrink-0 bg-white">
            <img src={logoImg} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="font-poppins font-bold text-xs leading-none text-primary">Aarogya Pradayini</p>
            <span className="text-[10px] text-text-secondary/70 font-semibold uppercase tracking-wider font-inter">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            if (item.allowedRoles && !item.allowedRoles.includes(role)) return null;
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-primary/5 text-primary'
                      : 'text-text-secondary hover:bg-bg hover:text-primary'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* User profile footer info */}
        <div className="p-4 border-t border-border bg-bg/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary font-poppins text-sm uppercase">
              {user.displayName ? user.displayName.slice(0, 2) : user.email.slice(0, 2)}
            </div>
            <div className="min-w-0">
              <span className="block font-poppins font-bold text-xs text-text-primary truncate">
                {user.displayName || user.email.split('@')[0]}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-accent uppercase font-inter mt-0.5">
                <ShieldCheck className="w-3 h-3" />
                {role}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-white hover:bg-red-50 text-text-secondary hover:text-red-600 border border-border rounded-xl py-2 text-xs font-semibold transition-colors duration-300"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Header */}
        <header className="h-20 bg-white border-b border-border flex items-center justify-between px-6 z-30">
          {/* Left mobile sidebar trigger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-bg rounded-xl border border-border transition-colors text-text-primary focus:outline-none"
              aria-label="Open navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              {isMock && (
                <span className="bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold px-3 py-1 rounded-lg">
                  Simulated Dev Mode
                </span>
              )}
            </div>
          </div>

          {/* Right Header Navigation links */}
          <div className="flex items-center gap-4">
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-primary transition-colors py-2 px-3 border border-border rounded-xl bg-bg/50 hover:bg-bg"
            >
              Visit Public Site
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Subpage Content wrapper */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-full">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer Navigation Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop blur */}
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
          />

          <aside className="relative flex flex-col w-64 bg-white h-full max-w-[80vw] z-10 animate-slide-in">
            <div className="h-20 border-b border-border flex items-center justify-between px-6">
              <div className="flex items-center gap-2">
                <img src={logoImg} alt="" className="w-7 h-7 rounded-lg object-cover" />
                <span className="font-poppins font-bold text-xs text-primary">Aarogya Portal</span>
              </div>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 hover:bg-bg rounded-lg border border-border text-text-primary focus:outline-none"
                aria-label="Close navigation"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav className="flex-1 py-4 px-4 space-y-1.5 overflow-y-auto">
              {navItems.map((item) => {
                if (item.allowedRoles && !item.allowedRoles.includes(role)) return null;
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        isActive
                          ? 'bg-primary/5 text-primary'
                          : 'text-text-secondary hover:bg-bg hover:text-primary'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>

            <div className="p-4 border-t border-border bg-bg/50">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-red-50 text-text-secondary hover:text-red-600 border border-border rounded-xl py-2 text-xs font-semibold transition-colors duration-300"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
