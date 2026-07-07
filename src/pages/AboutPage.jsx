import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import About from '../sections/About';
import Impact from '../sections/Impact';
import { Heart, Target, Users, Award } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const team = [
  { name: 'Dr. Chaitanya Kuppaganthu', initials: 'CK', color: 'from-purple-500 to-purple-700', role: 'Medical Specialist' },
  { name: 'Dr. Chandrakanth Chithanuri', initials: 'CC', color: 'from-red-500 to-red-700', role: 'Medical Specialist' },
  { name: 'Dr. Chandrika Gubba', initials: 'CG', color: 'from-green-500 to-green-700', role: 'Medical Specialist' },
  { name: 'Dr. Harikanth Reddy', initials: 'HR', color: 'from-indigo-500 to-indigo-700', role: 'Medical Specialist' },
  { name: 'Dr. Harish', initials: 'DH', color: 'from-pink-500 to-pink-700', role: 'Medical Specialist' },
  { name: 'Dr. Hima Kumari', initials: 'HK', color: 'from-amber-500 to-amber-700', role: 'Medical Specialist' },
  { name: 'Dr. K. Sateesh Kumar', initials: 'KS', color: 'from-emerald-500 to-emerald-700', role: 'Medical Specialist' },
  { name: 'Dr. Kavitha', initials: 'DK', color: 'from-cyan-500 to-cyan-700', role: 'Medical Specialist' },
  { name: 'Dr. Kranthi', initials: 'DK', color: 'from-sky-500 to-sky-700', role: 'Medical Specialist' },
  { name: 'Dr. Krishna Veeramalla', initials: 'KV', color: 'from-violet-500 to-violet-700', role: 'Medical Specialist' },
  { name: 'Dr. Maharshi', initials: 'DM', color: 'from-rose-500 to-rose-700', role: 'Medical Specialist' },
  { name: 'Dr. Manoj Kumar', initials: 'MK', color: 'from-fuchsia-500 to-fuchsia-700', role: 'Medical Specialist' },
  { name: 'Dr. Mounika', initials: 'DM', color: 'from-blue-600 to-blue-800', role: 'Medical Specialist' },
  { name: 'Dr. Navaneetha', initials: 'DN', color: 'from-orange-600 to-orange-800', role: 'Medical Specialist' },
  { name: 'Dr. Naveen', initials: 'DN', color: 'from-red-600 to-red-800', role: 'Medical Specialist' },
  { name: 'Dr. Poojitha', initials: 'DP', color: 'from-teal-600 to-teal-800', role: 'Medical Specialist' },
  { name: 'Dr. Pravalika Gubba', initials: 'PG', color: 'from-green-600 to-green-800', role: 'Medical Specialist' },
  { name: 'Dr. Pravalika Reddy', initials: 'PR', color: 'from-indigo-600 to-indigo-800', role: 'Medical Specialist' },
  { name: 'Dr. Pullayya', initials: 'DP', color: 'from-pink-600 to-pink-800', role: 'Medical Specialist' },
  { name: 'Dr. Raghuveer Machiraju', initials: 'RM', color: 'from-amber-600 to-amber-800', role: 'Medical Specialist' },
  { name: 'Dr. Rahul', initials: 'DR', color: 'from-emerald-600 to-emerald-800', role: 'Medical Specialist' },
  { name: 'Dr. Rajesh Gubba', initials: 'RG', color: 'from-cyan-600 to-cyan-800', role: 'Medical Specialist' },
  { name: 'Dr. Rakesh', initials: 'DR', color: 'from-sky-600 to-sky-800', role: 'Medical Specialist' },
  { name: 'Dr. Ram Das', initials: 'RD', color: 'from-violet-600 to-violet-800', role: 'Medical Specialist' },
  { name: 'Dr. Ramya Sree Gubba', initials: 'RG', color: 'from-rose-600 to-rose-800', role: 'Medical Specialist' },
  { name: 'Dr. Ravi Shankar', initials: 'RS', color: 'from-fuchsia-600 to-fuchsia-800', role: 'Medical Specialist' },
  { name: 'Dr. Roja Sree Gaddam', initials: 'RG', color: 'from-blue-500 to-blue-700', role: 'Medical Specialist' },
  { name: 'Dr. Sagar', initials: 'DS', color: 'from-orange-500 to-orange-700', role: 'Medical Specialist' },
  { name: 'Dr. Sai Charan Gubba', initials: 'SG', color: 'from-red-500 to-red-700', role: 'Medical Specialist' },
  { name: 'Dr. Sai Shree Gubba', initials: 'SG', color: 'from-teal-500 to-teal-700', role: 'Medical Specialist' },
  { name: 'Dr. Sharath Chandra', initials: 'SC', color: 'from-purple-500 to-purple-700', role: 'Medical Specialist' },
  { name: 'Dr. Shushma Chithanuri', initials: 'SC', color: 'from-green-500 to-green-700', role: 'Medical Specialist' },
  { name: 'Dr. Sindhu', initials: 'DS', color: 'from-indigo-500 to-indigo-700', role: 'Medical Specialist' },
  { name: 'Dr. Srinivas Dusa', initials: 'SD', color: 'from-pink-500 to-pink-700', role: 'Medical Specialist' },
  { name: 'Dr. Srinu', initials: 'DS', color: 'from-amber-500 to-amber-700', role: 'Medical Specialist' },
  { name: 'Dr. Sridhar (Eye Specialist)', initials: 'DS', color: 'from-emerald-500 to-emerald-700', role: 'Eye Specialist' },
  { name: 'Dr. Sowmya', initials: 'DS', color: 'from-cyan-500 to-cyan-700', role: 'Medical Specialist' },
  { name: 'Dr. Supraja', initials: 'DS', color: 'from-sky-500 to-sky-700', role: 'Medical Specialist' },
  { name: 'Dr. Swamy', initials: 'DS', color: 'from-violet-500 to-violet-700', role: 'Medical Specialist' },
  { name: 'Dr. Venkat Swamy Veeramalla', initials: 'VV', color: 'from-rose-500 to-rose-700', role: 'Medical Specialist' },
  { name: 'Dr. Vidya Sagar', initials: 'VS', color: 'from-fuchsia-500 to-fuchsia-700', role: 'Medical Specialist' },
  { name: 'Dr. Vijay Kumar', initials: 'VK', color: 'from-blue-600 to-blue-800', role: 'Medical Specialist' },
  { name: 'Dr. Vijay Kumar', initials: 'VK', color: 'from-orange-600 to-orange-800', role: 'Medical Specialist' },
  { name: 'Dr. Vinay', initials: 'DV', color: 'from-red-600 to-red-800', role: 'Medical Specialist' },
  { name: 'Dr. Yashwanth Raani', initials: 'YR', color: 'from-teal-600 to-teal-800', role: 'Medical Specialist' },
];

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us | Sri Satya Sai Aarogya Pradayini"
        description="Learn about our mission to provide free healthcare to the people of Kalwakurthy through monthly medical camps, inspired by Love All Serve All."
      />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-primary text-white">
        <div className="container-max section-padding py-0">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            className="max-w-3xl"
          >
            <motion.span variants={fadeUp} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full font-inter mb-6">
              About Us
            </motion.span>
            <motion.h1 variants={fadeUp} transition={{ duration: 0.6 }} className="section-title text-white mb-6">
              Rooted in Service,<br />Driven by Compassion
            </motion.h1>
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="text-white/80 font-inter text-xl leading-relaxed">
              Sri Satya Sai Aarogya Pradayini was born out of a vision to bring world-class
              healthcare to every doorstep in Kalwakurthy — completely free of charge.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* About Section reused */}
      <About />

      {/* Our Story */}
      <section className="section-padding bg-bg">
        <div className="container-max">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            >
              <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="section-title mb-6">
                Our <span className="gradient-text">Story</span>
              </motion.h2>
              <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="space-y-6 text-text-secondary font-inter text-lg text-left">
                <p>
                  Founded in the spirit of Sri Satya Sai Baba's timeless teaching — <em className="text-primary font-semibold">"Love All, Serve All"</em> — our organization set out with a simple mission: to ensure that no person in Kalwakurthy ever had to suffer due to lack of access to quality medical care.
                </p>
                <p>
                  What started as a small initiative by a group of dedicated doctors and volunteers has grown into a thriving monthly institution. Every camp brings together specialist physicians, trained nurses, and passionate volunteers to serve hundreds of patients in a single day.
                </p>
                <p>
                  We believe that healthcare is not a privilege of the wealthy — it is a fundamental human right. Every person who walks into our camp, regardless of their background, receives the same quality of care with the same warmth and dignity.
                </p>
                <p>
                  Our work continues to expand. Free cataract surgeries have restored sight to dozens of patients. Blood sugar and blood pressure screenings have caught life-threatening conditions early. And every month, the community of Kalwakurthy gathers in trust and hope.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="text-center mb-14"
          >
            <motion.span variants={fadeUp} className="badge mb-4">Our Doctors</motion.span>
            <motion.h2 variants={fadeUp} className="section-title mb-4">
              The Experts Behind <span className="gradient-text">Every Camp</span>
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.08, duration: 0.4 }}
                className="card p-8 text-center"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center mx-auto mb-5`}>
                  <span className="text-white font-poppins font-bold text-2xl">{member.initials}</span>
                </div>
                <h3 className="font-poppins font-semibold text-text-primary mb-1">{member.name}</h3>
                <p className="text-text-secondary text-sm font-inter">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Impact />
    </>
  );
}
