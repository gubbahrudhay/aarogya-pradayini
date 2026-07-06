import { motion } from 'framer-motion';
import { CheckCircle, Target, Globe, Lightbulb } from 'lucide-react';
import aboutIllustration from '../assets/images/about_illustration.png';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    desc: 'To provide quality healthcare to underserved communities through free monthly medical camps in Kalwakurthy.',
    color: 'text-primary',
    bg: 'bg-blue-50',
  },
  {
    icon: Globe,
    title: 'Love All, Serve All',
    desc: 'Inspired by the teachings of Sri Satya Sai Baba — we serve every person equally, with love and compassion.',
    color: 'text-accent',
    bg: 'bg-orange-50',
  },
  {
    icon: Lightbulb,
    title: 'Why We Exist',
    desc: 'Millions in rural Telangana lack access to specialist healthcare. We bridge this gap, one camp at a time.',
    color: 'text-success',
    bg: 'bg-green-50',
  },
];

export default function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-strong">
              <img
                src={aboutIllustration}
                alt="Doctor examining patient's eyes at free medical camp"
                className="w-full h-full object-cover"
              />
              {/* Floating card */}
              <div className="absolute bottom-6 left-6 right-6 glass-dark rounded-2xl p-5">
                <p className="text-accent font-poppins font-semibold text-sm mb-1">Our Promise</p>
                <p className="text-white font-poppins font-bold text-xl">"100% Free. Always."</p>
                <p className="text-white/70 text-sm font-inter mt-1">
                  Every service, every consultation, every surgery.
                </p>
              </div>
            </div>
            {/* Decorative blob */}
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-60 -z-10" />
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-orange-100 rounded-full blur-3xl opacity-60 -z-10" />
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
              <span className="badge mb-4">About Us</span>
              <h2 className="section-title mb-6">
                Healthcare as a{' '}
                <span className="gradient-text">Human Right</span>
              </h2>
              <p className="section-subtitle mb-8">
                Sri Satya Sai Aarogya Pradayini was founded on a simple but powerful belief — that
                quality medical care should never be a privilege. Every month, we bring specialist
                doctors to Kalwakurthy to serve the community freely.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid sm:grid-cols-1 gap-5 mb-8"
            >
              {values.map((v) => (
                <motion.div
                  key={v.title}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="flex items-start gap-4 p-5 rounded-2xl border border-border hover:border-primary/20 hover:shadow-soft transition-all duration-300"
                >
                  <div className={`w-11 h-11 ${v.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <v.icon className={`w-5 h-5 ${v.color}`} />
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-text-primary mb-1">{v.title}</h3>
                    <p className="text-text-secondary text-sm font-inter">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="flex flex-wrap gap-6">
              {[
                { label: 'Patients / Month', value: '500+' },
                { label: 'Total Camps Done', value: '50+' },
                { label: 'Cost to Patient', value: '₹0' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-poppins font-bold text-3xl text-primary">{stat.value}</p>
                  <p className="text-text-secondary text-sm font-inter">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
