import { motion } from 'framer-motion';

export default function Categories({ categories, activeCategory, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`relative px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors duration-300 font-inter focus:outline-none ${
              isActive ? 'text-white' : 'text-text-secondary hover:text-primary bg-white border border-border shadow-sm'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-primary rounded-full -z-10"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            {category}
          </button>
        );
      })}
    </div>
  );
}
