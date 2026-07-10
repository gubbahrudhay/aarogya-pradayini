import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { blogs } from '../data/blogs';
import { campReports } from '../data/campReports';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { getYoutubeEmbedUrl } from '../utils/youtube';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Users2,
  MapPin,
  Heart,
  Share2,
  Play,
  CheckCircle,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function BlogDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Combine lists to find by slug
  const savedBlogs = localStorage.getItem('aarogya_blogs');
  const activeBlogs = savedBlogs ? JSON.parse(savedBlogs) : blogs;
  const publicBlogs = activeBlogs.filter(b => b.status === 'published' || b.status === undefined);
  const allItems = [...campReports, ...publicBlogs];
  const itemIndex = allItems.findIndex((x) => x.slug === slug);
  const item = allItems[itemIndex];

  if (!item) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center pt-20">
        <div className="text-center p-8 bg-white border border-border rounded-3xl max-w-md shadow-sm">
          <h2 className="font-poppins font-bold text-2xl text-text-primary mb-3">Article Not Found</h2>
          <p className="text-text-secondary font-inter text-sm mb-6">
            The article you are looking for does not exist or has been moved.
          </p>
          <Link to="/blog" className="btn-primary inline-flex items-center gap-2 px-6 py-2.5">
            <ArrowLeft className="w-4 h-4" /> Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  const isCamp = item.type === 'camp-report';

  // Navigation (Prev & Next)
  const prevItem = itemIndex > 0 ? allItems[itemIndex - 1] : null;
  const nextItem = itemIndex < allItems.length - 1 ? allItems[itemIndex + 1] : null;

  // Get related reports/posts
  const relatedItems = allItems
    .filter((x) => x.id !== item.id && x.type === item.type)
    .slice(0, 2);

  // Share the OG API URL so social media crawlers get proper cover image previews
  // The API page auto-redirects real users to the actual blog page
  const shareUrl = `${window.location.origin}/api/og?slug=${item.slug}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.summary,
        url: shareUrl
      }).catch((err) => console.log(err));
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <>
      <SEO
        title={`${item.title} | Sri Satya Sai Aarogya Pradayini`}
        description={item.summary}
        image={item.coverImage}
      />

      {/* Banner */}
      <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden text-white">
        {/* Blurred background image overlay */}
        <div className="absolute inset-0 opacity-20">
          <img src={item.coverImage} alt="" className="w-full h-full object-cover blur-md scale-105" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-slate-900/60" />

        <div className="relative container-max section-padding py-0 z-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 font-inter text-sm font-semibold mb-6 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blogs
          </Link>

          <div className="max-w-4xl">
            {/* Category/Report Badge */}
            <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold font-inter tracking-wide uppercase mb-4 ${
              isCamp ? 'bg-accent text-white' : 'bg-primary text-white'
            }`}>
              {isCamp ? 'Camp Performance Report' : item.category}
            </span>

            {/* Title */}
            <h1 className="font-poppins font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6">
              {item.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-white/80 font-inter border-t border-white/10 pt-6">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                {isCamp ? item.date : item.publishedDate}
              </span>
              {isCamp ? (
                <>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    Kalwakurthy
                  </span>
                  <span className="flex items-center gap-2 text-green-400 bg-green-500/10 px-3 py-1 rounded-lg">
                    <Users2 className="w-4 h-4" />
                    {item.patientsServed} Patients Served
                  </span>
                </>
              ) : (
                <>
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    By {item.author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    {item.readingTime}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <section className="section-padding bg-bg">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Content Area */}
            <div className="lg:col-span-8 space-y-10 bg-white rounded-3xl border border-border p-6 sm:p-10 shadow-sm">
              {/* Cover Photo */}
              <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-slate-100 shadow-sm border border-border mb-8">
                <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
              </div>

              {/* DYNAMIC RENDERING based on content type */}
              {isCamp ? (
                /* ----------------- CAMP REPORT LAYOUT ----------------- */
                <div className="space-y-10">
                  {/* Camp Summary */}
                  <div>
                    <h2 className="font-poppins font-bold text-2xl text-text-primary mb-4 flex items-center gap-2">
                      <span className="w-2.5 h-6 bg-primary rounded-full" />
                      Camp Summary
                    </h2>
                    <p className="text-text-secondary font-inter text-base leading-relaxed">
                      {item.summary}
                    </p>
                  </div>

                  {/* Patient Statistics Grid */}
                  <div>
                    <h2 className="font-poppins font-bold text-2xl text-text-primary mb-4 flex items-center gap-2">
                      <span className="w-2.5 h-6 bg-accent rounded-full" />
                      Patient Statistics
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {item.stats.map((s, idx) => (
                        <div key={idx} className="bg-bg rounded-2xl p-5 border border-border text-center shadow-sm">
                          <span className="block font-poppins font-extrabold text-2xl text-primary mb-1">
                            {s.value}
                          </span>
                          <span className="block text-xs font-semibold text-text-secondary/90 font-inter">
                            {s.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div>
                    <h2 className="font-poppins font-bold text-2xl text-text-primary mb-4 flex items-center gap-2">
                      <span className="w-2.5 h-6 bg-primary rounded-full" />
                      Key Highlights
                    </h2>
                    <ul className="space-y-3.5">
                      {item.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-text-secondary font-inter text-base">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Doctors List */}
                  <div>
                    <h2 className="font-poppins font-bold text-2xl text-text-primary mb-4 flex items-center gap-2">
                      <span className="w-2.5 h-6 bg-primary rounded-full" />
                      Doctors & Specialists Involved
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {item.doctors.map((doc, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-bg rounded-2xl p-4 border border-border shadow-sm">
                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Stethoscope className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <span className="block font-poppins font-bold text-sm text-text-primary">
                              {doc.name}
                            </span>
                            <span className="block text-xs text-text-secondary font-semibold font-inter">
                              {doc.role}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Video Presentation */}
                  {item.videoUrl && (
                    <div>
                      <h2 className="font-poppins font-bold text-2xl text-text-primary mb-4 flex items-center gap-2">
                        <span className="w-2.5 h-6 bg-accent rounded-full" />
                        Camp Video Highlights
                      </h2>
                      <div className="rounded-2xl overflow-hidden shadow-md border border-border relative aspect-video">
                        <iframe
                          src={getYoutubeEmbedUrl(item.videoUrl)}
                          title="Monthly Camp Highlight Video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full border-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Photo Gallery (react-photo-view lightbox) */}
                  {item.gallery && item.gallery.length > 0 && (
                    <div>
                      <h2 className="font-poppins font-bold text-2xl text-text-primary mb-4 flex items-center gap-2">
                        <span className="w-2.5 h-6 bg-primary rounded-full" />
                        Camp Photo Gallery
                      </h2>
                      <p className="text-xs font-semibold text-text-secondary/70 mb-3 font-inter">
                        * Click on any photo to open the fullscreen view.
                      </p>
                      <PhotoProvider speed={() => 250}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {item.gallery.map((photo, index) => (
                            <PhotoView key={index} src={photo}>
                              <div className="group cursor-zoom-in aspect-square rounded-2xl overflow-hidden border border-border relative">
                                <img
                                  src={photo}
                                  alt={`Camp activity ${index + 1}`}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                              </div>
                            </PhotoView>
                          ))}
                        </div>
                      </PhotoProvider>
                    </div>
                  )}

                  {/* Testimonial Quote */}
                  {item.testimonials && item.testimonials.length > 0 && (
                    <div className="relative overflow-hidden rounded-2xl bg-accent/5 border border-accent/10 p-6 sm:p-8">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl -translate-y-8 translate-x-8" />
                      <h3 className="font-poppins font-extrabold text-primary text-base mb-4">Patient Experience</h3>
                      <blockquote className="space-y-4">
                        <p className="text-text-primary font-inter font-medium text-lg leading-relaxed italic">
                          "{item.testimonials[0].quote}"
                        </p>
                        <cite className="block not-italic font-poppins font-bold text-xs text-text-secondary/90 uppercase tracking-wider">
                          — {item.testimonials[0].author}
                        </cite>
                      </blockquote>
                    </div>
                  )}

                  {/* Closing Message */}
                  <div className="border-t border-border pt-6">
                    <p className="text-text-secondary font-inter text-base leading-relaxed italic">
                      Every medical camp stands as a testament to what love and dedication can achieve in rural healthcare. We offer our deepest gratitude to the specialized doctors, our selfless volunteers, and the local Sevadal of Kalwakurthy.
                    </p>
                  </div>
                </div>
              ) : (
                /* ----------------- HEALTH AWARENESS LAYOUT ----------------- */
                <div className="space-y-6">
                  {item.content.map((block, idx) => {
                    if (block.type === 'heading') {
                      return (
                        <h2 key={idx} className="font-poppins font-bold text-2xl text-text-primary mt-8 mb-4 flex items-center gap-2">
                          <span className="w-2.5 h-6 bg-primary rounded-full" />
                          {block.text}
                        </h2>
                      );
                    }
                    return (
                      <p key={idx} className="text-text-secondary font-inter text-base leading-relaxed mb-4">
                        {block.text}
                      </p>
                    );
                  })}
                </div>
              )}

              {/* Share & Support Widget */}
              <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 items-center justify-between">
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold text-sm px-6 py-3 rounded-2xl transition-all duration-300 font-poppins"
                >
                  <Share2 className="w-4 h-4" /> Share Article
                </button>
                <Link
                  to="/donate"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold text-sm px-6 py-3 rounded-2xl transition-all duration-300 shadow-md font-poppins"
                >
                  <Heart className="w-4 h-4 fill-current text-white" /> Support Our Camps
                </Link>
              </div>

              {/* Prev & Next navigation controls */}
              <div className="mt-8 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevItem ? (
                  <Link
                    to={`/blog/${prevItem.slug}`}
                    className="flex flex-col p-5 rounded-2xl border border-border bg-bg/40 hover:bg-bg transition-colors duration-300 text-left group"
                  >
                    <span className="text-[10px] font-bold text-accent font-inter uppercase tracking-wider flex items-center gap-1 mb-1">
                      <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                      Previous
                    </span>
                    <span className="font-poppins font-bold text-sm text-text-primary group-hover:text-primary transition-colors leading-snug line-clamp-1">
                      {prevItem.title}
                    </span>
                  </Link>
                ) : (
                  <div className="hidden sm:block" />
                )}

                {nextItem && (
                  <Link
                    to={`/blog/${nextItem.slug}`}
                    className="flex flex-col p-5 rounded-2xl border border-border bg-bg/40 hover:bg-bg transition-colors duration-300 text-right group"
                  >
                    <span className="text-[10px] font-bold text-primary font-inter uppercase tracking-wider flex items-center justify-end gap-1 mb-1">
                      Next
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                    <span className="font-poppins font-bold text-sm text-text-primary group-hover:text-primary transition-colors leading-snug line-clamp-1">
                      {nextItem.title}
                    </span>
                  </Link>
                )}
              </div>
            </div>

            {/* Right Related Column */}
            <div className="lg:col-span-4 space-y-8">
              {/* Related posts card widget */}
              <div className="bg-white rounded-3xl border border-border p-6 shadow-sm">
                <h3 className="font-poppins font-bold text-lg text-text-primary mb-6 flex items-center gap-2">
                  <span className="w-2 h-4 bg-primary rounded-sm" />
                  Related {isCamp ? 'Camp Reports' : 'Articles'}
                </h3>
                <div className="space-y-6">
                  {relatedItems.map((rel) => (
                    <div key={rel.id} className="group">
                      <div className="rounded-xl overflow-hidden aspect-[16/10] bg-slate-100 border border-border mb-3">
                        <img
                          src={rel.coverImage}
                          alt={rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <span className="text-[10px] font-bold text-accent font-inter block mb-1">
                        {isCamp ? rel.date : rel.publishedDate}
                      </span>
                      <Link
                        to={`/blog/${rel.slug}`}
                        className="font-poppins font-bold text-sm text-text-primary hover:text-primary transition-colors leading-snug line-clamp-2"
                      >
                        {rel.title}
                      </Link>
                      <Link
                        to={`/blog/${rel.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-primary mt-2 hover:underline"
                      >
                        Read Now <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Info Box */}
              <div className="bg-gradient-to-br from-primary to-blue-800 text-white rounded-3xl p-6 shadow-md border border-primary/20">
                <h3 className="font-poppins font-bold text-lg mb-3">Attend Our Camps</h3>
                <p className="text-white/80 font-inter text-xs leading-relaxed mb-4">
                  Sri Satya Sai Aarogya Pradayini hosts checkups and surgery screenings every second Sunday of the month in Kalwakurthy. All consultations, diagnostics, and medicines are completely free.
                </p>
                <Link
                  to="/monthly-camp"
                  className="inline-flex items-center gap-1 bg-white text-primary font-bold text-xs px-4 py-2 rounded-xl hover:bg-accent hover:text-white transition-all shadow-sm"
                >
                  View Schedule
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
