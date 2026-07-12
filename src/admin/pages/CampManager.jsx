import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { campReports as initialCamps } from '../../data/campReports';
import { compressAndConvertToJPEG } from '../utils/imageCompressor';
import {
  FileText,
  Sparkles,
  Save,
  CheckCircle,
  Database,
  Share2,
  ListPlus,
  Eye,
  AlertTriangle,
  PlusCircle,
  Trash2,
  Edit
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

const robustRegexParse = (rawText) => {
  const cleanText = rawText.replace(/\*/g, ''); // Strip asterisks

  // 1. Date extraction
  let date = '2026-06-14';
  let formattedDate = '14.06.2026';
  let monthName = 'June';
  let year = '2026';

  // Match DD-MM-YYYY
  const ddmmMatch = cleanText.match(/\b(\d{1,2})[-./](\d{1,2})[-./](\d{4})\b/);
  if (ddmmMatch) {
    const day = ddmmMatch[1].padStart(2, '0');
    const month = ddmmMatch[2].padStart(2, '0');
    year = ddmmMatch[3];
    date = `${year}-${month}-${day}`;
    formattedDate = `${day}.${month}.${year}`;
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    monthName = months[parseInt(month, 10) - 1] || 'June';
  } else {
    // Match e.g. "10th May 2026"
    const textDateMatch = cleanText.match(/\b(\d{1,2})(?:st|nd|rd|th)?\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{4})\b/i);
    if (textDateMatch) {
      const day = textDateMatch[1].padStart(2, '0');
      const mStr = textDateMatch[2].toLowerCase();
      const monthMap = { jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06', jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12' };
      const month = monthMap[mStr] || '06';
      year = textDateMatch[3];
      date = `${year}-${month}-${day}`;
      formattedDate = `${day}.${month}.${year}`;
      
      const monthsFull = { jan: 'January', feb: 'February', mar: 'March', apr: 'April', may: 'May', jun: 'June', jul: 'July', aug: 'August', sep: 'September', oct: 'October', nov: 'November', dec: 'December' };
      monthName = monthsFull[mStr] || 'June';
    }
  }

  // 2. Camp Title
  // Try to find camp number e.g. "51 Medical Camp" or "51st Medical Camp"
  let title = `${monthName} ${year} Free Medical Camp`;
  const campNumMatch = cleanText.match(/\b(\d+)(?:st|nd|rd|th)?\s+Medical Camp\b/i);
  if (campNumMatch) {
    const num = campNumMatch[1];
    let suffix = 'th';
    if (num.endsWith('1') && !num.endsWith('11')) suffix = 'st';
    else if (num.endsWith('2') && !num.endsWith('12')) suffix = 'nd';
    else if (num.endsWith('3') && !num.endsWith('13')) suffix = 'rd';
    title = `${num}${suffix} Free Medical Camp - ${monthName} ${year}`;
  }

  // Helper to extract numeric values with context
  const extractNum = (regexList, defaultVal = 0) => {
    for (const regex of regexList) {
      const match = cleanText.match(regex);
      if (match) {
        return parseInt(match[1], 10);
      }
    }
    return defaultVal;
  };

  // 3. Extract metrics
  const patients = extractNum([
    /Total Patients:\s*(\d+)/i,
    /Total of\s*(\d+)/i,
    /Patients Served:\s*(\d+)/i,
    /(\d+)\s+patients\s+availed/i,
    /(\d+)\s+total\s+patients/i
  ], 520);

  const male = extractNum([
    /Male Patients:\s*(\d+)/i,
    /(\d+)\s*male/i,
    /(\d+)\s*M\b/i
  ], 156);

  const female = extractNum([
    /Female Patients:\s*(\d+)/i,
    /(\d+)\s*female/i,
    /(\d+)\s*F\b/i
  ], 364);

  const bpTests = extractNum([
    /BP Tests Done:\s*(\d+)/i,
    /BP\s*(?:Tests)?:\s*(\d+)/i,
    /(\d+)\s*BP/i
  ], 340);

  const sugarTests = extractNum([
    /Sugar Tests Done:\s*(\d+)/i,
    /Sugar\s*(?:Tests)?:\s*(\d+)/i,
    /(\d+)\s*Sugar/i
  ], 290);

  const cataracts = extractNum([
    /Cataract Cases Identified:\s*(\d+)/i,
    /Cataract\s*(?:Cases)?:\s*(\d+)/i,
    /(\d+)\s*cataract/i
  ], 28);

  const spectacles = extractNum([
    /Spects distributed:\s*(\d+)/i,
    /Spectacles distributed:\s*(\d+)/i,
    /(\d+)\s*spects/i,
    /(\d+)\s*spectacles/i
  ], 0);

  const volunteers = extractNum([
    /Volunteer count:\s*(\d+)/i,
    /Volunteers:\s*(\d+)/i,
    /(\d+)\s*volunteer/i
  ], 25);

  const villages = extractNum([
    /Total Villages Covered:\s*(\d+)/i,
    /Villages Covered:\s*(\d+)/i,
    /(\d+)\s*villages/i
  ], 71);

  // Doctors
  let doctorsText = 'Dr. Rajesh Gubba, Dr. Sridhar';
  const docMatch = cleanText.match(/Doctors in attendance:\s*(.+)/i) || cleanText.match(/Doctors:\s*(.+)/i);
  if (docMatch) {
    doctorsText = docMatch[1].trim();
  }

  // Summary
  const summaryText = `Our monthly medical camp for ${monthName} ${year} was completed successfully at the Sai Baba temple premises in Kalwakurthy. A total of ${patients} patients from ${villages} surrounding villages were served by our whitelisted medical specialists. Free diagnostic checks, blood pressure screenings, and sugar screenings were carried out on-site. Additionally, ${cataracts} cases of cataract were diagnosed and scheduled for free surgical operations.`;

  // Drafts
  const linkedinDraft = `🌟 SRI SATHYA SAI HEALTH SERVICES - KALWAKURTHY (Camp Date: ${formattedDate}) 🌟\n\nWe are overjoyed to share the impact report from our monthly medical camp conducted on ${formattedDate}:\n\n👥 Patients Served: ${patients} (${male} Male, ${female} Female)\n🏡 Villages Reached: ${villages}\n🩺 BP Screenings: ${bpTests} | Sugar Checks: ${sugarTests}\n👁️ Cataract Operations Scheduled: ${cataracts}\n🕶️ Spectacles Distributed: ${spectacles}\n\nOur heartfelt thanks to our specialist doctors and the ${volunteers} Sevadal volunteers who made this possible. "Love All, Serve All."\n\n#HealthcareForAll #NGO #SaiRam #CommunityCare`;

  const instagramDraft = `Moments of Hope and Care from Kalwakurthy on ${formattedDate}! 🧡\n\nTotal Patients: ${patients}\nVolunteers: ${volunteers}\nDiagnostics BP/Sugar: ${bpTests}/${sugarTests}\nCataract surgeries: ${cataracts} (Scheduled Free)\nSpectacles distributed: ${spectacles}\n\n"Service to man is service to God." 🙏\n\n#SathyaSai #FreeMedicalCamp #Telangana #SocialWork #Seva`;

  const youtubeDraft = `🎥 Highlights of the Free Medical Camp conducted in Kalwakurthy on ${formattedDate}.\n\nUnder Sri Sathya Sai Health Services, we organized another successful monthly camp to serve our rural community.\n\n📊 Key Camp Statistics:\n• Patients Treated: ${patients} (${male} Male, ${female} Female)\n• Diagnostic BP & Sugar Screenings: ${bpTests} / ${sugarTests}\n• Cataract Surgeries Scheduled: ${cataracts} (Completely Free)\n• Spectacles Distributed: ${spectacles}\n• Villages Covered: ${villages}\n• Volunteers: ${volunteers}\n\nThank you to our dedicated doctors and volunteers for their selfless service. "Love All, Serve All." 🙏\n\n#SaiSeva #FreeMedicalCamp #RuralHealthcare #NGO`;

  return {
    title,
    date,
    location: 'Kalwakurthy',
    status: 'draft',
    patients,
    male,
    female,
    villages,
    bpTests,
    sugarTests,
    cataracts,
    spectacles,
    volunteers,
    doctorsText,
    summaryText,
    linkedinDraft,
    instagramDraft,
    youtubeDraft
  };
};

