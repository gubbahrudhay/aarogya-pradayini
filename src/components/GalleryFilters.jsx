import { motion } from 'framer-motion';

export default function GalleryFilters({
  activeYear,
  onYearChange,
  activeMonth,
  onMonthChange,
  activeCategory,
  onCategoryChange
}) {
  const categories = [
    'All',
    'General Camp',
    'Eye Camp',
    'Cardiology',
    'Blood Pressure Screening',
    'Blood Sugar Testing',
    'Volunteers',
    'Community'
  ];

  const years = ['All', '2026', '2025', '2024'];
  const months = [
    'All',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  return (
    <div className="space-y-6">
      {/* Dropdown Filters (Year / Month) */}
      <div className="flex flex-wrap gap-4 items-center">
        {/* Year Select */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-text-secondary/70 font-inter uppercase tracking-wider">
            Filter by Year
          </label>
          <select
            value={activeYear}
            onChange={(e) => onYearChange(e.target.value)}
            className="bg-white border border-border rounded-xl px-4 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm font-inter"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y === 'All' ? 'All Years' : y}
              </option>
            ))}
          </select>
        </div>

        {/* Month Select */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-text-secondary/70 font-inter uppercase tracking-wider">
            Filter by Month
          </label>
          <select
            value={activeMonth}
            onChange={(e) => onMonthChange(e.target.value)}
            className="bg-white border border-border rounded-xl px-4 py-2 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm font-inter"
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {m === 'All' ? 'All Months' : m}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Pills (Horizontal Scrollable) */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`relative px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-300 font-inter focus:outline-none ${
                isActive ? 'text-white' : 'text-text-secondary hover:text-primary bg-white border border-border shadow-sm'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeGalleryCategory"
                  className="absolute inset-0 bg-primary rounded-full -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
