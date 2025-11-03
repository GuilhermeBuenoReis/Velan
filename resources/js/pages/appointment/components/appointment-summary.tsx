import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  MapPin,
  UserCircle2,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useChatAssistant } from '../context/chat-assistant-context';
import { DOCTORS } from '../data/index';
import { InfoRow } from './info-row';

export function AppointmentSummary() {
  const { appointment, onSubmitCurrentStep } = useChatAssistant();
  const doctor =
    DOCTORS.find(
      d => d.id === appointment.doctorId || d.name === appointment.doctorName
    ) ?? null;
  const doctorName =
    appointment.doctorName || doctor?.name || 'Profissional a definir';
  const initials = doctorName
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const specialty = doctor?.specialty ?? 'Especialidade não informada';
  const formattedDate = appointment.date
    ? dayjs(appointment.date).locale('pt-br').format('DD [de] MMMM [de] YYYY')
    : 'Data não selecionada';
  const formattedTime = appointment.time || 'Horário não selecionado';
  const primaryLocation =
    doctor?.locations?.[0]?.name ?? 'Local a definir com a equipe';
  const notes = appointment.notes?.trim();

  const handleConfirm = () => {
    onSubmitCurrentStep('confirmation');
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
          <AvatarImage src={doctor?.avatar} alt={doctorName} />
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
          <div className="text-sm text-[var(--color-text)]">{doctorName}</div>
          <div className="text-xs text-[var(--color-text-secondary)]">
            {specialty}
          </div>
        </div>
      </div>

      <div className="space-y-2 border-t border-[color:var(--color-primary)]/30 pt-2">
        <InfoRow icon={CalendarIcon} text={formattedDate} />
        <InfoRow icon={Clock} text={formattedTime} />
        <InfoRow icon={MapPin} text={primaryLocation} />
        <InfoRow icon={UserCircle2} text="Status: Pendente" />
      </div>

      {notes && (
        <div className="border-t border-[color:var(--color-primary)]/30 pt-2">
          <div className="text-xs text-[var(--color-text-secondary)]">
            Notes:
          </div>
          <div className="mt-1 text-xs text-[var(--color-text)]">{notes}</div>
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
