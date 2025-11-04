import { Head } from '@inertiajs/react';
import { motion } from 'motion/react';
import { AppLayout } from '@/layouts/app-layout';
import { appointment } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { CalendarHeader } from './components/calendar-header';
import { DayView } from './components/day-view';
import { EventDetailsModal } from './components/event-details-modal';
import { MonthView } from './components/month-view';
import { NewAppointmentModal } from './components/new-appointment-modal';
import { WeekView } from './components/week-view';
import { YearView } from './components/year-view';
import { CalendarProvider, useCalendar } from './context/calendar-context';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Consultas',
    href: appointment().url,
  },
];

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
    </>
  );
}

export function Appointment() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Consultas" />
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
          </motion.div>
        </main>
      </CalendarProvider>
    </AppLayout>
  );
}
