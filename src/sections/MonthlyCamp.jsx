import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ClipboardList, Stethoscope, Pill, CheckCircle, Utensils } from 'lucide-react';

const steps = [
  {
    icon: Calendar,
    title: 'Every 2nd Sunday',
    desc: 'Held consistently on the second Sunday of every month without fail — rain or shine.',
    color: 'bg-blue-500',
    num: '01',
  },
  {
    icon: MapPin,
    title: 'Kalwakurthy Venue',
    desc: 'Centrally located in Kalwakurthy, Nagarkurnool District, Telangana — easily accessible by foot, auto, or bus.',
    color: 'bg-orange-500',
    num: '02',
  },
  {
    icon: Users,
    title: 'Open to Everyone',
    desc: 'No appointment, no ID, no caste or religion restrictions. Every person is welcome — truly for all.',
    color: 'bg-green-500',
    num: '03',
  },
  {
    icon: ClipboardList,
    title: 'Free Registration',
    desc: 'Simply walk in on camp day. Our volunteers will register you and guide you to the right specialist.',
    color: 'bg-purple-500',
    num: '04',
  },
  {
    icon: Stethoscope,
    title: 'Specialist Consultation',
    desc: 'Meet experienced doctors across multiple specialities — General Medicine, Cardiology, Ophthalmology, and more.',
    color: 'bg-teal-500',
    num: '05',
  },
  {
    icon: Pill,
    title: 'Free Medicines',
    desc: 'Prescribed medicines are provided on the spot at no cost, ensuring patients can start treatment immediately.',
    color: 'bg-red-500',
    num: '06',
  },
  {
    icon: Utensils,
    title: 'Free Food Serving',
    desc: 'A warm, healthy meal is provided to all patients and their families after they complete their medical check up.',
    color: 'bg-amber-500',
    num: '07',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function MonthlyCamp() {
  return (
    <section id="monthly-camp" className="section-padding bg-white">
      <div className="container-max">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="badge mb-4"
          >
            Monthly Medical Camp
          </motion.span>
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title mb-4"
          >
            How the Camp{' '}
            <span className="gradient-text">Works</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-subtitle max-w-2xl mx-auto"
          >
            Six simple steps from arrival to care — no paperwork, no payments, no barriers.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line — desktop */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent opacity-30" />

          <div className="space-y-12">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.num}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={fadeUp}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className={`flex items-center gap-8 ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex-col lg:flex-row`}
                >
                  {/* Card */}
                  <div className={`flex-1 ${isLeft ? 'lg:text-right' : 'lg:text-left'} text-left`}>
                    <div
                      className={`inline-block bg-white rounded-2xl p-7 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border hover:border-primary/15 max-w-md ${
                        isLeft ? 'lg:ml-auto' : 'lg:mr-auto'
                      } w-full`}
                    >
                      <div className={`flex items-center gap-3 mb-4 ${isLeft ? 'lg:flex-row-reverse' : ''}`}>
                        <div className={`w-10 h-10 ${step.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-4xl font-poppins font-black text-border">{step.num}</span>
                      </div>
                      <h3 className="font-poppins font-bold text-xl text-text-primary mb-2">{step.title}</h3>
                      <p className="text-text-secondary text-sm font-inter leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden lg:flex w-8 h-8 rounded-full bg-white border-4 border-primary shadow-md flex-shrink-0 z-10 items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>

                  {/* Spacer */}
                  <div className="flex-1 hidden lg:block" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          transition={{ duration: 0.7 }}
          className="mt-20 bg-gradient-primary rounded-3xl p-10 text-center text-white"
        >
          <h3 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
            Ready to Attend or Volunteer?
          </h3>
          <p className="text-white/80 font-inter text-lg mb-8 max-w-xl mx-auto">
            Join us at the next camp. Walk in as a patient, or sign up as a volunteer.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/monthly-camp" className="btn-primary">
              View Camp Details
            </a>
            <a href="/volunteer" className="btn-outline-white">
              Volunteer Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
