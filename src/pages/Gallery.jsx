import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { collections, photos, videos } from '../data/gallery';
import GalleryHero from '../components/GalleryHero';
import CollectionCard from '../components/CollectionCard';
import PhotoGrid from '../components/PhotoGrid';
import VideoGrid from '../components/VideoGrid';
import GalleryFilters from '../components/GalleryFilters';
import VideoModal from '../components/VideoModal';
import StatsSection from '../components/StatsSection';
import { Image, Video, Users2, Calendar, FileImage, FileVideo, ArrowRight, Heart } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Gallery() {
  const [activeTab, setActiveTab] = useState('photos'); // photos, videos
  const [filterYear, setFilterYear] = useState('All');
  const [filterMonth, setFilterMonth] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');
  const [activeVideoUrl, setActiveVideoUrl] = useState(null);

  // Featured Collection is always the first collection (latest)
  const featuredCollection = collections[0];

  // Apply filters to photos
  const filteredPhotos = useMemo(() => {
    return photos.filter((p) => {
      const matchYear = filterYear === 'All' || p.year === filterYear;
      const matchMonth = filterMonth === 'All' || p.month === filterMonth;
      const matchCategory = filterCategory === 'All' || p.category === filterCategory;
      return matchYear && matchMonth && matchCategory;
    });
  }, [filterYear, filterMonth, filterCategory]);

  // Apply filters to videos
  const filteredVideos = useMemo(() => {
    return videos.filter((v) => {
      // Extract year/month from date: "June 14, 2026"
      const matchYear = filterYear === 'All' || v.date.includes(filterYear);
      const matchMonth = filterMonth === 'All' || v.date.includes(filterMonth);
      return matchYear && matchMonth;
    });
  }, [filterYear, filterMonth]);

  // Select collection helper (automatically updates filter settings to target month/year)
  const handleSelectCollection = (month, year) => {
    setFilterMonth(month);
    setFilterYear(year);
    setFilterCategory('All');
    // Scroll to the grids section
    const el = document.getElementById('media-showcase');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SEO
        title="Gallery | Sri Satya Sai Aarogya Pradayini"
        description="View photos and video summaries from our monthly medical camps in Kalwakurthy — restoring sight, diagnostic screening, and free treatments."
      />

      {/* Hero Collage */}
      <GalleryHero />

      {/* Featured Collection Section */}
      {featuredCollection && (
        <section className="section-padding bg-bg border-b border-border">
          <div className="container-max">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="text-center mb-12"
            >
              <span className="badge mb-3">Featured Camp</span>
              <h2 className="section-title">Latest Camp Highlights</h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl border border-border overflow-hidden hover:shadow-card-hover transition-all duration-400 grid grid-cols-1 lg:grid-cols-12 shadow-sm"
            >
              {/* Cover Photo */}
              <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-100 min-h-[300px]">
                <img
                  src={featuredCollection.coverImage}
                  alt={featuredCollection.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-center">
                <span className="text-xs font-bold text-accent font-inter uppercase tracking-wider mb-3 block">
                  {featuredCollection.month} {featuredCollection.year} Camp
                </span>
                <h3 className="font-poppins font-extrabold text-2xl sm:text-3xl text-text-primary leading-tight mb-4">
                  {featuredCollection.title}
                </h3>
                <p className="text-text-secondary font-inter text-base leading-relaxed mb-6">
                  {featuredCollection.description}
                </p>

                {/* Micro Stats */}
                <div className="grid grid-cols-3 gap-4 border-t border-b border-border py-5 mb-8 text-center">
                  <div>
                    <Users2 className="w-5 h-5 text-primary mx-auto mb-1.5" />
                    <span className="block font-poppins font-extrabold text-lg text-text-primary">
                      {featuredCollection.patientsServed}
                    </span>
                    <span className="block text-[10px] font-bold text-text-secondary/70 font-inter uppercase">
                      Served
                    </span>
                  </div>
                  <div className="border-l border-r border-border">
                    <FileImage className="w-5 h-5 text-accent mx-auto mb-1.5" />
                    <span className="block font-poppins font-extrabold text-lg text-text-primary">
                      {featuredCollection.photoCount}
                    </span>
                    <span className="block text-[10px] font-bold text-text-secondary/70 font-inter uppercase">
                      Photos
                    </span>
                  </div>
                  <div>
                    <FileVideo className="w-5 h-5 text-primary mx-auto mb-1.5" />
                    <span className="block font-poppins font-extrabold text-lg text-text-primary">
                      {featuredCollection.videoCount}
                    </span>
                    <span className="block text-[10px] font-bold text-text-secondary/70 font-inter uppercase">
                      Videos
                    </span>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => handleSelectCollection(featuredCollection.month, featuredCollection.year)}
                    className="inline-flex items-center justify-center gap-2 btn-primary px-6 py-3 font-semibold text-sm shadow-md"
                  >
                    Explore Collection
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Monthly Collections Grid */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <span className="badge mb-3">Archives</span>
            <h2 className="section-title">Camp Collections</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((coll) => (
              <CollectionCard
                key={coll.id}
                collection={coll}
                onSelect={handleSelectCollection}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Media Showcase Grid & Filters */}
      <section id="media-showcase" className="section-padding bg-bg scroll-mt-24 border-t border-border">
        <div className="container-max">
          
          {/* Photos vs Videos Tabs */}
          <div className="flex justify-center mb-10">
            <div className="bg-white p-1.5 rounded-2xl border border-border flex shadow-sm">
              <button
                onClick={() => {
                  setActiveTab('photos');
                  setFilterCategory('All');
                }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 font-inter focus:outline-none ${
                  activeTab === 'photos'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-text-secondary hover:text-primary'
                }`}
              >
                <Image className="w-4 h-4" />
                Photos
              </button>
              <button
                onClick={() => {
                  setActiveTab('videos');
                  setFilterCategory('All');
                }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 font-inter focus:outline-none ${
                  activeTab === 'videos'
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-text-secondary hover:text-primary'
                }`}
              >
                <Video className="w-4 h-4" />
                Videos
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Filters Sidebar Panel */}
            <div className="lg:col-span-3 bg-white p-6 rounded-3xl border border-border shadow-sm h-fit">
              <h3 className="font-poppins font-bold text-lg text-text-primary mb-6">
                Filter Archives
              </h3>
              <GalleryFilters
                activeYear={filterYear}
                onYearChange={setFilterYear}
                activeMonth={filterMonth}
                onMonthChange={setFilterMonth}
                activeCategory={activeCategory}
                onCategoryChange={setFilterCategory}
              />

              {/* Clear filters trigger */}
              {(filterYear !== 'All' || filterMonth !== 'All' || filterCategory !== 'All') && (
                <button
                  onClick={() => {
                    setFilterYear('All');
                    setFilterMonth('All');
                    setFilterCategory('All');
                  }}
                  className="mt-6 text-xs font-bold text-accent hover:underline flex items-center gap-1 font-inter focus:outline-none"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            {/* Media Items Area */}
            <div className="lg:col-span-9 min-h-[400px]">
              <AnimatePresence mode="wait">
                {activeTab === 'photos' ? (
                  <div key="photos-tab">
                    {filteredPhotos.length > 0 ? (
                      <PhotoGrid photos={filteredPhotos} />
                    ) : (
                      <div className="bg-white rounded-3xl border border-border p-12 text-center">
                        <p className="text-text-secondary font-inter text-sm max-w-sm mx-auto">
                          No photos matched your criteria. Try widening your filters.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div key="videos-tab">
                    {filteredVideos.length > 0 ? (
                      <VideoGrid videos={filteredVideos} onPlay={setActiveVideoUrl} />
                    ) : (
                      <div className="bg-white rounded-3xl border border-border p-12 text-center">
                        <p className="text-text-secondary font-inter text-sm max-w-sm mx-auto">
                          No videos matched your criteria. Try widening your filters.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Stats counter Section */}
      <StatsSection />

      {/* Call To Action */}
      <section className="section-padding bg-bg border-t border-border">
        <div className="container-max max-w-3xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col items-center"
          >
            <h2 className="section-title mb-4">Join Us in Making Healthcare Accessible</h2>
            <p className="text-text-secondary font-inter text-base max-w-xl mb-8 leading-relaxed">
              Whether you want to offer your medical expertise as a doctor, manage registrations as a volunteer, or fund surgeries as a donor, your support makes a direct impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/volunteer" className="btn-primary px-8 py-3.5 font-semibold text-sm shadow-md">
                Volunteer With Us
              </Link>
              <Link to="/donate" className="inline-flex items-center gap-2 bg-white hover:bg-border text-text-primary font-bold text-sm px-8 py-3.5 rounded-2xl transition-all duration-300 border border-border shadow-sm">
                <Heart className="w-4 h-4 fill-accent text-accent" /> Donate to Cause
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Modal Player */}
      <VideoModal videoUrl={activeVideoUrl} onClose={() => setActiveVideoUrl(null)} />
    </>
  );
}
