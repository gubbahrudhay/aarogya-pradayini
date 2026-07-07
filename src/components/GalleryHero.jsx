import { motion } from 'framer-motion';
import imgTeam from '../assets/images/camp_team_group.jpeg';
import imgQueue from '../assets/images/camp_registration_queue.jpeg';
import imgConsultation from '../assets/images/camp_consultation_hall.jpeg';
import imgEye from '../assets/images/camp_eye_screening.jpeg';

export default function GalleryHero() {
  const images = [imgTeam, imgQueue, imgConsultation, imgEye];

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white">
      {/* Background Photo Collage Grid */}
      <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 gap-1 opacity-20">
        {images.map((img, i) => (
          <div key={i} className="h-full w-full overflow-hidden">
            <img src={img} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      
      {/* Blue overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-blue-900/90 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-80" />

      {/* Hero Content */}
      <div className="relative z-10 container-max section-padding py-16 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <span className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-4 py-2 rounded-full font-inter mb-6 uppercase tracking-wider">
            📸 Gallery
          </span>
          <h1 className="font-poppins font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
            Moments of Care.<br />
            <span className="text-accent">Stories of Hope.</span>
          </h1>
          <p className="text-white/85 font-inter text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl">
            Explore photographs and videos from our monthly free medical camps serving the people of Kalwakurthy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
