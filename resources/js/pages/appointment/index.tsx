import { Head } from '@inertiajs/react';
import dayjs from 'dayjs';
import { motion } from 'motion/react';
import { AppLayout } from '@/layouts/app-layout';
import { WeeklySchedule } from '@/pages/appointment/components/weekly-schedule';
import { appointment } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { createRandomId } from '@/utils/create-random-id';

dayjs.locale('pt-br');

export interface Appointment {
  id: string;
  patient: string;
  patientAvatar?: string;
  doctor: string;
  doctorAvatar?: string;
  specialty: string;
  date: string;
  time: string;
  endTime: string;
  type: 'Presencial' | 'Online';
  status: 'Confirmada' | 'Pendente' | 'Cancelada';
  notes?: string;
  dayOfWeek?: string;
}

const baseWeek = dayjs().startOf('week').add(1, 'day'); // segunda

export const appointments: Appointment[] = [
  {
    id: createRandomId(),
    patient: 'Carlos Eduardo',
    patientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    doctor: 'Dr. João Silva',
    doctorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao',
    specialty: 'Cardiologia',
    date: baseWeek.add(1, 'day').format('DD/MM/YYYY'),
    time: '09:00',
    endTime: '09:30',
    type: 'Presencial' as const,
    status: 'Confirmada' as const,
    notes: 'Retorno - Avaliar resultados de exames cardiológicos',
  },
  {
    id: createRandomId(),
    patient: 'Maria Fernanda',
    patientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    doctor: 'Dra. Ana Beatriz',
    doctorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    specialty: 'Dermatologia',
    date: baseWeek.add(1, 'day').format('DD/MM/YYYY'),
    time: '10:30',
    endTime: '11:00',
    type: 'Online' as const,
    status: 'Pendente' as const,
    notes: 'Consulta inicial - Avaliação de manchas na pele',
  },
  {
    id: createRandomId(),
    patient: 'Pedro Santos',
    patientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
    doctor: 'Dr. Ricardo Fernandes',
    doctorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ricardo',
    specialty: 'Ortopedia',
    date: baseWeek.add(2, 'day').format('DD/MM/YYYY'),
    time: '14:00',
    endTime: '14:30',
    type: 'Presencial' as const,
    status: 'Confirmada' as const,
    notes: 'Avaliação de dor no joelho',
  },
  {
    id: createRandomId(),
    patient: 'Juliana Costa',
    patientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana',
    doctor: 'Dra. Mariana Costa',
    doctorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mariana',
    specialty: 'Oftalmologia',
    date: baseWeek.add(3, 'day').format('DD/MM/YYYY'),
    time: '09:15',
    endTime: '09:45',
    type: 'Presencial' as const,
    status: 'Confirmada' as const,
    notes: 'Exame de rotina - Renovação de receita de óculos',
  },
  {
    id: createRandomId(),
    patient: 'Roberto Almeida',
    patientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto',
    doctor: 'Dr. Paulo Mendes',
    doctorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Paulo',
    specialty: 'Clínico Geral',
    date: baseWeek.add(4, 'day').format('DD/MM/YYYY'),
    time: '11:00',
    endTime: '11:30',
    type: 'Online' as const,
    status: 'Pendente' as const,
    notes: 'Consulta de rotina',
  },
  {
    id: createRandomId(),
    patient: 'Lucas Barbosa',
    patientAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
    doctor: 'Dra. Ana Beatriz',
    doctorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    specialty: 'Dermatologia',
    date: baseWeek.add(5, 'day').format('DD/MM/YYYY'),
    time: '15:00',
    endTime: '15:30',
    type: 'Presencial' as const,
    status: 'Cancelada' as const,
    notes: 'Consulta desmarcada pelo paciente',
  },
];

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Consultas',
    href: appointment().url,
  },
];

export function Appointment() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Consultas" />
      <main className="w-full min-h-screen bg-[#0D0D15] flex flex-col items-center justify-start text-gray-200">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full flex flex-col items-center"
        >
          <div className="w-full flex flex-col items-center text-center mt-6 mb-4">
            <h1 className="text-xl font-semibold text-white">Consultas</h1>
            <p className="text-sm text-gray-400">
              Gerencie todas as consultas agendadas e o histórico de
              atendimentos
            </p>
          </div>

          <div className="flex justify-center w-full">
            <WeeklySchedule appointments={appointments} />
          </div>
        </motion.div>
      </main>
    </AppLayout>
  );
}
