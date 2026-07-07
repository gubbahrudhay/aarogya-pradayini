import imgTeam from '../assets/images/camp_team_group.jpeg';
import imgQueue from '../assets/images/camp_registration_queue.jpeg';
import imgConsultation from '../assets/images/camp_consultation_hall.jpeg';
import imgEye from '../assets/images/camp_eye_screening.jpeg';
import imgLab from '../assets/images/camp_lab_diagnostics.jpeg';
import imgMedicine from '../assets/images/camp_medicine_distribution.jpeg';
import imgBP from '../assets/images/camp_vital_signs.jpeg';
import imgAwareness from '../assets/images/camp_health_awareness.jpeg';
import imgDoctor from '../assets/images/camp_doctor_consultation.jpeg';

export const collections = [
  {
    id: 'coll-june-2026',
    month: 'June',
    year: '2026',
    title: 'June 2026 Free Medical Camp',
    coverImage: imgQueue,
    photoCount: 35,
    videoCount: 8,
    patientsServed: 520,
    doctorsCount: 12,
    description: 'Serving over 520 patients with general medicine checkups, eye diagnostic screenings, and dental care in Kalwakurthy.'
  },
  {
    id: 'coll-may-2026',
    month: 'May',
    year: '2026',
    title: 'May 2026 Free Medical Camp',
    coverImage: imgConsultation,
    photoCount: 28,
    videoCount: 4,
    patientsServed: 485,
    doctorsCount: 10,
    description: 'On-site ECG screening, cardiovascular consultations, and free distribution of chronic disorder prescriptions.'
  },
  {
    id: 'coll-april-2026',
    month: 'April',
    year: '2026',
    title: 'April 2026 Free Medical Camp',
    coverImage: imgDoctor,
    photoCount: 22,
    videoCount: 2,
    patientsServed: 436,
    doctorsCount: 8,
    description: 'Diabetes wellness screening and specialized child health checkups for local rural community families.'
  }
];

export const photos = [
  {
    id: 1,
    src: imgQueue,
    alt: 'Queue of patients waiting outside registration counter',
    month: 'June',
    year: '2026',
    category: 'General Camp'
  },
  {
    id: 2,
    src: imgEye,
    alt: 'Optometrist testing patient using trial frame lenses',
    month: 'June',
    year: '2026',
    category: 'Eye Camp'
  },
  {
    id: 3,
    src: imgLab,
    alt: 'Blood analysis machine inside on-site diagnostics laboratory',
    month: 'June',
    year: '2026',
    category: 'Blood Sugar Testing'
  },
  {
    id: 4,
    src: imgMedicine,
    alt: 'Boxes of free drugs sorted at the pharmacy distribution counter',
    month: 'June',
    year: '2026',
    category: 'Volunteers'
  },
  {
    id: 5,
    src: imgBP,
    alt: 'Volunteer screening patient’s blood pressure metrics',
    month: 'June',
    year: '2026',
    category: 'Blood Pressure Screening'
  },
  {
    id: 6,
    src: imgTeam,
    alt: 'Medical staff and volunteers posing in front of the temple altar',
    month: 'June',
    year: '2026',
    category: 'Volunteers'
  },
  {
    id: 7,
    src: imgAwareness,
    alt: 'Volunteers presenting education pamphlets to seated villagers',
    month: 'June',
    year: '2026',
    category: 'Community'
  },
  {
    id: 8,
    src: imgDoctor,
    alt: 'Female doctor examining patient inside medical checkup tent',
    month: 'May',
    year: '2026',
    category: 'General Camp'
  },
  {
    id: 9,
    src: imgConsultation,
    alt: 'Registration and doctor consultation seats inside the temple hall',
    month: 'May',
    year: '2026',
    category: 'General Camp'
  }
];

export const videos = [
  {
    id: 'vid-1',
    title: 'Kalwakurthy Free Medical Camp Highlights',
    thumbnail: imgQueue,
    duration: '3:45',
    date: 'June 14, 2026',
    description: 'Visual recap of our June monthly camp highlights, patients served, and volunteer activities in Kalwakurthy.',
    videoUrl: 'https://youtube.com/shorts/4VJeRkI9Qvs?feature=share'
  },
  {
    id: 'vid-2',
    title: 'Cataract Surgery Program & Vision Restoration Impact',
    thumbnail: imgEye,
    duration: '5:12',
    date: 'May 10, 2026',
    description: 'Hear from our senior patients who received free cataract micro-surgeries and had their eyesight fully restored.',
    videoUrl: 'https://youtube.com/shorts/4VJeRkI9Qvs?feature=share'
  },
  {
    id: 'vid-3',
    title: 'Volunteers and Sevadal Behind the Scenes',
    thumbnail: imgTeam,
    duration: '2:30',
    date: 'April 12, 2026',
    description: 'A tribute to our passionate medical volunteers and Sevadal members managing the logisitics of the camp.',
    videoUrl: 'https://youtube.com/shorts/4VJeRkI9Qvs?feature=share'
  }
];
