import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { blogs } from '../data/blogs';
import { campReports } from '../data/campReports';
import FeaturedBlog from '../components/FeaturedBlog';
import BlogCard from '../components/BlogCard';
import CampReportCard from '../components/CampReportCard';
import Categories from '../components/Categories';
import Sidebar from '../components/Sidebar';
import Newsletter from '../components/Newsletter';
import { ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const ITEMS_PER_PAGE = 6;

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Combine and sort articles by date descending
  // (June 2026 > May 2026 > April 2026)
  const allItems = useMemo(() => {
    const combined = [...campReports, ...blogs];
    return combined.sort((a, b) => new Date(b.date || b.publishedDate) - new Date(a.date || a.publishedDate));
  }, []);

  // Filter items based on activeCategory and searchQuery
  const filteredItems = useMemo(() => {
    setCurrentPage(1); // Reset page on filter change
    return allItems.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' ||
        (activeCategory === 'Camp Reports' && item.type === 'camp-report') ||
        (item.type === 'awareness' && item.category === activeCategory);

      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesCategory && matchesSearch;
    });
  }, [allItems, activeCategory, searchQuery]);

  // Pull latest item for Featured element (only when no search/filters are active)
  const { featuredItem, displayItems } = useMemo(() => {
    if (activeCategory === 'All' && !searchQuery) {
      return {
        featuredItem: allItems[0],
        displayItems: allItems.slice(1)
      };
    }
    return {
      featuredItem: null,
      displayItems: filteredItems
    };
  }, [allItems, filteredItems, activeCategory, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(displayItems.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return displayItems.slice(start, start + ITEMS_PER_PAGE);
  }, [displayItems, currentPage]);

  const categories = [
    'All',
    'Camp Reports',
    'Preventative Health',
    'Eye Care',
    'Cardiology'
  ];

  return (
    <>
      <SEO
        title="Blogs & Camp Reports | Sri Satya Sai Aarogya Pradayini"
        description="Read monthly medical camp performance reports and expert health awareness articles from Sri Satya Sai Aarogya Pradayini."
      />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-primary text-white">
        <div className="container-max section-padding py-0">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="max-w-2xl"
          >
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full font-inter mb-6">
              📰 Publications
            </motion.span>
            <motion.h1 variants={fadeUp} className="section-title text-white mb-4">
              Blogs & <span className="text-accent">Updates</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/80 font-inter text-lg">
              Stay connected with our monthly camp impact statistics and explore guides for healthier family living.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-bg">
        <div className="container-max">
          {/* Featured Article (Top, full-width) */}
          {featuredItem && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-14"
            >
              <FeaturedBlog item={featuredItem} />
            </motion.div>
          )}

          {/* Filtering bar */}
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-10">
            <div className="w-full md:w-auto">
              <Categories
                categories={categories}
                activeCategory={activeCategory}
                onSelect={(cat) => {
                  setActiveCategory(cat);
                  setSearchQuery('');
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Grid display */}
            <div className="lg:col-span-8 space-y-10">
              <AnimatePresence mode="wait">
                {paginatedItems.length > 0 ? (
                  <motion.div
                    key={`${activeCategory}-${searchQuery}-${currentPage}`}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                  >
                    {paginatedItems.map((item) => (
                      <motion.div key={item.id} variants={fadeUp} layout>
                        {item.type === 'camp-report' ? (
                          <CampReportCard report={item} />
                        ) : (
                          <BlogCard blog={item} />
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white rounded-3xl border border-border p-12 text-center"
                  >
                    <AlertCircle className="w-12 h-12 text-text-secondary/50 mx-auto mb-4" />
                    <h3 className="font-poppins font-bold text-lg text-text-primary mb-2">No Articles Found</h3>
                    <p className="text-text-secondary font-inter text-sm max-w-md mx-auto">
                      We couldn't find any articles matching your selection. Try clearing your filters or search keywords.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-6">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-11 h-11 border border-border rounded-xl flex items-center justify-center text-text-secondary bg-white hover:text-primary hover:border-primary disabled:opacity-50 disabled:hover:text-text-secondary disabled:hover:border-border transition-all duration-300 active:scale-95"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-11 h-11 rounded-xl text-sm font-bold transition-all duration-300 ${
                        currentPage === page
                          ? 'bg-primary text-white shadow-sm'
                          : 'border border-border text-text-secondary bg-white hover:text-primary hover:border-primary'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="w-11 h-11 border border-border rounded-xl flex items-center justify-center text-text-secondary bg-white hover:text-primary hover:border-primary disabled:opacity-50 disabled:hover:text-text-secondary disabled:hover:border-border transition-all duration-300 active:scale-95"
                    aria-label="Next Page"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar display */}
            <div className="lg:col-span-4">
              <Sidebar
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
              />
            </div>
          </div>

          {/* Newsletter section */}
          <div className="mt-20">
            <Newsletter />
          </div>
        </div>
      </section>
    </>
  );
}
