import { createRandomId } from '@/utils/create-random-id';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  description: string;
  rating: number;
  avatar: string;
  status: 'available-today' | 'upcoming';
  locations: { type: 'office' | 'online'; name: string }[];
  availableSlots: { date: string; times: string[] }[];
  keywords: string[];
}

export const doctorsList: Doctor[] = [
  {
    id: createRandomId(),
    name: 'Dr. Lucas Andrade',
    specialty: 'Cardiology',
    description:
      'Cardiologist focused on hypertension, arrhythmias, and preventive care plans.',
    rating: 4.9,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LucasAndrade',
    status: 'available-today',
    locations: [
      { type: 'office', name: 'PulseCare Heart Center' },
      { type: 'online', name: 'Velan Heart Virtual Clinic' },
    ],
    availableSlots: [
      { date: '26 Oct 2025', times: ['08:30', '10:30', '15:00'] },
      { date: '28 Oct 2025', times: ['09:00', '13:00', '16:30'] },
    ],
    keywords: [
      'chest pain',
      'blood pressure',
      'palpitations',
      'heart health',
      'fatigue',
    ],
  },
  {
    id: createRandomId(),
    name: 'Dr. Marina Couto',
    specialty: 'Dermatology',
    description:
      'Dermatologist treating acne, pigmentation disorders, and chronic skin conditions.',
    rating: 4.8,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MarinaCouto',
    status: 'upcoming',
    locations: [
      { type: 'office', name: 'Lumina Skin Studio' },
      { type: 'online', name: 'Velan Skin Teleconsultation' },
    ],
    availableSlots: [
      { date: '27 Oct 2025', times: ['09:30', '11:00', '14:30'] },
      { date: '29 Oct 2025', times: ['10:00', '13:30', '17:00'] },
    ],
    keywords: ['acne', 'eczema', 'rash', 'spots', 'allergy'],
  },
  {
    id: createRandomId(),
    name: 'Dr. Henrique Prado',
    specialty: 'Orthopedics',
    description:
      'Orthopedic surgeon managing sports injuries, joint pain, and post-op rehab.',
    rating: 4.7,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HenriquePrado',
    status: 'available-today',
    locations: [
      { type: 'office', name: 'MotionPlus Ortho Center' },
      { type: 'online', name: 'Velan Ortho e-Visit' },
    ],
    availableSlots: [
      { date: '26 Oct 2025', times: ['08:00', '10:15', '16:00'] },
      { date: '30 Oct 2025', times: ['09:45', '13:15', '18:00'] },
    ],
    keywords: [
      'knee pain',
      'back pain',
      'sports injury',
      'fracture',
      'mobility',
    ],
  },
  {
    id: createRandomId(),
    name: 'Dr. Sofia Menezes',
    specialty: 'Psychology',
    description:
      'Clinical psychologist specializing in anxiety, burnout, and behavioral therapy.',
    rating: 5.0,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SofiaMenezes',
    status: 'upcoming',
    locations: [
      { type: 'office', name: 'Mindful Harbor Studio' },
      { type: 'online', name: 'Velan Therapy Sessions' },
    ],
    availableSlots: [
      { date: '27 Oct 2025', times: ['09:00', '12:00', '17:30'] },
      { date: '31 Oct 2025', times: ['08:30', '11:30', '15:30'] },
    ],
    keywords: ['anxiety', 'stress', 'sleep', 'focus', 'therapy'],
  },
  {
    id: createRandomId(),
    name: 'Dr. Gabriel Moura',
    specialty: 'Neurology',
    description:
      'Neurologist caring for migraines, seizures, and neurodegenerative disorders.',
    rating: 4.8,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GabrielMoura',
    status: 'available-today',
    locations: [
      { type: 'office', name: 'Cortex Neuro Clinic' },
      { type: 'online', name: 'Velan NeuroCare Online' },
    ],
    availableSlots: [
      { date: '26 Oct 2025', times: ['10:00', '13:30', '16:30'] },
      { date: '29 Oct 2025', times: ['09:00', '11:15', '14:45'] },
    ],
    keywords: ['migraine', 'seizure', 'dizziness', 'memory loss', 'neuropathy'],
  },
  {
    id: createRandomId(),
    name: 'Dr. Elisa Pacheco',
    specialty: 'Endocrinology',
    description:
      'Endocrinologist focusing on diabetes, thyroid balance, and metabolic disorders.',
    rating: 4.7,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ElisaPacheco',
    status: 'upcoming',
    locations: [
      { type: 'office', name: 'Metabolic Harmony Center' },
      { type: 'online', name: 'Velan Endo Virtual Care' },
    ],
    availableSlots: [
      { date: '28 Oct 2025', times: ['08:45', '11:30', '15:00'] },
      { date: '30 Oct 2025', times: ['09:15', '12:45', '17:00'] },
    ],
    keywords: ['diabetes', 'thyroid', 'hormones', 'weight gain', 'fatigue'],
  },
  {
    id: createRandomId(),
    name: 'Dr. Bruno Tavares',
    specialty: 'Pediatrics',
    description:
      'Pediatrician helping families with growth, immunization, and common infections.',
    rating: 4.9,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BrunoTavares',
    status: 'available-today',
    locations: [
      { type: 'office', name: 'BrightSteps Pediatric Care' },
      { type: 'online', name: 'Velan Kids e-Clinic' },
    ],
    availableSlots: [
      { date: '25 Oct 2025', times: ['09:00', '11:00', '14:00'] },
      { date: '29 Oct 2025', times: ['08:30', '13:00', '16:30'] },
    ],
    keywords: ['fever', 'cough', 'vaccination', 'nutrition', 'allergies'],
  },
  {
    id: createRandomId(),
    name: 'Dr. Carolina Sousa',
    specialty: 'Nutrition',
    description:
      'Clinical nutritionist crafting plans for metabolic health, sports, and gut balance.',
    rating: 4.6,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CarolinaSousa',
    status: 'upcoming',
    locations: [
      { type: 'office', name: 'BalanceFuel Nutrition Lab' },
      { type: 'online', name: 'Velan Nutrition Coaching' },
    ],
    availableSlots: [
      { date: '27 Oct 2025', times: ['10:00', '12:30', '17:00'] },
      { date: '01 Nov 2025', times: ['09:15', '11:45', '15:30'] },
    ],
    keywords: ['meal plan', 'weight loss', 'sports', 'gut health'],
  },
  {
    id: createRandomId(),
    name: 'Dr. Rafael Lima',
    specialty: 'Psychiatry',
    description:
      'Psychiatrist experienced in mood disorders, ADHD, and medication management.',
    rating: 4.8,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RafaelLima',
    status: 'available-today',
    locations: [
      { type: 'office', name: 'HarborMind Psychiatric Suite' },
      { type: 'online', name: 'Velan Mental Health Portal' },
    ],
    availableSlots: [
      { date: '26 Oct 2025', times: ['09:30', '12:00', '18:00'] },
      { date: '30 Oct 2025', times: ['08:30', '11:30', '15:30'] },
    ],
    keywords: ['depression', 'adhd', 'insomnia', 'mood swings', 'medication'],
  },
  {
    id: createRandomId(),
    name: 'Dr. Helena Duarte',
    specialty: 'Gastroenterology',
    description:
      'Gastroenterologist handling reflux, IBS, and liver-related conditions.',
    rating: 4.7,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HelenaDuarte',
    status: 'upcoming',
    locations: [
      { type: 'office', name: 'Digestive Wellness Institute' },
      { type: 'online', name: 'Velan Gut Health Online' },
    ],
    availableSlots: [
      { date: '28 Oct 2025', times: ['09:00', '11:45', '16:15'] },
      { date: '31 Oct 2025', times: ['08:30', '13:00', '17:30'] },
    ],
    keywords: ['reflux', 'ibs', 'bloating', 'stomach pain', 'liver'],
  },
  {
    id: createRandomId(),
    name: 'Dr. Olivia Nunes',
    specialty: 'Gynecology',
    description:
      'Gynecologist focusing on reproductive health, prenatal care, and hormone balance.',
    rating: 4.9,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=OliviaNunes',
    status: 'available-today',
    locations: [
      { type: 'office', name: 'Bloom Women’s Center' },
      { type: 'online', name: 'Velan Women Virtual Care' },
    ],
    availableSlots: [
      { date: '25 Oct 2025', times: ['08:30', '10:00', '15:00'] },
      { date: '29 Oct 2025', times: ['09:15', '12:45', '17:00'] },
    ],
    keywords: [
      'prenatal',
      'fertility',
      'pcos',
      'cycle irregularity',
      'pelvic pain',
    ],
  },
  {
    id: createRandomId(),
    name: 'Dr. Victor Araujo',
    specialty: 'Ophthalmology',
    description:
      'Ophthalmologist treating dry eyes, glaucoma screenings, and refractive issues.',
    rating: 4.6,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VictorAraujo',
    status: 'upcoming',
    locations: [
      { type: 'office', name: 'Clarity Vision Lounge' },
      { type: 'online', name: 'Velan EyeCare Remote' },
    ],
    availableSlots: [
      { date: '27 Oct 2025', times: ['09:00', '11:30', '16:00'] },
      { date: '30 Oct 2025', times: ['10:00', '13:00', '18:00'] },
    ],
    keywords: ['dry eyes', 'glaucoma', 'blurry vision', 'screen strain'],
  },
  {
    id: createRandomId(),
    name: 'Dr. Teresa Figueiredo',
    specialty: 'Rheumatology',
    description:
      'Rheumatologist supporting patients with arthritis, lupus, and chronic inflammation.',
    rating: 4.8,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TeresaFigueiredo',
    status: 'available-today',
    locations: [
      { type: 'office', name: 'JointRelief Rheuma Center' },
      { type: 'online', name: 'Velan Rheuma Televisit' },
    ],
    availableSlots: [
      { date: '26 Oct 2025', times: ['08:45', '11:15', '15:30'] },
      { date: '01 Nov 2025', times: ['09:00', '12:30', '17:30'] },
    ],
    keywords: [
      'arthritis',
      'joint swelling',
      'autoimmune',
      'stiffness',
      'pain',
    ],
  },
  {
    id: createRandomId(),
    name: 'Dr. Felipe Barros',
    specialty: 'Physiotherapy',
    description:
      'Physiotherapist guiding rehab for posture, mobility, and chronic pain relief.',
    rating: 4.7,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=FelipeBarros',
    status: 'upcoming',
    locations: [
      { type: 'office', name: 'AlignWorks Physio Lab' },
      { type: 'online', name: 'Velan Physio Remote' },
    ],
    availableSlots: [
      { date: '28 Oct 2025', times: ['09:30', '12:00', '16:15'] },
      { date: '02 Nov 2025', times: ['08:30', '11:15', '14:45'] },
    ],
    keywords: ['posture', 'rehab', 'mobility', 'muscle pain', 'exercise'],
  },
  {
    id: createRandomId(),
    name: 'Dr. Daniela Freitas',
    specialty: 'Urology',
    description:
      'Urologist managing kidney stones, urinary infections, and prostate health.',
    rating: 4.8,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DanielaFreitas',
    status: 'available-today',
    locations: [
      { type: 'office', name: 'ClearFlow Uro Clinic' },
      { type: 'online', name: 'Velan Uro Virtual Desk' },
    ],
    availableSlots: [
      { date: '25 Oct 2025', times: ['09:00', '11:30', '15:00'] },
      { date: '29 Oct 2025', times: ['08:45', '13:15', '17:15'] },
    ],
    keywords: [
      'kidney stone',
      'burning urine',
      'prostate',
      'frequent urination',
    ],
  },
  {
    id: createRandomId(),
    name: 'Dr. Miguel Correia',
    specialty: 'Nephrology',
    description:
      'Nephrologist following chronic kidney disease, dialysis planning, and electrolyte care.',
    rating: 4.9,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MiguelCorreia',
    status: 'upcoming',
    locations: [
      { type: 'office', name: 'RenalGuard Specialty Hub' },
      { type: 'online', name: 'Velan Renal Teleclinic' },
    ],
    availableSlots: [
      { date: '28 Oct 2025', times: ['10:00', '12:30', '16:30'] },
      { date: '03 Nov 2025', times: ['09:15', '11:45', '18:00'] },
    ],
    keywords: [
      'kidney disease',
      'dialysis',
      'fluid retention',
      'electrolytes',
      'bp control',
    ],
  },
  {
    id: createRandomId(),
    name: 'Dr. Laura Bastos',
    specialty: 'Otolaryngology',
    description:
      'ENT specialist skilled with sinusitis, ear infections, and voice issues.',
    rating: 4.6,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LauraBastos',
    status: 'available-today',
    locations: [
      { type: 'office', name: 'ClearAir ENT Center' },
      { type: 'online', name: 'Velan ENT Digital Visit' },
    ],
    availableSlots: [
      { date: '26 Oct 2025', times: ['09:00', '11:30', '17:00'] },
      { date: '01 Nov 2025', times: ['08:45', '12:15', '16:45'] },
    ],
    keywords: ['sinus', 'ear pain', 'hoarseness', 'allergy', 'snoring'],
  },
  {
    id: createRandomId(),
    name: 'Dr. Pedro Salles',
    specialty: 'Oncology',
    description:
      'Medical oncologist coordinating targeted therapies and supportive cancer care.',
    rating: 4.9,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PedroSalles',
    status: 'upcoming',
    locations: [
      { type: 'office', name: 'HopeBridge Cancer Center' },
      { type: 'online', name: 'Velan Oncology Navigator' },
    ],
    availableSlots: [
      { date: '29 Oct 2025', times: ['09:30', '13:00', '15:30'] },
      { date: '04 Nov 2025', times: ['10:00', '12:45', '17:15'] },
    ],
    keywords: ['chemotherapy', 'tumor', 'fatigue', 'follow-up', 'support'],
  },
  {
    id: createRandomId(),
    name: 'Dr. Camila Rezende',
    specialty: 'Pulmonology',
    description:
      'Pulmonologist addressing asthma, sleep apnea, and chronic cough management.',
    rating: 4.7,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CamilaRezende',
    status: 'available-today',
    locations: [
      { type: 'office', name: 'Airway Care Pavilion' },
      { type: 'online', name: 'Velan Lung Health Online' },
    ],
    availableSlots: [
      { date: '25 Oct 2025', times: ['08:30', '11:00', '14:30'] },
      { date: '30 Oct 2025', times: ['09:45', '13:15', '18:00'] },
    ],
    keywords: [
      'asthma',
      'short breath',
      'chronic cough',
      'sleep apnea',
      'smoking',
    ],
  },
  {
    id: createRandomId(),
    name: 'Dr. André Moretti',
    specialty: 'General Medicine',
    description:
      'Primary care physician managing annual exams, chronic conditions, and triage.',
    rating: 4.8,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AndreMoretti',
    status: 'upcoming',
    locations: [
      { type: 'office', name: 'Gateway Family Practice' },
      { type: 'online', name: 'Velan Primary Virtual Visit' },
    ],
    availableSlots: [
      { date: '27 Oct 2025', times: ['08:00', '10:30', '15:30'] },
      { date: '02 Nov 2025', times: ['09:00', '12:00', '17:00'] },
    ],
    keywords: [
      'checkup',
      'blood pressure',
      'cholesterol',
      'fatigue',
      'prevention',
    ],
  },
];
