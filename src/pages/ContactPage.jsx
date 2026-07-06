import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import SEO from '../components/SEO';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function ContactPage() {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful }, reset } = useForm();

  const onSubmit = (data) => {
    const subject = encodeURIComponent(`Message from ${data.name} - ${data.subject}`);
    const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\n\nMessage:\n${data.message}`);
    window.location.href = `mailto:srisatyasaiaarogyapradayini@gmail.com?subject=${subject}&body=${body}`;
    reset();
  };

  return (
    <>
      <SEO
        title="Contact Us | Sri Satya Sai Aarogya Pradayini"
        description="Get in touch with Sri Satya Sai Aarogya Pradayini. Contact us for camp information, volunteer queries, or donation help."
      />
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-primary text-white">
        <div className="container-max section-padding py-0">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }} className="max-w-2xl">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full font-inter mb-6">
              📬 Contact
            </motion.span>
            <motion.h1 variants={fadeUp} className="section-title text-white mb-6">
              Get In Touch
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/80 font-inter text-xl">
              Questions about the camp? Want to volunteer or donate? We'd love to hear from you.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-bg">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-14">
            {/* Left — Info */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
              <motion.h2 variants={fadeUp} className="section-title mb-6">
                We're Here <span className="gradient-text">For You</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-text-secondary font-inter text-lg mb-8">
                Reach out through any channel below. We typically respond within 24 hours.
              </motion.p>

              <div className="space-y-5 mb-10">
                {[
                  { icon: MapPin, title: 'Address', lines: ['Kalwakurthy, Nagarkurnool District', 'Telangana – 509 324, India'] },
                  { icon: Phone, title: 'Phone', lines: ['+91 94925 02927', 'Mon–Sat, 9 AM – 6 PM'] },
                  { icon: Mail, title: 'Email', lines: ['srisatyasaiaarogyapradayini@gmail.com', 'We reply within 24 hours'] },
                  { icon: Clock, title: 'Camp Hours', lines: ['Every 2nd Sunday, 9 AM – 12 PM', 'Kalwakurthy central location'] },
                ].map(({ icon: Icon, title, lines }) => (
                  <motion.div key={title} variants={fadeUp} className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-border">
                    <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-poppins font-semibold text-text-primary mb-1">{title}</p>
                      {lines.map((l) => <p key={l} className="text-text-secondary text-sm font-inter">{l}</p>)}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map */}
              <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden border border-border shadow-card">
                <iframe
                  title="Kalwakurthy Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30476.72258938284!2d78.4833!3d16.9137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcca7b2b9c62c7d%3A0x4e9f2b3a8d7e1f2!2sKalwakurthy%2C%20Telangana!5e0!3m2!1sen!2sin!4v1699999999"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
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
              <h3 className="font-poppins font-bold text-2xl text-text-primary mb-2">Send a Message</h3>
              <p className="text-text-secondary font-inter text-sm mb-8">Fill in your details and we'll get back to you.</p>

              {isSubmitSuccessful ? (
                <div className="text-center py-10">
                  <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                  <h4 className="font-poppins font-bold text-xl text-text-primary mb-2">Message Sent!</h4>
                  <p className="text-text-secondary font-inter">Thank you for reaching out. We'll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2 font-inter">Full Name *</label>
                      <input
                        {...register('name', { required: 'Required' })}
                        id="contact-name"
                        placeholder="Your name"
                        className={`w-full border rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition ${errors.name ? 'border-red-400' : 'border-border'}`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-text-primary mb-2 font-inter">Phone</label>
                      <input
                        {...register('phone')}
                        id="contact-phone"
                        placeholder="+91 94925 02927"
                        className="w-full border border-border rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2 font-inter">Email Address *</label>
                    <input
                      {...register('email', { required: 'Required', pattern: { value: /^\S+@\S+$/, message: 'Invalid email' } })}
                      id="contact-email"
                      type="email"
                      placeholder="your@email.com"
                      className={`w-full border rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition ${errors.email ? 'border-red-400' : 'border-border'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2 font-inter">Subject *</label>
                    <select
                      {...register('subject', { required: 'Required' })}
                      id="contact-subject"
                      className={`w-full border rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition bg-white ${errors.subject ? 'border-red-400' : 'border-border'}`}
                    >
                      <option value="">Select a subject</option>
                      <option value="Camp Info">Camp Information</option>
                      <option value="Volunteer">Volunteering</option>
                      <option value="Donation">Donation Query</option>
                      <option value="Media">Media / Press</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2 font-inter">Message *</label>
                    <textarea
                      {...register('message', { required: 'Please enter a message' })}
                      id="contact-message"
                      rows={5}
                      placeholder="How can we help you?"
                      className={`w-full border rounded-xl px-4 py-3 font-inter text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition resize-none ${errors.message ? 'border-red-400' : 'border-border'}`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                  </div>
                  <button type="submit" id="contact-submit-btn" className="btn-primary w-full justify-center">
                    Send Message
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
