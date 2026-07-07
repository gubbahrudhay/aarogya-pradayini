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

      {/* Camp Event Calendar Section */}
      <section className="section-padding bg-white border-b border-border">
        <div className="container-max">
          <div className="text-center mb-12">
            <span className="badge mb-3">Schedule</span>
            <h2 className="section-title">Camp Event Calendar</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Our free medical camps are held strictly on the second Sunday of every month. Check upcoming dates below.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Calendar Widget */}
            <div className="lg:col-span-7 bg-bg/50 border border-border rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-poppins font-bold text-base text-text-primary">
                    Camp Scheduler (July 2026)
                  </h3>
                  <span className="bg-primary/5 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-inter border border-primary/10">
                    2nd Sunday Highlighted
                  </span>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold font-inter mb-4">
                  {/* Days of week */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <span key={d} className="text-text-secondary/60 py-2">
                      {d}
                    </span>
                  ))}

                  {/* Empty slots for July 2026 (Starts on Wednesday = 3 slots offset) */}
                  {[...Array(3)].map((_, i) => (
                    <span key={`empty-${i}`} className="py-2.5 opacity-0">
                      -
                    </span>
                  ))}

                  {/* Days of month */}
                  {[...Array(31)].map((_, i) => {
                    const day = i + 1;
                    const isSecondSunday = day === 12; // July 12 is the 2nd Sunday in 2026
                    return (
                      <div
                        key={day}
                        className={`relative py-3 rounded-xl transition-all duration-300 font-bold ${
                          isSecondSunday
                            ? 'bg-accent text-white shadow-md shadow-accent/20 scale-110'
                            : 'text-text-primary bg-white border border-border/40 hover:border-primary/30'
                        }`}
                      >
                        {day}
                        {isSecondSunday && (
                          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="text-[10px] font-semibold text-text-secondary/50 font-inter text-center mt-4">
                * Calendar calculations auto-computed based on Nagarkurnool Sevadal schedules.
              </div>
            </div>

            {/* Camp Details Column */}
            <div className="lg:col-span-5 bg-white border border-border rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-primary/5 rounded-full blur-3xl -z-10" />
              <div>
                <span className="text-[10px] font-bold text-accent uppercase tracking-wider block mb-1">
                  Next Scheduled Camp
                </span>
                <h3 className="font-poppins font-extrabold text-2xl text-text-primary mb-6">
                  July Medical Camp
                </h3>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold text-text-secondary/60 uppercase tracking-wider font-inter">Date</p>
                      <p className="text-xs font-bold text-text-primary">Sunday, July 12, 2026</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold text-text-secondary/60 uppercase tracking-wider font-inter">Timings</p>
                      <p className="text-xs font-bold text-text-primary">10:00 AM - 2:00 PM</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[10px] font-bold text-text-secondary/60 uppercase tracking-wider font-inter">Venue</p>
                      <p className="text-xs font-bold text-text-primary">Sri Sathya Sai Mandir, Kalwakurthy</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border mt-6 pt-5">
                  <p className="text-[10px] font-bold text-text-secondary/60 uppercase tracking-wider font-inter mb-2">Specialists Scheduled</p>
                  <div className="flex flex-wrap gap-1.5">
                    {['General Medicine', 'Cardiology', 'Ophthalmology (Eye)', 'Pediatrics'].map((spec) => (
                      <span key={spec} className="bg-bg text-text-primary text-[9px] font-bold px-2 py-1 rounded-md border border-border/50 font-inter">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-border pt-4">
                <a
                  href="/volunteer"
                  className="w-full flex items-center justify-center bg-primary hover:bg-primary/95 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 text-xs font-poppins shadow-xs active:scale-[0.98]"
                >
                  Join as Volunteer for this Camp
                </a>
              </div>
            </div>
          </div>
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
              { step: 'Step 6', event: 'Medicine Distribution', desc: 'Prescribed medicines are distributed. Patients referred for follow-up as needed.' },
              { step: 'Step 7', event: 'Free Nutritious Meals', desc: 'Fresh, warm food is served to all patients and their accompanying families post-consultation.' },
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
