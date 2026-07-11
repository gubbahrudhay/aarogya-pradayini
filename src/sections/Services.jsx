import { motion } from 'framer-motion';
import { services } from '../data/services';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Services() {
  return (
    <section id="services" className="section-padding bg-bg">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="text-center mb-16"
        >
          <motion.span variants={fadeUp} transition={{ duration: 0.5 }} className="badge mb-4">
            What We Offer
          </motion.span>
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="section-title mb-4">
            Comprehensive{' '}
            <span className="gradient-text">Free Healthcare</span>
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="section-subtitle max-w-2xl mx-auto">
            From general consultations to specialized surgeries — our expert medical team delivers
            world-class care at zero cost to every patient.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-default border border-border hover:border-transparent relative overflow-hidden"
              >
                {/* Glow on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`}
                />

                {/* Icon */}
                <div className={`w-14 h-14 ${service.lightColor} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${service.iconColor}`} />
                </div>

                {/* Content */}
                <h3 className="font-poppins font-semibold text-text-primary text-lg mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-text-secondary text-sm font-inter leading-relaxed">
                  {service.description}
                </p>

                {/* Free badge */}
                <div className="mt-5">
                  <span className="text-xs font-semibold text-success bg-green-50 px-3 py-1 rounded-full font-inter">
                    ✓ 100% Free
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
