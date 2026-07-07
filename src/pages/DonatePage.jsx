import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Donate from '../sections/Donate';
import { Heart, Shield, FileText, Users } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function DonatePage() {
  return (
    <>
      <SEO
        title="Donate | Sri Satya Sai Aarogya Pradayini"
        description="Support free healthcare for Kalwakurthy. Your donation funds medical equipment, cataract surgeries, medicines, and monthly camp operations."
      />
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-primary text-white">
        <div className="container-max section-padding py-0">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }} className="max-w-3xl">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full font-inter mb-6">
              ❤️ Donate
            </motion.span>
            <motion.h1 variants={fadeUp} className="section-title text-white mb-6">
              Every Rupee<br />Restores a Life
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/80 font-inter text-xl leading-relaxed">
              Your contribution directly funds free consultations, life-saving surgeries, and essential
              medicines for the people of Kalwakurthy.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Donate />

      {/* Trust section */}
      <section className="section-padding bg-bg">
        <div className="container-max">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'Trusted & Transparent',
                desc: 'We publish full financial reports. Every rupee is accounted for.',
                action: { label: 'View Financial Report', href: 'https://docs.google.com/spreadsheets/d/1EbkL-2bzJ_vJjtToTV5E_oKdbQrmTVpDqhpWYPF-DpI/edit?usp=sharing' }
              },
              { icon: FileText, title: 'Tax Exemption', desc: 'Donations may be eligible for tax benefits under Section 80G (consult your CA).' },
              { icon: Heart, title: '100% To Patients', desc: 'No administrative fees deducted. Every donation reaches patients directly.' },
            ].map(({ icon: Icon, title, desc, action }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-7 border border-border text-center flex flex-col justify-between items-center"
              >
                <div>
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-poppins font-semibold text-text-primary mb-2">{title}</h3>
                  <p className="text-text-secondary font-inter text-sm leading-relaxed">{desc}</p>
                </div>
                {action && (
                  <div className="mt-4 w-full">
                    <a
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-primary/10 hover:bg-primary text-primary hover:text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all duration-300 font-inter w-full"
                    >
                      {action.label}
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
