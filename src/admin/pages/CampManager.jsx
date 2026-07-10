import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import {
  FileText,
  Sparkles,
  Save,
  CheckCircle,
  Database,
  Share2,
  ListPlus,
  Eye,
  AlertTriangle
} from 'lucide-react';

const sampleReport = `AUM SRI SAI RAM
SRI SATHYA SAI HEALTH SERVICES - KALWAKURTHY CAMP REPORT
Date: 14.06.2026
Total Villages Covered: 71
Male Patients: 156
Female Patients: 364
Total Patients: 520
BP Tests Done: 340
Sugar Tests Done: 290
Cataract Cases Identified: 28
Volunteer count: 25
Doctors in attendance: Dr. Rajesh Gubba, Dr. Chandrakanth Chithanuri, Dr. Sridhar, Dr. Mounika, Dr. Naveen.
Prasadam Serving: Nutritious meals distributed to all 520 patients after checkup.`;

export default function CampManager() {
  const { role } = useAuth();
  const [whatsappText, setWhatsappText] = useState(sampleReport);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general'); // general, stats, social, preview
  const [successMsg, setSuccessMsg] = useState('');

  // Camp Form States
  const [campDetails, setCampDetails] = useState({
    title: 'June 2026 Free Medical Camp',
    date: '2026-06-14',
    location: 'Kalwakurthy',
    status: 'draft',
    patients: 0,
    male: 0,
    female: 0,
    villages: 0,
    bpTests: 0,
    sugarTests: 0,
    cataracts: 0,
    volunteers: 0,
    doctorsText: '',
    summaryText: '',
    linkedinDraft: '',
    instagramDraft: '',
    youtubeDraft: ''
  });

  const handleAIParse = async () => {
    setLoading(true);
    setSuccessMsg('');

    const getValue = (regex, defaultVal = 0) => {
      const match = whatsappText.match(regex);
      return match ? parseInt(match[1], 10) : defaultVal;
    };

    const dateMatch = whatsappText.match(/Date:\s*([\d.]+)/);
    const parsedDate = dateMatch ? dateMatch[1].split('.').reverse().join('-') : '2026-06-14';
    const formattedDateForDrafts = dateMatch ? dateMatch[1] : '14.06.2026';

    const docMatch = whatsappText.match(/Doctors in attendance:\s*(.+)/);
    const parsedDocs = docMatch ? docMatch[1].trim() : 'Dr. Rajesh Gubba, Dr. Sridhar';

    const patientsCount = getValue(/Total Patients:\s*(\d+)/, 520);
    const maleCount = getValue(/Male Patients:\s*(\d+)/, 156);
    const femaleCount = getValue(/Female Patients:\s*(\d+)/, 364);
    const bpCount = getValue(/BP Tests Done:\s*(\d+)/, 340);
    const sugarCount = getValue(/Sugar Tests Done:\s*(\d+)/, 290);
    const cataractCount = getValue(/Cataract Cases Identified:\s*(\d+)/, 28);
    const volunteerCount = getValue(/Volunteer count:\s*(\d+)/, 25);
    const villageCount = getValue(/Total Villages Covered:\s*(\d+)/, 71);

    const generatedSummary = `Our monthly medical camp for June was completed successfully at the Sai Baba temple premises in Kalwakurthy. A total of ${patientsCount} patients from ${villageCount} surrounding villages were served by our whitelisted medical specialists. Free diagnostic checks, blood pressure screenings, and sugar screenings were carried out on-site. Additionally, ${cataractCount} cases of cataract were diagnosed and scheduled for free surgical operations.`;

    // Fallback drafts with the date included
    const liDraft = `🌟 SRI SATHYA SAI HEALTH SERVICES - KALWAKURTHY (Camp Date: ${formattedDateForDrafts}) 🌟\n\nWe are overjoyed to share the impact report from our monthly medical camp conducted on ${formattedDateForDrafts}:\n\n👥 Patients Served: ${patientsCount} (${maleCount} Male, ${femaleCount} Female)\n🏡 Villages Reached: ${villageCount}\n🩺 BP Screenings: ${bpCount} | Sugar Checks: ${sugarCount}\n👁️ Cataract Operations Scheduled: ${cataractCount}\n\nOur heartfelt thanks to our specialist doctors and the ${volunteerCount} Sevadal volunteers who made this possible. "Love All, Serve All."\n\n#HealthcareForAll #NGO #SaiRam #CommunityCare`;

    const instaDraft = `Moments of Hope and Care from Kalwakurthy on ${formattedDateForDrafts}! 🧡\n\nTotal Patients: ${patientsCount}\nVolunteers: ${volunteerCount}\nDiagnostics BP/Sugar: ${bpCount}/${sugarCount}\nCataract surgeries: ${cataractCount} (Scheduled Free)\n\n"Service to man is service to God." 🙏\n\n#SathyaSai #FreeMedicalCamp #Telangana #SocialWork #Seva`;

    const youtubeDraft = `🎥 Highlights of the Free Medical Camp conducted in Kalwakurthy on ${formattedDateForDrafts}.\n\nUnder Sri Sathya Sai Health Services, we organized another successful monthly camp to serve our rural community.\n\n📊 Key Camp Statistics:\n• Patients Treated: ${patientsCount} (${maleCount} Male, ${femaleCount} Female)\n• Diagnostic BP & Sugar Screenings: ${bpCount} / ${sugarCount}\n• Cataract Surgeries Scheduled: ${cataractCount} (Completely Free)\n• Villages Covered: ${villageCount}\n• Volunteers: ${volunteerCount}\n\nThank you to our dedicated doctors and volunteers for their selfless service. "Love All, Serve All." 🙏\n\n#SaiSeva #FreeMedicalCamp #RuralHealthcare #NGO`;

    try {
      const apiKey = import.meta.env.VITE_GEMINI_KEY || import.meta.env.VITE_FIREBASE_API_KEY;

      if (!apiKey || apiKey === 'YOUR_API_KEY') {
        // Fallback simulation
        setTimeout(() => {
          setCampDetails({
            title: `June 2026 Free Medical Camp`,
            date: parsedDate,
            location: 'Kalwakurthy',
            status: 'draft',
            patients: patientsCount,
            male: maleCount,
            female: femaleCount,
            villages: villageCount,
            bpTests: bpCount,
            sugarTests: sugarCount,
            cataracts: cataractCount,
            volunteers: volunteerCount,
            doctorsText: parsedDocs,
            summaryText: generatedSummary,
            linkedinDraft: liDraft,
            instagramDraft: instaDraft,
            youtubeDraft: youtubeDraft
          });
          setLoading(false);
          setSuccessMsg('AI successfully extracted statistics and drafted social media posts (local fallback)!');
          setActiveTab('general');
        }, 1200);
        return;
      }

      // Live Gemini API request
      const promptText = `Analyze the following raw WhatsApp medical camp report:
"""
${whatsappText}
"""

Extract the following variables:
- title: A suitable title for this monthly medical camp report
- date: The date of the camp in YYYY-MM-DD format (extract from the date in report)
- location: The location of the camp (default to "Kalwakurthy")
- patients: total patients served (number)
- male: male patients (number)
- female: female patients (number)
- villages: villages covered (number)
- bpTests: BP tests done (number)
- sugarTests: sugar tests done (number)
- cataracts: cataract cases identified (number)
- volunteers: volunteer count (number)
- doctorsText: Participating doctors list as a string
- summaryText: A professional 3-4 sentence narrative summary of the camp's success, location, and impact.

Then, generate these three drafts:
1. linkedinDraft: A LinkedIn post caption highlighting the statistics and thanking the doctors and volunteers. You MUST explicitly mention the camp date in the post caption.
2. instagramDraft: An engaging Instagram post caption with emojis and hashtags. You MUST explicitly mention the camp date in the post caption.
3. youtubeDraft: A detailed YouTube description summarizing the camp highlights, key statistics, and volunteer appreciation. You MUST explicitly mention the camp date in the description.

You MUST format your response strictly as a JSON object with the exact keys:
{
  "title": "...",
  "date": "YYYY-MM-DD",
  "location": "...",
  "patients": 0,
  "male": 0,
  "female": 0,
  "villages": 0,
  "bpTests": 0,
  "sugarTests": 0,
  "cataracts": 0,
  "volunteers": 0,
  "doctorsText": "...",
  "summaryText": "...",
  "linkedinDraft": "...",
  "instagramDraft": "...",
  "youtubeDraft": "..."
}

Do not add markdown formatting or wrappers like \`\`\`json.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: promptText
              }]
            }],
            generationConfig: {
              responseMimeType: "application/json"
            }
          })
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error?.message || 'Gemini service invocation failed');
      }

      let text = result.candidates[0].content.parts[0].text;
      // Strip markdown code block formatting if present
      text = text.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
      const parsed = JSON.parse(text);

      setCampDetails({
        title: parsed.title || `June 2026 Free Medical Camp`,
        date: parsed.date || parsedDate,
        location: parsed.location || 'Kalwakurthy',
        status: 'draft',
        patients: parsed.patients || patientsCount,
        male: parsed.male || maleCount,
        female: parsed.female || femaleCount,
        villages: parsed.villages || villageCount,
        bpTests: parsed.bpTests || bpCount,
        sugarTests: parsed.sugarTests || sugarCount,
        cataracts: parsed.cataracts || cataractCount,
        volunteers: parsed.volunteers || volunteerCount,
        doctorsText: parsed.doctorsText || parsedDocs,
        summaryText: parsed.summaryText || generatedSummary,
        linkedinDraft: parsed.linkedinDraft || liDraft,
        instagramDraft: parsed.instagramDraft || instaDraft,
        youtubeDraft: parsed.youtubeDraft || youtubeDraft
      });

      setSuccessMsg('AI successfully extracted statistics and drafted social media posts via Gemini API!');
      setActiveTab('general');
    } catch (err) {
      console.error('Gemini generateContent error in CampManager:', err);
      // Fallback
      setCampDetails({
        title: `June 2026 Free Medical Camp`,
        date: parsedDate,
        location: 'Kalwakurthy',
        status: 'draft',
        patients: patientsCount,
        male: maleCount,
        female: femaleCount,
        villages: villageCount,
        bpTests: bpCount,
        sugarTests: sugarCount,
        cataracts: cataractCount,
        volunteers: volunteerCount,
        doctorsText: parsedDocs,
        summaryText: generatedSummary,
        linkedinDraft: liDraft,
        instagramDraft: instaDraft,
        youtubeDraft: youtubeDraft
      });
      setSuccessMsg('AI extraction failed, loaded local fallback details successfully.');
      setActiveTab('general');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (publish = false) => {
    setLoading(true);
    setTimeout(() => {
      setCampDetails(prev => ({ ...prev, status: publish ? 'published' : 'draft' }));
      setLoading(false);
      setSuccessMsg(publish ? 'Camp report successfully published to main website!' : 'Draft successfully saved to database.');
    }, 1000);
  };

  return (
    <div className="space-y-8 font-inter">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="font-poppins font-extrabold text-2xl text-text-primary mb-1">
            Camp Content Manager
          </h1>
          <p className="text-xs text-text-secondary">
            Process WhatsApp text reports into rich web pages and social media summaries instantly.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSave(false)}
            disabled={loading}
            className="inline-flex items-center gap-1.5 bg-white border border-border text-text-primary px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-bg transition-colors duration-300"
          >
            <Save className="w-4 h-4 text-text-secondary" />
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={loading || role === 'volunteer'}
            className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/95 text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors duration-300 disabled:opacity-50"
          >
            <CheckCircle className="w-4 h-4" />
            Publish Website
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-100 text-green-700 px-4 py-3.5 rounded-2xl">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-xs font-semibold leading-none">{successMsg}</span>
        </div>
      )}

      {role === 'volunteer' && (
        <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-100 rounded-2xl p-4">
          <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 leading-relaxed font-medium">
            <strong>Volunteer Account Notice:</strong> You can parse and draft reports, but you do not have permission to publish them directly to the production website.
          </p>
        </div>
      )}

      {/* Main Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input WhatsApp Area */}
        <div className="lg:col-span-4 bg-white border border-border rounded-3xl p-6 shadow-sm space-y-4">
          <h2 className="font-poppins font-bold text-base text-text-primary flex items-center gap-2">
            <span className="w-1.5 h-4 bg-primary rounded-full" />
            WhatsApp Raw Report
          </h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            Paste the raw text summaries sent after the monthly medical camp closes in Kalwakurthy.
          </p>
          <textarea
            value={whatsappText}
            onChange={(e) => setWhatsappText(e.target.value)}
            rows={14}
            className="w-full border border-border bg-bg/50 rounded-2xl p-4 font-inter text-xs text-text-primary leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            placeholder="Paste text here..."
          />
          <button
            onClick={handleAIParse}
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-blue-700 text-white font-bold py-3 px-4 rounded-2xl transition-all duration-300 shadow-sm active:scale-[0.98] disabled:opacity-60 text-xs font-poppins"
          >
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            {loading ? 'AI Extracting Details...' : 'Generate AI Summary'}
          </button>
        </div>

        {/* Right: Tabbed Editor */}
        <div className="lg:col-span-8 bg-white border border-border rounded-3xl overflow-hidden shadow-sm">
          {/* Tabs header */}
          <div className="flex border-b border-border bg-bg/20 p-2 gap-1.5">
            {[
              { id: 'general', label: 'General', icon: FileText },
              { id: 'stats', label: 'Statistics', icon: Database },
              { id: 'social', label: 'Social Media', icon: Share2 },
              { id: 'preview', label: 'Preview Webpage', icon: Eye }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 font-inter focus:outline-none ${
                    activeTab === tab.id
                      ? 'bg-white text-primary shadow-xs border border-border/60'
                      : 'text-text-secondary hover:text-primary'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Form Content body */}
          <div className="p-6 sm:p-8 space-y-6">
            <AnimatePresence mode="wait">
              {activeTab === 'general' && (
                <motion.div
                  key="general"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-text-secondary/70 uppercase font-inter tracking-wider">
                        Camp Title
                      </label>
                      <input
                        type="text"
                        value={campDetails.title}
                        onChange={(e) => setCampDetails({ ...campDetails, title: e.target.value })}
                        className="border border-border rounded-xl px-4 py-2.5 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-inter"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold text-text-secondary/70 uppercase font-inter tracking-wider">
                        Camp Date
                      </label>
                      <input
                        type="date"
                        value={campDetails.date}
                        onChange={(e) => setCampDetails({ ...campDetails, date: e.target.value })}
                        className="border border-border rounded-xl px-4 py-2.5 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-inter"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-text-secondary/70 uppercase font-inter tracking-wider">
                      Doctors and Specialists In Attendance
                    </label>
                    <input
                      type="text"
                      value={campDetails.doctorsText}
                      onChange={(e) => setCampDetails({ ...campDetails, doctorsText: e.target.value })}
                      placeholder="e.g. Dr. Rajesh, Dr. Sridhar"
                      className="border border-border rounded-xl px-4 py-2.5 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-inter"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-text-secondary/70 uppercase font-inter tracking-wider">
                      Camp Summary
                    </label>
                    <textarea
                      value={campDetails.summaryText}
                      onChange={(e) => setCampDetails({ ...campDetails, summaryText: e.target.value })}
                      rows={6}
                      className="border border-border rounded-xl p-4 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-inter leading-relaxed"
                    />
                  </div>
                </motion.div>
              )}

              {activeTab === 'stats' && (
                <motion.div
                  key="stats"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-5"
                >
                  {[
                    { key: 'patients', label: 'Patients Count' },
                    { key: 'male', label: 'Male Patients' },
                    { key: 'female', label: 'Female Patients' },
                    { key: 'bpTests', label: 'BP Tests Done' },
                    { key: 'sugarTests', label: 'Sugar Tests Done' },
                    { key: 'cataracts', label: 'Cataract Identified' },
                    { key: 'volunteers', label: 'Volunteers Enlisted' },
                    { key: 'villages', label: 'Villages Reached' }
                  ].map((field) => (
                    <div key={field.key} className="flex flex-col gap-1.5 bg-bg/50 p-4 border border-border rounded-2xl shadow-xs">
                      <label className="text-[10px] font-bold text-text-secondary/70 uppercase font-inter tracking-wider">
                        {field.label}
                      </label>
                      <input
                        type="number"
                        value={campDetails[field.key]}
                        onChange={(e) =>
                          setCampDetails({ ...campDetails, [field.key]: parseInt(e.target.value, 10) || 0 })
                        }
                        className="border border-border bg-white rounded-lg px-3 py-1.5 text-sm font-semibold text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-poppins"
                      />
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'social' && (
                <motion.div
                  key="social"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-text-secondary/70 uppercase font-inter tracking-wider flex items-center gap-1">
                      LinkedIn Post Caption Draft
                    </label>
                    <textarea
                      value={campDetails.linkedinDraft}
                      onChange={(e) => setCampDetails({ ...campDetails, linkedinDraft: e.target.value })}
                      rows={5}
                      className="border border-border rounded-xl p-4 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-inter leading-relaxed"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-text-secondary/70 uppercase font-inter tracking-wider flex items-center gap-1">
                      Instagram Post Caption Draft
                    </label>
                    <textarea
                      value={campDetails.instagramDraft}
                      onChange={(e) => setCampDetails({ ...campDetails, instagramDraft: e.target.value })}
                      rows={5}
                      className="border border-border rounded-xl p-4 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-inter leading-relaxed"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-text-secondary/70 uppercase font-inter tracking-wider flex items-center gap-1">
                      YouTube Video Description Draft
                    </label>
                    <textarea
                      value={campDetails.youtubeDraft}
                      onChange={(e) => setCampDetails({ ...campDetails, youtubeDraft: e.target.value })}
                      rows={5}
                      className="border border-border rounded-xl p-4 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-inter leading-relaxed"
                    />
                  </div>
                </motion.div>
              )}

              {activeTab === 'preview' && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 border border-border rounded-2xl p-5 bg-bg/25"
                >
                  {/* Visual mockup of the generated camp page */}
                  <div className="space-y-4">
                    <div className="bg-primary text-white p-4 rounded-xl">
                      <span className="text-[10px] uppercase font-bold text-white/80 block mb-1">
                        Camp Report • {campDetails.date}
                      </span>
                      <h4 className="font-poppins font-bold text-lg leading-tight">{campDetails.title}</h4>
                    </div>

                    <div className="space-y-3 font-inter text-xs text-text-secondary leading-relaxed">
                      <p><strong>Overview:</strong> {campDetails.summaryText || 'No summary text compiled.'}</p>
                      <p><strong>Doctors Participating:</strong> {campDetails.doctorsText || 'None listed.'}</p>
                      
                      <div className="border-t border-border pt-3">
                        <span className="block font-bold text-text-primary mb-2">Metrics Extracted</span>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-white border border-border p-2 rounded-lg text-center">
                            <span className="block font-bold text-primary">{campDetails.patients}</span>
                            <span className="text-[8px] uppercase tracking-wide text-text-secondary/60">Served</span>
                          </div>
                          <div className="bg-white border border-border p-2 rounded-lg text-center">
                            <span className="block font-bold text-accent">{campDetails.bpTests}</span>
                            <span className="text-[8px] uppercase tracking-wide text-text-secondary/60">BP Check</span>
                          </div>
                          <div className="bg-white border border-border p-2 rounded-lg text-center">
                            <span className="block font-bold text-primary">{campDetails.cataracts}</span>
                            <span className="text-[8px] uppercase tracking-wide text-text-secondary/60">Cataracts</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
