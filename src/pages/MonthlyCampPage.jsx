import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import MonthlyCamp from '../sections/MonthlyCamp';
import { Calendar, MapPin, Clock, Phone } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function MonthlyCampPage() {
  return (
    <>
      <SEO
        title="Monthly Medical Camp | Sri Satya Sai Aarogya Pradayini"
        description="Free monthly medical camp in Kalwakurthy. Open to everyone — no registration, no charges. Specialist doctors, screenings, and free medicines every month."
      />
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-primary text-white">
        <div className="container-max section-padding py-0">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }} className="max-w-3xl">
            <motion.span variants={fadeUp} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full font-inter mb-6">
              Monthly Camp
            </motion.span>
            <motion.h1 variants={fadeUp} transition={{ duration: 0.6 }} className="section-title text-white mb-6">
              Every 2nd Sunday. Every Person.<br />Free Healthcare.
            </motion.h1>
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="text-white/80 font-inter text-xl leading-relaxed mb-10">
              Our monthly camps are the heart of our mission — bringing specialist care directly to
              the people of Kalwakurthy.
            </motion.p>

            {/* Quick Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Calendar, label: 'Frequency', value: 'Every 2nd Sunday' },
                { icon: MapPin, label: 'Location', value: 'Kalwakurthy (2hr from Hyd)' },
                { icon: Phone, label: 'Info', value: '+91 94925 02927' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="glass rounded-2xl p-4 text-center">
                  <Icon className="w-5 h-5 text-accent mx-auto mb-2" />
                  <p className="text-white/60 text-xs font-inter">{label}</p>
                  <p className="text-white font-poppins font-semibold text-sm">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <MonthlyCamp />

      {/* What to Expect */}
      <section className="section-padding bg-bg">
        <div className="container-max max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="section-title mb-4">What to <span className="gradient-text">Expect</span></motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle">A typical day at the camp — organized, caring, and efficient.</motion.p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { step: 'Step 1', event: 'Registration & Token Distribution', desc: 'Arrive early for smooth registration. Tokens are given for different specialities.' },
              { step: 'Step 2', event: 'Vital Signs Check', desc: 'Blood pressure, temperature, and pulse are recorded by our nursing team.' },
              { step: 'Step 3', event: 'Specialist Consultations Begin', desc: 'Doctors across specialities begin seeing patients in organized stations.' },
              { step: 'Step 4', event: 'Blood Sugar & Lab Tests', desc: 'Lab tests including blood sugar are conducted and results shared immediately.' },
              { step: 'Step 5', event: 'Eye Screening & Cataract Check', desc: 'Ophthalmologists conduct detailed vision testing and cataract screenings.' },
              { step: 'Step 6', event: 'Medicine Distribution & Wrap-up', desc: 'Prescribed medicines are distributed. Patients referred for follow-up as needed.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-white rounded-2xl p-6 border border-border flex gap-4"
              >
                <div className="flex-shrink-0">
                  <span className="text-primary font-poppins font-bold text-sm bg-blue-50 px-3 py-1 rounded-xl block text-center whitespace-nowrap">{item.step}</span>
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-text-primary mb-1">{item.event}</h3>
                  <p className="text-text-secondary text-sm font-inter">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
