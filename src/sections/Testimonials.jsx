import { motion } from 'framer-motion';
import { testimonials } from '../data/testimonials';
import { Quote, Star } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-white">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp} transition={{ duration: 0.5 }} className="badge mb-4">
            Patient Stories
          </motion.span>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="section-title mb-4">
            Lives{' '}
            <span className="gradient-text">Transformed</span>
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.2 }} className="section-subtitle max-w-xl mx-auto">
            Hear from the people whose lives have been changed by our free medical camps.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="group bg-bg hover:bg-white rounded-2xl p-8 border border-border hover:border-primary/20 hover:shadow-medium transition-all duration-400 relative overflow-hidden"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <Quote className="w-16 h-16 text-primary" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-text-primary font-inter text-base leading-relaxed mb-6 italic relative z-10">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-poppins font-bold text-sm">{t.avatar}</span>
                </div>
                <div>
                  <p className="font-poppins font-semibold text-text-primary">{t.name}</p>
                  <p className="text-text-secondary text-sm font-inter">
                    {t.location} · Age {t.age}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="text-xs bg-blue-50 text-primary font-semibold px-3 py-1 rounded-full font-inter">
                    {t.service}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
