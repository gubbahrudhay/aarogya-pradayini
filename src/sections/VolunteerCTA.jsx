import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Stethoscope, Clock, HeartHandshake, Globe } from 'lucide-react';

const perks = [
  { icon: Stethoscope, label: 'Work with expert doctors' },
  { icon: Clock, label: 'Flexible time commitment' },
  { icon: HeartHandshake, label: 'Make real community impact' },
  { icon: Globe, label: 'Join a purpose-driven team' },
];

export default function VolunteerCTA() {
  return (
    <section id="volunteer" className="section-padding bg-bg">
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden bg-gradient-to-br from-accent via-orange-500 to-warm rounded-3xl p-12 md:p-16 text-white text-center"
        >
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full font-inter mb-6">
              🙌 Join Our Mission
            </span>
            <h2 className="font-poppins font-bold text-4xl md:text-5xl lg:text-6xl mb-4 text-shadow">
              Be the Change.
              <br />
              Volunteer Today.
            </h2>
            <p className="text-white/85 font-inter text-xl md:text-2xl max-w-2xl mx-auto mb-10">
              Whether you're a doctor, nurse, student, or just passionate about helping — there's a
              place for you at our monthly camps.
            </p>

            {/* Perks */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {perks.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-inter px-4 py-2.5 rounded-xl"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/volunteer"
                id="volunteer-cta-btn"
                className="flex items-center gap-2 bg-white text-accent hover:bg-white/90 font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 font-poppins"
              >
                Sign Up to Volunteer
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold text-lg px-8 py-4 rounded-2xl transition-all duration-300 font-inter"
              >
                Ask Us a Question
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
