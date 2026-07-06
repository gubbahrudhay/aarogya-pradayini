import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Services from '../sections/Services';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="Services | Sri Satya Sai Aarogya Pradayini"
        description="Explore our comprehensive free healthcare services including cardiology, eye screening, cataract surgery, blood sugar testing, and more — all 100% free."
      />
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-primary text-white">
        <div className="container-max section-padding py-0">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }} className="max-w-3xl">
            <motion.span variants={fadeUp} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full font-inter mb-6">
              Our Services
            </motion.span>
            <motion.h1 variants={fadeUp} transition={{ duration: 0.6 }} className="section-title text-white mb-6">
              World-Class Care,<br />Zero Cost to You
            </motion.h1>
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="text-white/80 font-inter text-xl leading-relaxed">
              Our team of specialist doctors volunteers their expertise to provide comprehensive
              healthcare across multiple disciplines — completely free, every month.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Services />

      {/* FAQ */}
      <section className="section-padding bg-white">
        <div className="container-max max-w-3xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="section-title mb-4">Frequently Asked <span className="gradient-text">Questions</span></motion.h2>
          </motion.div>
          <div className="space-y-4">
            {[
              { q: 'Do I need to book an appointment?', a: 'No. Simply walk in on camp day. Our volunteers will guide you through registration on the spot.' },
              { q: 'Is there any charge for any service?', a: 'Absolutely not. Every consultation, screening, medicine, and surgery is 100% free of cost.' },
              { q: 'Who can attend the camp?', a: 'Everyone is welcome — regardless of age, gender, caste, religion, or financial status.' },
              { q: 'What should I bring to the camp?', a: 'Just yourself! If you have previous medical records or prescriptions, do bring them along for reference.' },
              { q: 'Are cataract surgeries performed at the camp itself?', a: 'Cataract screenings are done at the camp. Surgeries are scheduled separately at a partnered facility — still free.' },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className="bg-bg rounded-2xl p-6 border border-border"
              >
                <h3 className="font-poppins font-semibold text-text-primary mb-2">{faq.q}</h3>
                <p className="text-text-secondary font-inter text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
