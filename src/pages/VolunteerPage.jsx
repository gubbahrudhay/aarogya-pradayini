import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import SEO from '../components/SEO';
import { CheckCircle, Stethoscope, Clock, HeartHandshake, Users } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const roles = [
  { label: 'Medical Doctor', icon: Stethoscope },
  { label: 'Nurse / Paramedic', icon: HeartHandshake },
  { label: 'Medical Student', icon: Users },
  { label: 'General Volunteer', icon: Clock },
];

export default function VolunteerPage() {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm();

  const onSubmit = (data) => {
    const subject = encodeURIComponent(`Volunteer Registration - ${data.name}`);
    const body = encodeURIComponent(`Sri Satya Sai Aarogya Pradayini Volunteer Application:

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Role: ${data.role}

About the Volunteer:
${data.message || 'N/A'}`);
    window.location.href = `mailto:srisatyasaiaarogyapradayini@gmail.com?subject=${subject}&body=${body}`;
    reset();
  };

  return (
    <>
      <SEO
        title="Volunteer | Sri Satya Sai Aarogya Pradayini"
        description="Join our team of volunteers and make a real difference. Doctors, nurses, students, and general helpers are welcome at our monthly medical camps."
      />
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-accent via-orange-500 to-warm text-white">
        <div className="container-max section-padding py-0">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }} className="max-w-3xl">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full font-inter mb-6">
              🙌 Volunteer
            </motion.span>
            <motion.h1 variants={fadeUp} className="section-title text-white mb-6">
              Join Our Mission.<br />Change Lives.
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/85 font-inter text-xl leading-relaxed">
              Whether you're a medical professional or a compassionate individual, there's a meaningful
              role for you at our monthly camps.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-bg">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — Info */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
              <motion.h2 variants={fadeUp} className="section-title mb-6">
                Volunteer <span className="gradient-text">Opportunities</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-text-secondary font-inter text-lg mb-8">
                We welcome volunteers from all backgrounds. Here are the roles available at every camp:
              </motion.p>
              <div className="grid grid-cols-2 gap-4 mb-10">
                {roles.map(({ label, icon: Icon }) => (
                  <motion.div key={label} variants={fadeUp} className="bg-white rounded-2xl p-5 border border-border flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="font-poppins font-semibold text-text-primary text-sm">{label}</span>
                  </motion.div>
                ))}
              </div>

              {/* Benefits */}
              <motion.div variants={fadeUp} className="bg-white rounded-2xl p-7 border border-border">
                <h3 className="font-poppins font-bold text-text-primary mb-5 text-lg">Why Volunteer With Us?</h3>
                <ul className="space-y-3">
                  {[
                    'Work alongside expert specialist doctors',
                    'Make measurable community impact every month',
                    'Gain hands-on healthcare experience',
                    'Be part of a warm, purpose-driven team',
                    'Volunteer certificate provided',
                    'Flexible commitment — even one camp helps',
                  ].map((b) => (
                    <li key={b} className="flex items-center gap-3 text-text-secondary font-inter text-sm">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Location & Travel Details */}
              <motion.div variants={fadeUp} className="bg-white rounded-2xl p-7 border border-border mt-6">
                <h3 className="font-poppins font-bold text-text-primary mb-3 text-lg">Camp Location & Travel</h3>
                <p className="text-text-secondary font-inter text-sm leading-relaxed mb-4">
                  camps are held at Kalwakurthy. It is easily accessible for volunteers traveling from major centers:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3 text-text-secondary font-inter text-sm">
                    <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                    <span><strong>~2 hours</strong> travel time from <strong>Hyderabad</strong></span>
                  </li>
                  <li className="flex items-center gap-3 text-text-secondary font-inter text-sm">
                    <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                    <span><strong>~2 hours</strong> travel time from <strong>Nagarkurnool District Center</strong></span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-3xl p-10 shadow-medium border border-border"
            >
              <h3 className="font-poppins font-bold text-2xl text-text-primary mb-2">Sign Up to Volunteer</h3>
              <p className="text-text-secondary font-inter text-sm mb-8">Fill in your details and we'll get in touch before the next camp.</p>

              {isSubmitSuccessful ? (
                <div className="text-center py-10">
                  <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                  <h4 className="font-poppins font-bold text-xl text-text-primary mb-2">Thank You!</h4>
                  <p className="text-text-secondary font-inter">We've received your application. We'll contact you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2 font-inter">Full Name *</label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      id="volunteer-name"
                      placeholder="Your full name"
                      className={`w-full border rounded-xl px-4 py-3 font-inter text-sm text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition ${errors.name ? 'border-red-400' : 'border-border'}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2 font-inter">Email Address *</label>
                    <input
                      {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } })}
                      id="volunteer-email"
                      type="email"
                      placeholder="your@email.com"
                      className={`w-full border rounded-xl px-4 py-3 font-inter text-sm text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition ${errors.email ? 'border-red-400' : 'border-border'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2 font-inter">Phone Number *</label>
                    <input
                      {...register('phone', { required: 'Phone is required' })}
                      id="volunteer-phone"
                      placeholder="+91 94925 02927"
                      className={`w-full border rounded-xl px-4 py-3 font-inter text-sm text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition ${errors.phone ? 'border-red-400' : 'border-border'}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  {/* Role */}
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2 font-inter">Your Role *</label>
                    <select
                      {...register('role', { required: 'Please select a role' })}
                      id="volunteer-role"
                      className={`w-full border rounded-xl px-4 py-3 font-inter text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition bg-white ${errors.role ? 'border-red-400' : 'border-border'}`}
                    >
                      <option value="">Select your role</option>
                      <option value="doctor">Medical Doctor</option>
                      <option value="nurse">Nurse / Paramedic</option>
                      <option value="student">Medical Student</option>
                      <option value="general">General Volunteer</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
                  </div>
                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2 font-inter">About You</label>
                    <textarea
                      {...register('message')}
                      id="volunteer-message"
                      rows={3}
                      placeholder="Tell us about your background and motivation..."
                      className="w-full border border-border rounded-xl px-4 py-3 font-inter text-sm text-text-primary placeholder-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    id="volunteer-submit-btn"
                    className="btn-primary w-full justify-center"
                  >
                    Submit Application
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
