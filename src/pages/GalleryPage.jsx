import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { galleryImages } from '../data/gallery';
import { ZoomIn } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function GalleryPage() {
  return (
    <>
      <SEO
        title="Gallery | Sri Satya Sai Aarogya Pradayini"
        description="Photos from our free monthly medical camps in Kalwakurthy — screenings, surgeries, consultations, and community service."
      />
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-primary text-white">
        <div className="container-max section-padding py-0">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }} className="max-w-2xl">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full font-inter mb-6">
              Gallery
            </motion.span>
            <motion.h1 variants={fadeUp} className="section-title text-white mb-4">
              Moments of <span className="text-accent">Service</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/80 font-inter text-lg">
              Every photo tells a story of hope, healing, and community care.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-bg">
        <div className="container-max">
          <PhotoProvider speed={() => 250}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {galleryImages.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group cursor-pointer overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-400"
                >
                  <PhotoView src={img.src}>
                    <div className="relative overflow-hidden">
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-72 object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/50 transition-colors duration-400 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2 text-white">
                          <ZoomIn className="w-10 h-10" />
                          <span className="font-inter text-sm font-semibold">{img.category}</span>
                        </div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold px-3 py-1 rounded-full font-inter">
                          {img.category}
                        </span>
                      </div>
                    </div>
                  </PhotoView>
                  <div className="p-4 bg-white">
                    <p className="text-text-secondary text-sm font-inter">{img.alt}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </PhotoProvider>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-14 text-center bg-white rounded-3xl p-10 border border-border"
          >
            <p className="text-text-secondary font-inter text-lg mb-2">Have photos from our camps?</p>
            <p className="text-text-primary font-poppins font-semibold text-xl mb-6">
              Share your memories with us and help grow our gallery.
            </p>
            <a href="mailto:srisatyasaiaarogyapradayini@gmail.com" className="btn-primary inline-flex">
              Submit Your Photos
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
