import imgRegistration from '../assets/images/camp_registration_queue.jpeg';
import imgConsultation from '../assets/images/camp_consultation_hall.jpeg';
import imgEye from '../assets/images/camp_eye_screening.jpeg';
import imgVital from '../assets/images/camp_vital_signs.jpeg';
import imgLab from '../assets/images/camp_lab_diagnostics.jpeg';
import imgMedicine from '../assets/images/camp_medicine_distribution.jpeg';
import imgTeam from '../assets/images/camp_team_group.jpeg';
import imgAwareness from '../assets/images/camp_health_awareness.jpeg';
import imgDoctor from '../assets/images/camp_doctor_consultation.jpeg';

export const campReports = [
  {
    id: 'camp-june-2026',
    slug: 'june-2026-free-medical-camp',
    type: 'camp-report',
    title: 'June 2026 Free Medical Camp',
    month: 'June 2026',
    date: 'June 14, 2026',
    location: 'Sai Baba Temple Altar, Kalwakurthy',
    coverImage: imgRegistration,
    patientsServed: 520,
    summary: 'Our monthly camp for June saw an exceptional turnout of over 520 villagers. With hot summer conditions posing seasonal risks, our team of dedicated specialists and volunteers provided comprehensive checkups, diagnostic testing, and free drug distributions.',
    stats: [
      { label: 'General Medicine', value: 310 },
      { label: 'Cardiology', value: 45 },
      { label: 'Eye Screening', value: 165 },
      { label: 'Cataract Surgery Registered', value: 28 },
      { label: 'Blood Sugar Tests', value: 290 },
      { label: 'BP Checks', value: 340 }
    ],
    doctors: [
      { name: 'Dr. Rajesh Gubba', role: 'General Medicine' },
      { name: 'Dr. Chandrakanth Chithanuri', role: 'Cardiology' },
      { name: 'Dr. Sridhar', role: 'Eye Specialist' },
      { name: 'Dr. Mounika', role: 'Gynaecology' },
      { name: 'Dr. Naveen', role: 'General Medicine' }
    ],
    highlights: [
      'Successfully screened 165 senior citizens for cataracts, scheduling 28 patients for fully funded surgeries.',
      'Distributed free summer hydration and glucose packs along with regular prescriptions.',
      'Over 25 dedicated local Sevadal volunteers managed registrations and crowd routing.',
      'Provided a free nutritious lunch to all 520 attending patients and their family members.'
    ],
    testimonials: [
      {
        quote: 'I could not see clearly for two years and could not afford the operation. The doctors here registered me for cataract surgery, and now I can see my family’s faces again.',
        author: 'Laxmamma, age 68, Kalwakurthy villager'
      }
    ],
    gallery: [imgEye, imgConsultation, imgVital, imgLab, imgMedicine, imgTeam],
    videoUrl: 'https://youtube.com/shorts/4VJeRkI9Qvs?feature=share' // Standard youtube placeholder or embed frame
  },
  {
    id: 'camp-may-2026',
    slug: 'may-2026-free-medical-camp',
    type: 'camp-report',
    title: 'May 2026 Free Medical Camp',
    month: 'May 2026',
    date: 'May 10, 2026',
    location: 'Sai Baba Temple Altar, Kalwakurthy',
    coverImage: imgConsultation,
    patientsServed: 485,
    summary: 'The May medical camp was completed successfully with the support of 12 visiting specialist doctors. Our cardiology unit performed ECG tests on-site, allowing early detection of high-risk conditions.',
    stats: [
      { label: 'General Medicine', value: 280 },
      { label: 'Cardiology', value: 38 },
      { label: 'Eye Screening', value: 140 },
      { label: 'Cataract Surgery Registered', value: 19 },
      { label: 'Blood Sugar Tests', value: 245 },
      { label: 'BP Checks', value: 310 }
    ],
    doctors: [
      { name: 'Dr. Swamy', role: 'General Medicine' },
      { name: 'Dr. Sai Charan Gubba', role: 'Cardiology' },
      { name: 'Dr. Sridhar', role: 'Eye Specialist' },
      { name: 'Dr. Poojitha', role: 'General Medicine' }
    ],
    highlights: [
      'Identified 8 cardiac cases requiring emergency follow-up and facilitated hospital referrals.',
      'Completed 19 cataract surgery screenings and arranged transportation for patients.',
      'Distributed free chronic disorder drugs for diabetes and hypertension to cover the next 30 days.'
    ],
    testimonials: [
      {
        quote: 'Getting blood pressure medicines for free every month saves my family thousands of rupees. The volunteers treat us with so much respect.',
        author: 'Rami Reddy, local farmer'
      }
    ],
    gallery: [imgRegistration, imgEye, imgLab, imgMedicine, imgTeam, imgAwareness],
    videoUrl: ''
  },
  {
    id: 'camp-april-2026',
    slug: 'april-2026-free-medical-camp',
    type: 'camp-report',
    title: 'April 2026 Free Medical Camp',
    month: 'April 2026',
    date: 'April 12, 2026',
    location: 'Sai Baba Temple Altar, Kalwakurthy',
    coverImage: imgDoctor,
    patientsServed: 436,
    summary: 'April’s monthly camp focused on diabetes awareness and vision care. Over 200 patients underwent comprehensive blood tests, enabling early diagnosis of metabolic health issues.',
    stats: [
      { label: 'General Medicine', value: 240 },
      { label: 'Cardiology', value: 30 },
      { label: 'Eye Screening', value: 130 },
      { label: 'Cataract Surgery Registered', value: 14 },
      { label: 'Blood Sugar Tests', value: 210 },
      { label: 'BP Checks', value: 275 }
    ],
    doctors: [
      { name: 'Dr. Chaitanya Kuppaganthu', role: 'General Medicine' },
      { name: 'Dr. Krishna Veeramalla', role: 'General Medicine' },
      { name: 'Dr. Sridhar', role: 'Eye Specialist' },
      { name: 'Dr. Vidya Sagar', role: 'General Medicine' }
    ],
    highlights: [
      '14 successful cataract surgery candidates screened and scheduled for free procedures.',
      'Specialized dental health consultation booth added for local village school children.',
      'Conducted live demonstration on food nutrition and correct dietary routines for healthy blood sugar.'
    ],
    testimonials: [
      {
        quote: 'The doctor explained how to control my diabetes with food and walks, not just tablets. I feel much healthier now.',
        author: 'Mallesh, patient from neighboring village'
      }
    ],
    gallery: [imgRegistration, imgConsultation, imgEye, imgLab, imgMedicine, imgTeam],
    videoUrl: ''
  }
];
