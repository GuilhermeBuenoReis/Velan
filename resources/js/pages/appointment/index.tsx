import { Head } from '@inertiajs/react';
import { MessageSquare, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AppLayout } from '@/layouts/app-layout';

import { appointment } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { CalendarHeader } from './components/calendar-header';
import { ChatAssistantModal } from './components/chat-assistant-modal';
import { DayView } from './components/day-view';
import { EventDetailsModal } from './components/event-details-modal';
import { MonthView } from './components/month-view';
import { NewAppointmentModal } from './components/new-appointment-modal';
import { WeekView } from './components/week-view';
import { YearView } from './components/year-view';
import { CalendarProvider, useCalendar } from './context/calendar-context';
import {
  ChatAssistantProvider,
  useChatAssistant,
} from './context/chat-assistant-context';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Consultas',
    href: appointment().url,
  },
];

function FloatingActions() {
  const { openEventModal } = useCalendar();
  const { openChat } = useChatAssistant();

  return (
    <div className="fixed bottom-8 right-8 z-20 flex flex-col gap-3">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={openChat}
            className="h-14 w-14 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-shadow relative group"
            size="icon"
          >
            <MessageSquare className="h-6 w-6" />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="absolute right-full mr-3 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Assistente IA
            </div>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-shadow group"
                size="icon"
              >
                <Plus className="h-6 w-6" />
                <div className="absolute right-full mr-3 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Nova Consulta
                </div>
              </Button>
            </motion.div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={openChat}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Agendar com Assistente
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => openEventModal()}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Manualmente
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    </div>
  );
}

function CalendarContent() {
  const { currentView } = useCalendar();

  return (
    <>
      {currentView === 'day' && <DayView />}
      {currentView === 'week' && <WeekView />}
      {currentView === 'month' && <MonthView />}
      {currentView === 'year' && <YearView />}

      <EventDetailsModal />
      <NewAppointmentModal />
      <ChatAssistantModal />
    </>
  );
}

export function Appointment() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Consultas" />

      <ChatAssistantProvider>
        <CalendarProvider>
          <main className="w-full min-h-screen flex flex-col text-gray-200">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="text-center mt-6 mb-4">
                <h1 className="text-xl font-semibold text-white">Consultas</h1>
                <p className="text-sm text-gray-400">
                  Gerencie, edite e acompanhe seus agendamentos em tempo real
                </p>
              </div>

              <CalendarHeader />
              <CalendarContent />
              <FloatingActions />
            </motion.div>
          </main>
        </CalendarProvider>
      </ChatAssistantProvider>
    </AppLayout>
  );
}