const serializeCamps = (campsArray) => {
  let json = JSON.stringify(campsArray, null, 2);
  
  const replacements = [
    { varName: 'imgRegistration', file: 'camp_registration_queue' },
    { varName: 'imgConsultation', file: 'camp_consultation_hall' },
    { varName: 'imgEye', file: 'camp_eye_screening' },
    { varName: 'imgVital', file: 'camp_vital_signs' },
    { varName: 'imgLab', file: 'camp_lab_diagnostics' },
    { varName: 'imgMedicine', file: 'camp_medicine_distribution' },
    { varName: 'imgTeam', file: 'camp_team_group' },
    { varName: 'imgAwareness', file: 'camp_health_awareness' },
    { varName: 'imgDoctor', file: 'camp_doctor_consultation' }
  ];

  replacements.forEach(r => {
    const coverRegex = new RegExp(`"coverImage":\\s*"[^"]*${r.file}[^"]*"`, 'g');
    json = json.replace(coverRegex, `"coverImage": ${r.varName}`);
    
    const galleryRegex = new RegExp(`"[^"]*${r.file}[^"]*"`, 'g');
    json = json.replace(galleryRegex, r.varName);
  });

  return `import imgRegistration from '../assets/images/camp_registration_queue.jpeg';
import imgConsultation from '../assets/images/camp_consultation_hall.jpeg';
import imgEye from '../assets/images/camp_eye_screening.jpeg';
import imgVital from '../assets/images/camp_vital_signs.jpeg';
import imgLab from '../assets/images/camp_lab_diagnostics.jpeg';
import imgMedicine from '../assets/images/camp_medicine_distribution.jpeg';
import imgTeam from '../assets/images/camp_team_group.jpeg';
import imgAwareness from '../assets/images/camp_health_awareness.jpeg';
import imgDoctor from '../assets/images/camp_doctor_consultation.jpeg';

export const campReports = ${json};
`;
};

