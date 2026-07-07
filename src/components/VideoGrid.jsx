import { motion } from 'framer-motion';
import { Play, Calendar, Clock } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function VideoGrid({ videos, onPlay }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((vid) => (
        <motion.div
          key={vid.id}
          variants={fadeUp}
          className="group bg-white rounded-3xl border border-border overflow-hidden hover:shadow-card-hover transition-all duration-400 flex flex-col h-full"
        >
          {/* Thumbnail & Play Overlay */}
          <div
            onClick={() => onPlay(vid.videoUrl)}
            className="relative aspect-[16/9] overflow-hidden bg-slate-100 cursor-pointer"
          >
            <img
              src={vid.thumbnail}
              alt={vid.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />
            {/* Dark glassmorphic backdrop for play */}
            <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/50 transition-colors duration-300 flex items-center justify-center">
              <div className="w-14 h-14 bg-white/95 text-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <Play className="w-6 h-6 fill-current ml-1" />
              </div>
            </div>

            {/* Duration Badge */}
            <span className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-sm text-white font-semibold text-xs font-inter px-2 py-1 rounded-md flex items-center gap-1 shadow-sm">
              <Clock className="w-3.5 h-3.5" />
              {vid.duration}
            </span>
          </div>

          {/* Details */}
          <div className="p-6 flex flex-col flex-1">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary/70 font-inter mb-2">
              <Calendar className="w-3.5 h-3.5 text-accent" />
              {vid.date}
            </span>
            <h4
              onClick={() => onPlay(vid.videoUrl)}
              className="font-poppins font-bold text-base text-text-primary group-hover:text-primary transition-colors duration-300 leading-snug mb-2 cursor-pointer line-clamp-1"
            >
              {vid.title}
            </h4>
            <p className="text-text-secondary font-inter text-xs leading-relaxed line-clamp-2 mt-auto">
              {vid.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
