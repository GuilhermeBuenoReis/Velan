import { router } from '@inertiajs/react';
import { Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { AppLayout } from '@/layouts/app-layout';
import { doctorList } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { ChatAssistantModal } from '../appointment/components/chat-assistant-modal';
import {
  type AppointmentData,
  useChatAssistant,
} from '../appointment/context/chat-assistant-context';
import { AppointmentScheduler } from './components/appointment-scheduler';
import { DoctorCard } from './components/doctor-card';
import { type Doctor, doctorsList } from './data/doctor';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Doctor-list', href: doctorList().url },
];

export default function DoctorList() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const { setAppointment, setStep, openChat } = useChatAssistant();

  function handleDoctorSelect({ id, name }: Doctor) {
    setAppointment((prev: AppointmentData) => ({
      ...prev,
      doctorId: id,
      doctorName: name,
    }));

    setStep('date');
    openChat();
    router.visit('/appointment');
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <ChatAssistantModal key="appointment-chat" />

          {!selectedDoctor && (
            <motion.div
              key="doctors-list"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
              className="min-h-screen"
            >
              <div
                className="px-6 py-12 relative overflow-hidden"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-secondary), var(--color-primary))',
                }}
              >
                <div className="max-w-6xl mx-auto relative">
                  <div className="flex items-center justify-between mb-4">
                    <motion.h1
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-white text-xl md:text-2xl font-semibold"
                    >
                      Especialistas recomendados para você
                    </motion.h1>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-white rounded-full blur-md opacity-50 animate-pulse"></div>
                      <div className="relative bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/30">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
                  {doctorsList.map((doctor, index) => (
                    <DoctorCard
                      key={doctor.id}
                      {...doctor}
                      index={index}
                      onClick={() => handleDoctorSelect(doctor)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {selectedDoctor && (
            <AppointmentScheduler
              key="appointment-scheduler"
              doctor={selectedDoctor}
              onBack={() => setSelectedDoctor(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}
