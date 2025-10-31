import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Doctor } from '@/pages/doctor-list/data/doctor';
import { useChatAssistant } from '../context/chat-assistant-context';

interface DoctorOptionProps {
  doctor: Doctor;
}

export function DoctorOption({ doctor }: DoctorOptionProps) {
  const { onSubmitCurrentStep } = useChatAssistant();

  const initials = doctor.name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleSelectDoctor = () => {
    onSubmitCurrentStep('doctor', {
      doctorId: doctor.id,
      doctorName: doctor.name,
    });
  };

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleSelectDoctor}
      className="flex w-full items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-3 text-left transition hover:border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/8"
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={doctor.avatar} alt={doctor.name} />
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
        <div className="text-sm text-[var(--color-text)]">{doctor.name}</div>
        <div className="text-xs text-[var(--color-text-secondary)]">
          {doctor.specialty}
        </div>
      </div>
    </motion.button>
  );
}
