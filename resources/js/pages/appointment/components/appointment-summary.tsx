import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  MapPin,
  UserCircle2,
  Video,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useChatAssistant } from '../context/chat-assistant-context';
import { DOCTORS } from '../data/index';
import { InfoRow } from './info-row';

export interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  endTime: string;
  type: 'Presencial' | 'Online';
  status: 'Confirmada' | 'Pendente' | 'Cancelada';
  notes?: string;
}

export function AppointmentSummary() {
  const { onSubmitCurrentStep } = useChatAssistant();

  const appointment: Appointment = {
    id: '1',
    patient: 'Carlos Eduardo',
    doctor: 'Dr. João Silva',
    specialty: 'Cardiologista',
    date: '2025-10-30',
    time: '10:00 AM',
    endTime: '11:00 AM',
    type: 'Online',
    status: 'Pendente',
    notes: 'Consulta para acompanhamento de rotina',
  };

  const doctor = DOCTORS.find(d => d.name === appointment.doctor);
  const initials = appointment.doctor
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleConfirm = () => {
    onSubmitCurrentStep('success', undefined);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-3 space-y-3 rounded-xl border p-4"
      style={{
        background:
          'linear-gradient(135deg, color-mix(in srgb, var(--color-secondary) 12%, transparent), color-mix(in srgb, var(--color-primary) 12%, transparent))',
        borderColor:
          'color-mix(in srgb, var(--color-primary) 25%, transparent)',
      }}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={doctor?.avatar} alt={appointment.doctor} />
          <AvatarFallback
            className="text-white"
            style={{
              backgroundImage:
                'linear-gradient(135deg, var(--color-secondary), var(--color-primary))',
            }}
          >
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm text-[var(--color-text)]">
            {appointment.doctor}
          </div>
          <div className="text-xs text-[var(--color-text-secondary)]">
            {appointment.specialty}
          </div>
        </div>
      </div>

      <div className="space-y-2 border-t border-[color:var(--color-primary)]/30 pt-2">
        <InfoRow
          icon={CalendarIcon}
          text={new Date(appointment.date).toDateString()}
        />
        <InfoRow
          icon={Clock}
          text={`${appointment.time} - ${appointment.endTime}`}
        />
        <InfoRow
          icon={appointment.type === 'Online' ? Video : MapPin}
          text={
            appointment.type === 'Online'
              ? 'Online Consultation'
              : 'Medical Center - Main Building'
          }
        />
        <InfoRow icon={UserCircle2} text={`Status: ${appointment.status}`} />
      </div>

      {appointment.notes && (
        <div className="border-t border-[color:var(--color-primary)]/30 pt-2">
          <div className="text-xs text-[var(--color-text-secondary)]">
            Notes:
          </div>
          <div className="mt-1 text-xs text-[var(--color-text)]">
            {appointment.notes}
          </div>
        </div>
      )}

      <Button
        onClick={handleConfirm}
        className="w-full text-white"
        size="sm"
        style={{
          backgroundImage:
            'linear-gradient(135deg, var(--color-secondary), var(--color-primary))',
        }}
      >
        <CheckCircle2 className="mr-2 h-4 w-4" />
        Confirm Appointment
      </Button>
    </motion.div>
  );
}
