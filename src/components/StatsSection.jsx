import { motion } from 'framer-motion';
import { Users, Calendar, Image, Video } from 'lucide-react';

const stats = [
  { icon: Users, value: '10,000+', label: 'Patients Served', color: 'text-primary', bg: 'bg-blue-50' },
  { icon: Calendar, value: '36+', label: 'Medical Camps Completed', color: 'text-accent', bg: 'bg-orange-50' },
  { icon: Image, value: '500+', label: 'Camp Photos Archived', color: 'text-primary', bg: 'bg-blue-50' },
  { icon: Video, value: '120+', label: 'Video Documentaries', color: 'text-accent', bg: 'bg-orange-50' }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export default function StatsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="bg-bg rounded-3xl p-6 sm:p-8 border border-border text-center shadow-sm hover:shadow-card-hover transition-all duration-300"
              >
                <div className={`w-14 h-14 ${s.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-7 h-7 ${s.color}`} />
                </div>
                <span className="block font-poppins font-extrabold text-3xl sm:text-4xl text-text-primary mb-2">
                  {s.value}
                </span>
                <span className="block text-xs sm:text-sm font-semibold text-text-secondary/80 font-inter">
                  {s.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
