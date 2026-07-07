import { useState } from 'react';
import { motion } from 'framer-motion';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { photos } from '../data/gallery';
import { Link } from 'react-router-dom';
import { ArrowRight, ZoomIn } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Gallery() {
  return (
    <section id="gallery" className="section-padding bg-bg">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp} transition={{ duration: 0.5 }} className="badge mb-4">
            Gallery
          </motion.span>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="section-title mb-4">
            Moments of{' '}
            <span className="gradient-text">Care & Service</span>
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.2 }} className="section-subtitle max-w-xl mx-auto">
            A glimpse into the impact we create, one camp at a time.
          </motion.p>
        </motion.div>

        {/* Masonry Grid */}
        <PhotoProvider
          speed={() => 250}
          easing={(type) =>
            type === 2
              ? 'cubic-bezier(0.36, 0, 0.66, -0.56)'
              : 'cubic-bezier(0.34, 1.56, 0.64, 1)'
          }
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {photos.slice(0, 6).map((img, i) => (
              <motion.div
                key={img.id}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className={`relative group cursor-pointer overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-400 ${
                  i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
                } ${i === 3 ? 'lg:col-span-2' : ''}`}
              >
                <PhotoView src={img.src}>
                  <div className="relative overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-64 object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/50 transition-colors duration-400 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2 text-white">
                        <ZoomIn className="w-8 h-8" />
                        <span className="font-inter text-sm font-semibold">{img.category}</span>
                      </div>
                    </div>
                    {/* Category tag */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold px-3 py-1 rounded-full font-inter">
                        {img.category}
                      </span>
                    </div>
                  </div>
                </PhotoView>
              </motion.div>
            ))}
          </motion.div>
        </PhotoProvider>

        {/* View All Button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 btn-primary"
          >
            View Full Gallery
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