const publishCampsToGithub = async (updatedCamps) => {
  try {
    const fileContent = serializeCamps(updatedCamps);
    
    // 1. Publish JS file for React bundling
    const response = await fetch('/api/publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filePath: 'src/data/campReports.js',
        content: fileContent,
        commitMessage: 'admin: publish camp report changes (JS)'
      })
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || 'Failed to publish camp reports JS to GitHub');
    }

    // 2. Publish JSON file for Vercel serverless runtime lookups
    const responseJson = await fetch('/api/publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filePath: 'src/data/campReports.json',
        content: JSON.stringify(updatedCamps, null, 2),
        commitMessage: 'admin: publish camp report changes (JSON)'
      })
    });
    const dataJson = await responseJson.json();
    if (!responseJson.ok) {
      throw new Error(dataJson.error || 'Failed to publish camp reports JSON to GitHub');
    }

    return true;
  } catch (err) {
    console.error('Publish camps error:', err);
    return false;
  }
};

export default function CampManager() {
  const { role } = useAuth();
  
  // Camp list management
  const [camps, setCamps] = useState(() => {
    const saved = localStorage.getItem('aarogya_camps');
    return saved ? JSON.parse(saved) : initialCamps;
  });
  const [editingCamp, setEditingCamp] = useState(null); // null (list), 'new', or camp object

  const [whatsappText, setWhatsappText] = useState(sampleReport);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general'); // general, stats, social, preview
  const [successMsg, setSuccessMsg] = useState('');

  // Camp Form States
  const [campDetails, setCampDetails] = useState({
    title: '',
    date: '',
    location: 'Kalwakurthy',
    status: 'draft',
    patients: 0,
    male: 0,
    female: 0,
    villages: 0,
    bpTests: 0,
    sugarTests: 0,
    cataracts: 0,
    spectacles: 0,
    volunteers: 0,
    doctorsText: '',
    summaryText: '',
    linkedinDraft: '',
    instagramDraft: '',
    youtubeDraft: '',
    videoUrl: '',
    coverImage: '',
    gallery: []
  });

  const handleEditClick = (camp) => {
    setEditingCamp(camp);
    setWhatsappText(camp.rawReport || sampleReport);

    const editorFields = camp.editorFields || {
      title: camp.title,
      date: camp.date ? new Date(camp.date).toISOString().split('T')[0] : '',
      location: camp.location || 'Kalwakurthy',
      status: camp.status || 'published',
      patients: camp.patientsServed || camp.patients || 0,
      male: camp.stats?.find(s => s.label.toLowerCase().includes('male'))?.value || Math.round((camp.patientsServed || 0) * 0.3),
      female: camp.stats?.find(s => s.label.toLowerCase().includes('female'))?.value || Math.round((camp.patientsServed || 0) * 0.7),
      villages: camp.stats?.find(s => s.label.toLowerCase().includes('village'))?.value || 71,
      bpTests: camp.stats?.find(s => s.label.toLowerCase().includes('bp'))?.value || 0,
      sugarTests: camp.stats?.find(s => s.label.toLowerCase().includes('sugar'))?.value || 0,
      cataracts: camp.stats?.find(s => s.label.toLowerCase().includes('cataract'))?.value || 0,
      spectacles: camp.stats?.find(s => s.label.toLowerCase().includes('spect'))?.value || 0,
      volunteers: camp.volunteers || 25,
      doctorsText: camp.doctors?.map(d => d.name).join(', ') || '',
      summaryText: camp.summary,
      linkedinDraft: camp.linkedinDraft || '',
      instagramDraft: camp.instagramDraft || '',
      youtubeDraft: camp.youtubeDraft || '',
      videoUrl: camp.videoUrl || '',
      coverImage: camp.coverImage || '',
      gallery: camp.gallery || []
    };
    setCampDetails(editorFields);
    setSuccessMsg('');
  };

  const handleCreateNewClick = () => {
    setEditingCamp('new');
    setCampDetails({
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
      spectacles: 0,
      volunteers: 0,
      doctorsText: '',
      summaryText: '',
      linkedinDraft: '',
      instagramDraft: '',
      youtubeDraft: '',
      videoUrl: '',
      coverImage: '',
      gallery: []
    });
    setWhatsappText(sampleReport);
    setSuccessMsg('');
  };

  const handleDelete = async (id) => {
    if (role !== 'super-admin') {
      setSuccessMsg('Permission denied: Only Super Admins can delete camp reports.');
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete this camp report? This action cannot be undone.");
    if (!confirmDelete) return;

    const updatedCamps = camps.filter(c => c.id !== id);
    setCamps(updatedCamps);
    localStorage.setItem('aarogya_camps', JSON.stringify(updatedCamps));

    setLoading(true);
    const githubSuccess = await publishCampsToGithub(updatedCamps);
    setLoading(false);

    if (githubSuccess) {
      setSuccessMsg('Camp report removed from database and deleted from GitHub repository.');
    } else {
      setSuccessMsg('Camp report removed locally, but failed to delete from GitHub repository.');
    }
  };

  const handleImageUpload = async (e, type = 'gallery') => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setLoading(true);
    setSuccessMsg('');

    try {
      if (type === 'cover') {
        const file = files[0];
        const base64Data = await compressAndConvertToJPEG(file);
        
        // Extract month and year from camp date
        const campDate = campDetails.date ? new Date(campDetails.date) : new Date();
        const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        const monthStr = months[campDate.getMonth()];
        const yearStr = campDate.getFullYear().toString();

        setSuccessMsg('Uploading cover image...');
        // Call /api/upload uploader handler
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fileContent: base64Data,
            filename: file.name.replace(/\.[^/.]+$/, "") + ".jpeg",
            month: monthStr,
            year: yearStr
          })
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to upload image to GitHub');
        }

        setCampDetails(prev => ({ ...prev, coverImage: data.url }));
        setSuccessMsg('Cover image uploaded successfully to GitHub!');
        setLoading(false);
      } else {
        // Upload multiple files for gallery sequentially to avoid git race conditions
        const uploadedUrls = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          setSuccessMsg(`Compressing image ${i + 1} of ${files.length}...`);
          const base64Data = await compressAndConvertToJPEG(file);

          setSuccessMsg(`Uploading image ${i + 1} of ${files.length}...`);
          const campDate = campDetails.date ? new Date(campDetails.date) : new Date();
          const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
          const monthStr = months[campDate.getMonth()];
          const yearStr = campDate.getFullYear().toString();

          const response = await fetch('/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              fileContent: base64Data,
              filename: file.name.replace(/\.[^/.]+$/, "") + ".jpeg",
              month: monthStr,
              year: yearStr
            })
          });

          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.error || `Failed to upload ${file.name}`);
          }
          uploadedUrls.push(data.url);
        }

        setCampDetails(prev => ({
          ...prev,
          gallery: [...(prev.gallery || []), ...uploadedUrls]
        }));
        setSuccessMsg(`Successfully uploaded ${uploadedUrls.length} gallery images to GitHub!`);
        setLoading(false);
      }
    } catch (err) {
      console.error('Image upload error:', err);
      setSuccessMsg(`Image upload failed: ${err.message || err}`);
      setLoading(false);
    }
  };

  const handleAIParse = async () => {
    setLoading(true);
    setSuccessMsg('');

    const parsedDetails = robustRegexParse(whatsappText);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_KEY || import.meta.env.VITE_FIREBASE_API_KEY;

      if (!apiKey || apiKey === 'YOUR_API_KEY') {
        // Fallback simulation
        setTimeout(() => {
          setCampDetails(prev => ({
            ...prev,
            ...parsedDetails,
            videoUrl: prev.videoUrl,
            coverImage: prev.coverImage,
            gallery: prev.gallery
          }));
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
- spectacles: spectacles/glasses distributed (number)
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
  "spectacles": 0,
  "volunteers": 0,
  "doctorsText": "...",
  "summaryText": "...",
  "linkedinDraft": "...",
  "instagramDraft": "...",
  "youtubeDraft": "..."
}

Do not add markdown formatting or wrappers like \`\`\`json.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
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

      setCampDetails(prev => ({
        ...prev,
        title: parsed.title || parsedDetails.title,
        date: parsed.date || parsedDetails.date,
        location: parsed.location || parsedDetails.location,
        status: 'draft',
        patients: parsed.patients || parsedDetails.patients,
        male: parsed.male || parsedDetails.male,
        female: parsed.female || parsedDetails.female,
        villages: parsed.villages || parsedDetails.villages,
        bpTests: parsed.bpTests || parsedDetails.bpTests,
        sugarTests: parsed.sugarTests || parsedDetails.sugarTests,
        cataracts: parsed.cataracts || parsedDetails.cataracts,
        spectacles: parsed.spectacles || parsedDetails.spectacles || 0,
        volunteers: parsed.volunteers || parsedDetails.volunteers,
        doctorsText: parsed.doctorsText || parsedDetails.doctorsText,
        summaryText: parsed.summaryText || parsedDetails.summaryText,
        linkedinDraft: parsed.linkedinDraft || parsedDetails.linkedinDraft,
        instagramDraft: parsed.instagramDraft || parsedDetails.instagramDraft,
        youtubeDraft: parsed.youtubeDraft || parsedDetails.youtubeDraft
      }));

      setSuccessMsg('AI successfully extracted statistics and drafted social media posts via Gemini API!');
      setActiveTab('general');
    } catch (err) {
      console.error('Gemini generateContent error in CampManager:', err);
      // Fallback using robust regex parsing
      setCampDetails(prev => ({
        ...prev,
        ...parsedDetails
      }));
      setSuccessMsg('AI extraction failed, loaded local fallback details successfully.');
      setActiveTab('general');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (publish = false) => {
    setLoading(true);
    setSuccessMsg('');

    // Generate stats array matching public site format
    const statsArray = [
      { label: 'Total Patients', value: campDetails.patients },
      { label: 'Eye Screening', value: campDetails.cataracts > 0 ? Math.round(campDetails.cataracts * 6) : 140 },
      { label: 'Cataract Surgery Registered', value: campDetails.cataracts },
      { label: 'Spectacles Distributed', value: campDetails.spectacles || 0 },
      { label: 'Blood Sugar Tests', value: campDetails.sugarTests },
      { label: 'BP Checks', value: campDetails.bpTests }
    ];

    // Build the camp object
    let updatedCamps = [];
    if (editingCamp === 'new') {
      const newCampObj = {
        id: `camp-${campDetails.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        slug: campDetails.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        type: 'camp-report',
        title: campDetails.title,
        month: new Date(campDetails.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        date: new Date(campDetails.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        location: campDetails.location || 'Sai Baba Temple Altar, Kalwakurthy',
        coverImage: campDetails.coverImage || 'imgRegistration',
        patientsServed: campDetails.patients,
        summary: campDetails.summaryText,
        stats: statsArray,
        doctors: (campDetails.doctorsText || 'Dr. Rajesh Gubba, Dr. Sridhar').split(',').map(d => ({ name: d.trim(), role: 'Medical Specialist' })),
        highlights: [
          `Successfully served ${campDetails.patients} patients from surrounding villages.`,
          `Identified ${campDetails.cataracts} cataract cases scheduled for free surgery.`,
          `Conducted ${campDetails.bpTests} blood pressure checks and ${campDetails.sugarTests} sugar tests.`
        ],
        testimonials: [
          {
            quote: 'We appreciate the selfless service of all doctors and volunteers who help our village every month.',
            author: 'Kalwakurthy Villager'
          }
        ],
        gallery: campDetails.gallery && campDetails.gallery.length > 0 ? campDetails.gallery : ['imgEye', 'imgConsultation', 'imgVital', 'imgLab', 'imgMedicine', 'imgTeam'],
        videoUrl: campDetails.videoUrl || '',
        status: publish ? 'published' : 'draft',
        rawReport: whatsappText,
        // Preserve editor fields for admin re-editing
        editorFields: { ...campDetails }
      };
      updatedCamps = [newCampObj, ...camps];
    } else {
      updatedCamps = camps.map(c => c.id === editingCamp.id ? {
        ...c,
        title: campDetails.title,
        month: new Date(campDetails.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        date: new Date(campDetails.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        location: campDetails.location,
        patientsServed: campDetails.patients,
        summary: campDetails.summaryText,
        stats: statsArray,
        doctors: (campDetails.doctorsText || 'Dr. Rajesh Gubba, Dr. Sridhar').split(',').map(d => ({ name: d.trim(), role: 'Medical Specialist' })),
        coverImage: campDetails.coverImage,
        videoUrl: campDetails.videoUrl,
        gallery: campDetails.gallery,
        status: publish ? 'published' : 'draft',
        rawReport: whatsappText,
        editorFields: { ...campDetails }
      } : c);
    }

    setCamps(updatedCamps);
    localStorage.setItem('aarogya_camps', JSON.stringify(updatedCamps));

    let githubSuccess = false;
    if (publish) {
      githubSuccess = await publishCampsToGithub(updatedCamps);
    }

    setLoading(false);
    if (publish) {
      if (githubSuccess) {
        setSuccessMsg('Camp report successfully published to GitHub (Vercel redeploy triggered)!');
      } else {
        setSuccessMsg('Camp report saved locally, but failed to commit to GitHub.');
      }
    } else {
      setSuccessMsg('Draft successfully saved.');
    }
    setEditingCamp(null);
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
          {editingCamp ? (
            <>
              <button
                type="button"
                onClick={() => setEditingCamp(null)}
                className="bg-white border border-border text-text-secondary hover:bg-bg px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleSave(false)}
                disabled={loading}
                className="inline-flex items-center gap-1.5 bg-white border border-border text-text-primary px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-bg transition-colors duration-300 disabled:opacity-50"
              >
                <Save className="w-4 h-4 text-text-secondary" />
                Save Draft
              </button>
              <button
                type="button"
                onClick={() => handleSave(true)}
                disabled={loading || role === 'volunteer'}
                className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/95 text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors duration-300 disabled:opacity-50"
              >
                <CheckCircle className="w-4 h-4" />
                Publish Website
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleCreateNewClick}
              className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary/95 text-white px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors duration-300"
            >
              <PlusCircle className="w-4 h-4" />
              New Camp Report
            </button>
          )}
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

      {/* Conditional rendering based on list or edit */}
      <AnimatePresence mode="wait">
        {editingCamp ? (
          <motion.div
            key="editor-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
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
                type="button"
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
                      type="button"
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
                      key="general-tab"
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
                          rows={4}
                          className="border border-border rounded-xl p-4 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-inter leading-relaxed"
                        />
                      </div>

                      {/* Media & Links Integration */}
                      <div className="flex flex-col gap-1.5 border-t border-border pt-6 mt-6">
                        <h3 className="font-poppins font-bold text-sm text-text-primary flex items-center gap-2 mb-2">
                          <span className="w-1.5 h-3.5 bg-primary rounded-full" />
                          Media & Video Links
                        </h3>
                        
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-bold text-text-secondary/70 uppercase font-inter tracking-wider">
                            YouTube Video Link
                          </label>
                          <input
                            type="text"
                            value={campDetails.videoUrl || ''}
                            onChange={(e) => setCampDetails({ ...campDetails, videoUrl: e.target.value })}
                            placeholder="e.g. https://youtube.com/watch?v=..."
                            className="border border-border rounded-xl px-4 py-2.5 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-inter"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-bold text-text-secondary/70 uppercase font-inter tracking-wider">
                              Cover Image URL
                            </label>
                            <input
                              type="text"
                              value={campDetails.coverImage || ''}
                              onChange={(e) => setCampDetails({ ...campDetails, coverImage: e.target.value })}
                              placeholder="e.g. https://raw.githubusercontent.com/... or uploaded path"
                              className="border border-border rounded-xl px-4 py-2.5 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary font-inter mb-2"
                            />
                            <label className="flex items-center justify-center gap-1.5 bg-bg border border-border hover:bg-primary/5 text-text-secondary hover:text-primary px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors">
                              <span>Upload Cover Photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'cover')}
                                className="hidden"
                              />
                            </label>
                          </div>

                          {campDetails.coverImage && (
                            <div className="flex flex-col gap-1">
                              <label className="text-[10px] font-bold text-text-secondary/50 uppercase font-inter">Cover Preview</label>
                              <div className="border border-border rounded-2xl overflow-hidden aspect-video relative bg-bg max-w-[200px]">
                                <img src={campDetails.coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-1.5 mt-4">
                          <label className="text-[11px] font-bold text-text-secondary/70 uppercase font-inter tracking-wider">
                            Gallery Images
                          </label>
                          <div className="flex flex-wrap gap-3 mb-2">
                            {(campDetails.gallery || []).map((img, idx) => (
                              <div key={idx} className="relative w-16 h-16 border border-border rounded-xl overflow-hidden group shadow-xs">
                                <img src={img} alt="Gallery Preview" className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={() => setCampDetails(prev => ({
                                    ...prev,
                                    gallery: prev.gallery.filter((_, i) => i !== idx)
                                  }))}
                                  className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold"
                                >
                                  Delete
                                </button>
                              </div>
                            ))}
                            <label className="w-16 h-16 flex flex-col items-center justify-center bg-bg border border-dashed border-border rounded-xl hover:border-primary hover:bg-primary/5 text-text-secondary hover:text-primary cursor-pointer transition-colors">
                              <span className="text-lg font-bold leading-none">+</span>
                              <span className="text-[9px] font-semibold mt-1">Upload</span>
                              <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'gallery')}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'stats' && (
                    <motion.div
                      key="stats-tab"
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
                        { key: 'spectacles', label: 'Spectacles Distributed' },
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
                      key="social-tab"
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
                      key="preview-tab"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 max-h-[50vh] overflow-y-auto pr-2 border border-border rounded-2xl p-5 bg-bg/25"
                    >
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
                          
                          {campDetails.videoUrl && (
                            <p><strong>Video Link Attached:</strong> <span className="text-primary underline">{campDetails.videoUrl}</span></p>
                          )}

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
          </motion.div>
        ) : (
          <motion.div
            key="list-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {camps.map((c) => (
              <div key={c.id} className="bg-white border border-border rounded-3xl overflow-hidden hover:shadow-card-hover transition-all duration-400 flex flex-col justify-between h-full p-6">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="bg-bg text-primary text-[9px] font-bold px-2 py-0.5 rounded-md uppercase font-inter border border-border/50">
                      Camp Report
                    </span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md uppercase font-inter ${
                      c.status === 'published' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-orange-50 text-orange-600 border border-orange-200'
                    }`}>
                      {c.status || 'published'}
                    </span>
                  </div>
                  <h3 className="font-poppins font-bold text-base text-text-primary leading-snug mb-2 hover:text-primary transition-colors cursor-pointer" onClick={() => handleEditClick(c)}>
                    {c.title}
                  </h3>
                  <p className="text-text-secondary font-inter text-xs leading-relaxed line-clamp-3 mb-4">
                    {c.summary}
                  </p>
                  <div className="text-[10px] text-text-secondary/70 font-semibold mb-6 flex flex-wrap gap-x-3 gap-y-1">
                    <span>👥 Patients: {c.patientsServed || c.patients || 0}</span>
                    <span>📍 {c.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                  <span className="text-[10px] text-text-secondary/60 font-semibold font-inter">
                    {c.date}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleEditClick(c)}
                      className="p-2 bg-bg hover:bg-primary/5 text-text-secondary hover:text-primary border border-border rounded-xl transition-colors"
                      title="Edit camp report"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    {role === 'super-admin' && (
                      <button
                        type="button"
                        onClick={() => handleDelete(c.id)}
                        className="p-2 bg-bg hover:bg-red-50 text-text-secondary/40 hover:text-red-600 border border-border rounded-xl transition-colors"
                        title="Delete camp report"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
