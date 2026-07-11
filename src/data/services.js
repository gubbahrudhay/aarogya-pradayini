import {
  Stethoscope,
  Heart,
  Eye,
} from 'lucide-react';

export const services = [
  {
    id: 1,
    icon: Stethoscope,
    title: 'General Medicine & Diagnostics',
    description:
      'Comprehensive medical consultations by experienced physicians, combined with instant blood sugar (diabetes) testing, blood pressure (hypertension) screening, and free diagnostic evaluations.',
    color: 'from-blue-500 to-blue-700',
    lightColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    id: 2,
    icon: Heart,
    title: 'Specialist Cardiology Care',
    description:
      'Specialist cardiac evaluations including ECG tests, heart health assessments, risk screening, and consultations with whitelisted cardiology experts.',
    color: 'from-red-500 to-red-700',
    lightColor: 'bg-red-50',
    iconColor: 'text-red-600',
  },
  {
    id: 3,
    icon: Eye,
    title: 'Ophthalmology & Cataract Care',
    description:
      'Comprehensive vision screening, cataract detection, and completely funded stitchless cataract surgeries (IOL transplants) performed by specialist surgeons.',
    color: 'from-teal-500 to-teal-700',
    lightColor: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
];
