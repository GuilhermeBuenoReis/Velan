import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Video,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import type { Doctor } from '../data/doctor';

interface AppointmentSchedulerProps {
  doctor: Doctor;
  onBack: () => void;
}

export function AppointmentScheduler({
  doctor,
  onBack,
}: AppointmentSchedulerProps) {
  const [selectedLocation, setSelectedLocation] = useState<string>(
    doctor.locations[0].name
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    doctor.availableSlots[0].date
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const currentSlots = doctor.availableSlots.find(
    slot => slot.date === selectedDate
  );

  const handleConfirm = () => {
    setIsConfirmed(true);
    setTimeout(() => {
      setIsConfirmed(false);
      onBack();
    }, 3000);
  };

  if (isConfirmed) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          background: 'linear-gradient(135deg, var(--color-secondary), var(--color-primary))',
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-12 text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
          </motion.div>
          <h2 className="text-gray-900 mb-3">Consulta confirmada!</h2>
          <p className="text-gray-600 mb-2">
            {selectedDate} às {selectedTime}
          </p>
          <p className="text-gray-600">
            com <span className="text-[var(--color-primary)]">{doctor.name}</span>
          </p>
          <p className="text-gray-500 mt-4 text-sm">
            Você receberá um e-mail com os detalhes da consulta
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Header */}
      <div
        className="px-6 pt-8 pb-24 relative"
        style={{
          background: 'linear-gradient(135deg, var(--color-secondary), var(--color-primary))',
        }}
      >
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-white mb-6 hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar</span>
        </button>

        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <Avatar className="h-28 w-28 border-4 border-white shadow-xl">
              <AvatarImage src={doctor.image} alt={doctor.name} />
              <AvatarFallback className="bg-white text-[var(--color-secondary)]">
                {getInitials(doctor.name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <h2 className="text-white mb-2">{doctor.name}</h2>
          <p className="text-blue-100 mb-2">{doctor.specialty}</p>
          <div className="flex items-center gap-1">
            <span className="text-white">⭐ {doctor.rating.toFixed(1)}</span>
            <span className="text-blue-100">/ 5</span>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-16 pb-32">
        <div className="bg-white rounded-3xl shadow-xl p-6 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
              <h3 className="text-gray-900">Local de atendimento</h3>
            </div>
            <div className="grid gap-3">
              {doctor.locations.map((location, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => setSelectedLocation(location.name)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                    selectedLocation === location.name
                      ? 'border-[var(--color-primary)] bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {location.type === 'online' ? (
                    <Video className="w-5 h-5 text-[var(--color-primary)]" />
                  ) : (
                    <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
                  )}
                  <span className="text-gray-900">{location.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-[var(--color-primary)]" />
              <h3 className="text-gray-900">Selecione a data</h3>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {doctor.availableSlots.map((slot, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => {
                    setSelectedDate(slot.date);
                    setSelectedTime(null);
                  }}
                  className={`flex-shrink-0 px-6 py-3 rounded-2xl border-2 transition-all ${
                    selectedDate === slot.date
                      ? 'border-[var(--color-primary)] bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-gray-900 whitespace-nowrap">
                    {slot.date}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-[var(--color-primary)]" />
              <h3 className="text-gray-900">Horários disponíveis</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {currentSlots?.times.map((time, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => setSelectedTime(time)}
                  className={`px-4 py-3 rounded-2xl border-2 transition-all ${
                    selectedTime === time
                      ? 'border-[var(--color-primary)] text-white'
                      : 'border-gray-200 hover:border-gray-300 text-gray-900'
                  }`}
                  style={
                    selectedTime === time
                      ? {
                          backgroundImage:
                            'linear-gradient(to right, var(--color-secondary), var(--color-primary))',
                        }
                      : undefined
                  }
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-6 shadow-lg">
        <div className="max-w-2xl mx-auto">
          <Button
            disabled={!selectedTime}
            onClick={handleConfirm}
            className="w-full hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl shadow-lg py-6"
            style={{
              backgroundImage: 'linear-gradient(to right, var(--color-secondary), var(--color-primary))',
            }}
          >
            Confirmar Consulta
          </Button>
          {selectedTime && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-gray-600 mt-3 text-sm"
            >
              {selectedDate} às {selectedTime} • {selectedLocation}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
