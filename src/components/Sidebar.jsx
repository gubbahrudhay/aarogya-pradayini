import { Link } from 'react-router-dom';
import { Search, ChevronRight, Calendar, Bookmark, FolderOpen } from 'lucide-react';
import { blogs } from '../data/blogs';
import { campReports } from '../data/campReports';

export default function Sidebar({ searchValue, onSearchChange, activeCategory, onSelectCategory }) {
  // Load from localStorage if present
  const savedBlogs = localStorage.getItem('aarogya_blogs');
  const activeBlogs = savedBlogs ? JSON.parse(savedBlogs) : blogs;
  const publicBlogs = activeBlogs.filter(b => b.status === 'published' || b.status === undefined);

  // Combine and sort latest items
  const recentArticles = [...publicBlogs]
    .slice(0, 3);

  const popularArticles = publicBlogs.filter(b => b.popular).slice(0, 3);

  const savedCamps = localStorage.getItem('aarogya_camps');
  const activeCamps = savedCamps ? JSON.parse(savedCamps) : campReports;
  const publicCamps = activeCamps.filter(c => c.status === 'published' || c.status === undefined);

  const archives = publicCamps.map(c => ({
    label: c.month,
    slug: c.slug
  }));

  const categories = [
    'All',
    'Camp Reports',
    'Preventative Health',
    'Eye Care',
    'Cardiology'
  ];

  return (
    <aside className="space-y-10">
      {/* Search Widget */}
      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
        <h3 className="font-poppins font-bold text-base text-text-primary mb-4 flex items-center gap-2">
          <Search className="w-4 h-4 text-primary" />
          Search
        </h3>
        <div className="relative">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Type keyword..."
            className="w-full pl-10 pr-4 py-2.5 bg-bg border border-border rounded-xl text-text-primary placeholder-text-secondary/70 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 font-inter text-sm"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary/70" />
        </div>
      </div>

      {/* Categories Widget */}
      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
        <h3 className="font-poppins font-bold text-base text-text-primary mb-4 flex items-center gap-2">
          <FolderOpen className="w-4 h-4 text-primary" />
          Categories
        </h3>
        <ul className="space-y-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <li key={cat}>
                <button
                  onClick={() => onSelectCategory(cat)}
                  className={`w-full text-left flex items-center justify-between py-2 px-3 rounded-xl transition-all duration-300 font-inter text-sm ${
                    isActive
                      ? 'bg-primary/5 text-primary font-semibold'
                      : 'text-text-secondary hover:bg-bg hover:text-primary'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'rotate-90 text-primary' : 'text-text-secondary/50'}`} />
                    {cat}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Recent Posts Widget */}
      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
        <h3 className="font-poppins font-bold text-base text-text-primary mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-accent" />
          Recent Articles
        </h3>
        <div className="space-y-4">
          {recentArticles.map((art) => (
            <div key={art.id} className="flex gap-3 group">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                <img
                  src={art.coverImage}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-semibold text-accent font-inter block mb-1">
                  {art.publishedDate}
                </span>
                <Link
                  to={`/blog/${art.slug}`}
                  className="font-poppins font-semibold text-xs text-text-primary hover:text-primary transition-colors line-clamp-2 leading-snug"
                >
                  {art.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Articles Widget */}
      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
        <h3 className="font-poppins font-bold text-base text-text-primary mb-4 flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-primary" />
          Popular Articles
        </h3>
        <ul className="space-y-3">
          {popularArticles.map((art) => (
            <li key={art.id} className="border-b border-border last:border-b-0 pb-3 last:pb-0">
              <Link
                to={`/blog/${art.slug}`}
                className="font-poppins font-semibold text-sm text-text-primary hover:text-primary transition-colors leading-snug block mb-1"
              >
                {art.title}
              </Link>
              <span className="text-[10px] text-text-secondary/70 font-semibold font-inter uppercase tracking-wider">
                {art.category} • {art.readingTime}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Monthly Camp Archives Widget */}
      <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
        <h3 className="font-poppins font-bold text-base text-text-primary mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-accent" />
          Camp Archives
        </h3>
        <ul className="space-y-2.5">
          {archives.map((arc, i) => (
            <li key={i}>
              <Link
                to={`/blog/${arc.slug}`}
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors font-inter group"
              >
                <ChevronRight className="w-3.5 h-3.5 text-text-secondary/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                <span>{arc.label} Camp Report</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
