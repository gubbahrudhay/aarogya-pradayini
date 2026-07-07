import { useState } from 'react';
import { Settings as SettingsIcon, Link2, Link2Off, RefreshCw, Key, ShieldCheck, CheckCircle } from 'lucide-react';

export default function Settings() {
  const [successMsg, setSuccessMsg] = useState('');
  const [linkedinConnected, setLinkedinConnected] = useState(true);
  const [instagramConnected, setInstagramConnected] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);

  const handleReconnect = (channel) => {
    setReconnecting(true);
    setSuccessMsg('');
    setTimeout(() => {
      if (channel === 'linkedin') {
        setLinkedinConnected(true);
      } else {
        setInstagramConnected(true);
      }
      setReconnecting(false);
      setSuccessMsg(`Successfully authenticated and re-linked ${channel.toUpperCase()} credentials!`);
    }, 1200);
  };

  const handleDisconnect = (channel) => {
    if (channel === 'linkedin') {
      setLinkedinConnected(false);
    } else {
      setInstagramConnected(false);
    }
    setSuccessMsg(`Disconnected ${channel.toUpperCase()} channel sync.`);
  };

  return (
    <div className="space-y-8 font-inter">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <h1 className="font-poppins font-extrabold text-2xl text-text-primary mb-1 flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-primary" />
          System Settings
        </h1>
        <p className="text-xs text-text-secondary">
          Configure API connection endpoints, environment secrets status logs, and social media syndications.
        </p>
      </div>

      {successMsg && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-100 text-green-700 px-4 py-3.5 rounded-2xl">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-xs font-semibold leading-none">{successMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Connected Social Media Channels */}
        <div className="lg:col-span-7 bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="font-poppins font-bold text-base text-text-primary flex items-center gap-2">
            <Link2 className="w-5 h-5 text-primary" />
            Connected Accounts
          </h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            Link the official NGO profiles to syndicate drafted Monthly Camp reports onto LinkedIn and Instagram with a single click.
          </p>

          <div className="space-y-4">
            {/* LinkedIn Account Row */}
            <div className="border border-border rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="block font-poppins font-bold text-sm text-text-primary">
                  LinkedIn Profile
                </span>
                <span className="block text-[10px] text-text-secondary/70 font-medium font-inter mt-0.5">
                  Scope: w_member_social • Status:{' '}
                  <strong className={linkedinConnected ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>
                    {linkedinConnected ? 'Connected' : 'Disconnected'}
                  </strong>
                </span>
              </div>
              <div className="flex gap-2">
                {linkedinConnected ? (
                  <>
                    <button
                      onClick={() => handleReconnect('linkedin')}
                      disabled={reconnecting}
                      className="inline-flex items-center gap-1 bg-white hover:bg-bg text-text-secondary border border-border px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-300"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${reconnecting ? 'animate-spin' : ''}`} />
                      Renew API
                    </button>
                    <button
                      onClick={() => handleDisconnect('linkedin')}
                      className="inline-flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-300"
                    >
                      <Link2Off className="w-3.5 h-3.5" />
                      Disconnect
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleReconnect('linkedin')}
                    disabled={reconnecting}
                    className="inline-flex items-center gap-1 bg-primary hover:bg-primary/95 text-white px-4 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-300"
                  >
                    <Link2 className="w-3.5 h-3.5" />
                    Link LinkedIn Account
                  </button>
                )}
              </div>
            </div>

            {/* Instagram Account Row */}
            <div className="border border-border rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="block font-poppins font-bold text-sm text-text-primary">
                  Instagram (Meta Graph API)
                </span>
                <span className="block text-[10px] text-text-secondary/70 font-medium font-inter mt-0.5">
                  Scope: instagram_basic, instagram_content_publish • Status:{' '}
                  <strong className={instagramConnected ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>
                    {instagramConnected ? 'Connected' : 'Disconnected'}
                  </strong>
                </span>
              </div>
              <div className="flex gap-2">
                {instagramConnected ? (
                  <>
                    <button
                      onClick={() => handleReconnect('instagram')}
                      disabled={reconnecting}
                      className="inline-flex items-center gap-1 bg-white hover:bg-bg text-text-secondary border border-border px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-300"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${reconnecting ? 'animate-spin' : ''}`} />
                      Renew API
                    </button>
                    <button
                      onClick={() => handleDisconnect('instagram')}
                      className="inline-flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-300"
                    >
                      <Link2Off className="w-3.5 h-3.5" />
                      Disconnect
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleReconnect('instagram')}
                    disabled={reconnecting}
                    className="inline-flex items-center gap-1 bg-primary hover:bg-primary/95 text-white px-4 py-1.5 rounded-xl text-xs font-semibold transition-colors duration-300"
                  >
                    <Link2 className="w-3.5 h-3.5" />
                    Link Instagram Account
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Environment Variable Secrets Validation status */}
        <div className="lg:col-span-5 bg-white border border-border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="font-poppins font-bold text-base text-text-primary flex items-center gap-2">
            <Key className="w-5 h-5 text-accent" />
            Environment Secrets
          </h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            Status of environment credentials loaded by Vite (Frontend) or Server Functions.
          </p>

          <div className="space-y-3 font-mono text-[10px] text-text-secondary">
            {[
              { name: 'VITE_FIREBASE_API_KEY', configured: !!import.meta.env.VITE_FIREBASE_API_KEY },
              { name: 'VITE_FIREBASE_AUTH_DOMAIN', configured: !!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN },
              { name: 'VITE_FIREBASE_PROJECT_ID', configured: !!import.meta.env.VITE_FIREBASE_PROJECT_ID },
              { name: 'OPENAI_API_KEY', configured: false, note: 'Vercel Server-Side Only' },
              { name: 'GITHUB_TOKEN', configured: false, note: 'Vercel Server-Side Only' }
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
    </div>
  );
}
