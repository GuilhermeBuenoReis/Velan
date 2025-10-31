import { Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { AppLayout } from '@/layouts/app-layout';
import { doctorList } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { AppointmentChat } from '../appointment/components/chat-assistant-modal';
import { AppointmentScheduler } from './components/appointment-scheduler';
import { DoctorCard } from './components/doctor-card';
import { type Doctor, doctorsList } from './data/doctor';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Doctor-list',
    href: doctorList().url,
  },
];

export default function DoctorList() {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showChat, setShowChat] = useState(true);
  const [showDoctorsList, setShowDoctorsList] = useState(false);

  function handleShowDoctors() {
    setShowChat(false);
    setTimeout(() => setShowDoctorsList(true), 300);
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {showChat && (
            <AppointmentChat
              key="appointment-chat"
              open={showChat}
              onClose={handleShowDoctors}
            />
          )}

          {!showChat && !selectedDoctor && showDoctorsList && (
            <motion.div
              key="doctors-list"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
              className="min-h-screen"
            >
              {/* Header */}
              <div
                className="px-6 py-12 relative overflow-hidden"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-secondary), var(--color-primary))',
                }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl"></div>

                <div className="max-w-6xl mx-auto relative">
                  <div className="flex items-center justify-between mb-4">
                    <motion.h1
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-white text-xl md:text-2xl font-semibold"
                    >
                      Especialistas recomendados para você
                    </motion.h1>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="relative"
                    >
                      <div className="absolute inset-0 bg-white rounded-full blur-md opacity-50 animate-pulse"></div>
                      <div className="relative bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/30">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                    </motion.div>
                  </div>
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-blue-100"
                  >
                    Baseado nos sintomas informados à assistente
                  </motion.p>
                </div>
              </div>

              <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
                  {doctorsList.map((doctor, index) => (
                    <DoctorCard
                      key={doctor.id}
                      {...doctor}
                      index={index}
                      onClick={() => setSelectedDoctor(doctor)}
                    />
                  ))}
                </div>
              </div>

              {/* Fixed Footer CTA */}
              <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-6 py-6 shadow-lg">
                <div className="max-w-6xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center"
                  >
                    <p className="text-gray-700 mb-3">
                      Escolha o profissional ideal e veja os horários
                      disponíveis
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <div
                        className="h-1 w-12 rounded-full"
                        style={{
                          backgroundImage:
                            'linear-gradient(to right, var(--color-secondary), var(--color-primary))',
                        }}
                      ></div>
                      <span className="text-gray-500 text-sm">
                        Agendamento rápido e fácil
                      </span>
                      <div
                        className="h-1 w-12 rounded-full"
                        style={{
                          backgroundImage:
                            'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
                        }}
                      ></div>
                    </div>
                  </motion.div>
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
