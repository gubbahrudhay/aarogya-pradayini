import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1200);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-blue-800 text-white p-8 sm:p-12 shadow-xl border border-primary/20">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-12 translate-x-12" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full blur-2xl translate-y-12 -translate-x-12" />

      <div className="relative max-w-2xl mx-auto text-center flex flex-col items-center">
        <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
          <Mail className="w-7 h-7 text-accent" />
        </div>

        <h3 className="font-poppins font-bold text-2xl sm:text-3xl mb-3 tracking-tight">
          Stay Updated on Our Work
        </h3>
        <p className="text-white/85 font-inter text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
          Subscribe to our newsletter to receive monthly camp reports, health checkup notices, and health awareness articles directly in your inbox.
        </p>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4"
            >
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="font-inter text-sm font-semibold text-white">
                Thank you! You have successfully subscribed to updates.
              </span>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-md flex flex-col sm:flex-row gap-3"
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  disabled={status === 'loading'}
                  className="w-full pl-5 pr-5 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all duration-300 font-inter text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold font-poppins text-sm px-6 py-3.5 rounded-2xl transition-all duration-300 shadow-md active:scale-[0.98] disabled:opacity-60 flex-shrink-0"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
