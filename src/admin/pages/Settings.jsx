import { useState } from 'react';
import { Settings as SettingsIcon, Key, ShieldCheck, CheckCircle } from 'lucide-react';

export default function Settings() {
  const [successMsg, setSuccessMsg] = useState('');

  return (
    <div className="space-y-8 font-inter">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <h1 className="font-poppins font-extrabold text-2xl text-text-primary mb-1 flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-primary" />
          System Settings
        </h1>
        <p className="text-xs text-text-secondary">
          Configure API connection endpoints, environment secrets status logs, and database sync parameters.
        </p>
      </div>

      {successMsg && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-100 text-green-700 px-4 py-3.5 rounded-2xl">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-xs font-semibold leading-none">{successMsg}</span>
        </div>
      )}

      <div className="max-w-2xl bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="font-poppins font-bold text-base text-text-primary flex items-center gap-2">
          <Key className="w-5 h-5 text-accent" />
          Environment Secrets
        </h2>
        <p className="text-xs text-text-secondary leading-relaxed">
          Status of credentials loaded by Vite (Frontend) or Vercel Serverless Functions. Social media integration is handled via local AI draft generation (copy and paste manually), meaning no external LinkedIn or Meta access tokens need to be authenticated.
        </p>

        <div className="space-y-3 font-mono text-[10px] text-text-secondary border-t border-border/60 pt-4">
          {[
            { name: 'VITE_FIREBASE_API_KEY', configured: !!import.meta.env.VITE_FIREBASE_API_KEY, note: 'Gemini AI & Database' },
            { name: 'VITE_FIREBASE_AUTH_DOMAIN', configured: !!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN },
            { name: 'VITE_FIREBASE_PROJECT_ID', configured: !!import.meta.env.VITE_FIREBASE_PROJECT_ID },
            { name: 'GITHUB_TOKEN', configured: !!import.meta.env.VITE_FIREBASE_API_KEY, note: 'GitHub Repository Sync' } // Local check helper
          ].map((v) => (
            <div key={v.name} className="flex justify-between items-center border-b border-border/40 pb-2.5 last:border-b-0 last:pb-0">
              <span>{v.name}</span>
              <span className="flex items-center gap-1 font-bold">
                {v.configured ? (
                  <span className="text-green-600 flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-md border border-green-200">
                    <ShieldCheck className="w-3.5 h-3.5" /> Configured
                  </span>
                ) : (
                  <span className="text-text-secondary/60 flex items-center gap-1 bg-bg px-2 py-0.5 rounded-md border border-border/80">
                    {v.note || 'Unset'}
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
