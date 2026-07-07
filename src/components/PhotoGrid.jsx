import { motion, AnimatePresence } from 'framer-motion';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.3 } }
};

export default function PhotoGrid({ photos }) {
  return (
    <PhotoProvider speed={() => 260}>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
        <AnimatePresence mode="popLayout">
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              layout
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="break-inside-avoid group bg-white rounded-3xl border border-border overflow-hidden hover:shadow-card-hover transition-all duration-400 cursor-zoom-in"
            >
              <PhotoView src={photo.src}>
                <div className="relative overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-accent font-bold text-[10px] font-inter uppercase tracking-wider mb-1.5">
                      {photo.category}
                    </span>
                    <h4 className="font-poppins font-bold text-white text-base leading-snug">
                      {photo.alt}
                    </h4>
                    <span className="text-white/70 font-inter text-xs mt-1">
                      {photo.month} {photo.year} Camp
                    </span>
                  </div>
                </div>
              </PhotoView>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </PhotoProvider>
  );
}
