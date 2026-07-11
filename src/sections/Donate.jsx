import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Stethoscope, Eye, Pill, HeartHandshake, ArrowRight } from 'lucide-react';

const usages = [
  {
    icon: Pill,
    title: 'Free Medicines',
    desc: 'Procuring essential medicines distributed free to all patients at every camp.',
    percent: 80,
    color: 'bg-green-500',
  },
  {
    icon: Stethoscope,
    title: 'Medical Equipment',
    desc: 'ECG machines, blood sugar monitors, and surgical tools.',
    percent: 10,
    color: 'bg-blue-500',
  },
  {
    icon: Eye,
    title: 'Cataract Surgeries',
    desc: 'Covering surgical costs, consumables, and post-op medicines for free cataract operations.',
    percent: 10,
    color: 'bg-accent',
  },
,
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function Donate() {
  return (
    <section id="donate" className="section-padding bg-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.span variants={fadeUp} transition={{ duration: 0.5 }} className="badge mb-4">
              Support Us
            </motion.span>
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="section-title mb-4"
            >
              Your Donation{' '}
              <span className="gradient-text">Saves Lives</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="section-subtitle mb-8"
            >
              100% of your donation goes directly to patient care. We are a fully transparent
              non-profit organization dedicated to serving the community of Kalwakurthy.
            </motion.p>

            {/* Fund Usage */}
            <motion.div variants={stagger} className="space-y-5">
              {usages.map((u) => {
                const Icon = u.icon;
                return (
                  <motion.div
                    key={u.title}
                    variants={fadeUp}
                    transition={{ duration: 0.5 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <h3 className="font-poppins font-semibold text-text-primary text-sm">{u.title}</h3>
                        <span className="text-primary font-bold text-sm font-inter">{u.percent}%</span>
                      </div>
                      <div className="h-1.5 bg-border rounded-full overflow-hidden mb-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${u.percent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className={`h-full ${u.color} rounded-full`}
                        />
                      </div>
                      <p className="text-text-secondary text-xs font-inter">{u.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right — Donate card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="bg-bg rounded-3xl p-10 border border-border"
          >
            <h3 className="font-poppins font-bold text-2xl text-text-primary mb-2">
              Donate to the Cause
            </h3>
            <p className="text-text-secondary font-inter text-sm mb-8">
              Every rupee you donate helps provide free healthcare to someone who needs it most.
            </p>

            {/* Bank Details */}
            {/* <div className="bg-white rounded-2xl p-6 border border-border mb-6">
              <p className="font-poppins font-semibold text-text-primary mb-4">Bank Transfer</p>
              <div className="space-y-3 text-sm font-inter">
                {[
                  ['Account Name', 'Sri Satya Sai Aarogya Pradayini'],
                  ['Bank', 'State Bank of India'],
                  ['Account No.', '1234 5678 9012'],
                  ['IFSC Code', 'SBIN0012345'],
                  ['Branch', 'Kalwakurthy'],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4">
                    <span className="text-text-secondary">{label}:</span>
                    <span className="font-semibold text-text-primary text-right">{value}</span>
                  </div>
                ))}
              </div>
            </div> */}

            {/* <p className="text-center text-text-secondary text-sm font-inter mb-6">
              After donating, please{' '}
              <Link to="/contact" className="text-primary font-semibold hover:underline">
                contact us
              </Link>{' '}
              with your receipt for acknowledgment.
            </p> */}

            <a
              href="mailto:srisatyasaiaarogyapradayini@gmail.com?subject=Donation%20Inquiry%20-%20Aarogya%20Pradayini"
              id="donate-section-btn"
              className="flex items-center justify-center gap-2 btn-primary w-full text-center"
            >
              Learn More About Donating
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
