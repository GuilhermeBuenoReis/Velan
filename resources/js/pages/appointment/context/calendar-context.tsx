import { router, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { appointment as appointmentRoute } from '@/routes';
import type { SharedData } from '@/types';
import type { AppointmentDto } from '../types/appointment';
import type { CalendarEvent } from '../types/event';

dayjs.locale('pt-br');

export type CalendarView = 'day' | 'week' | 'month' | 'year';

type OpenEventModalOptions = {
  event?: CalendarEvent;
  date?: string;
};

interface CalendarContextType {
  currentDate: dayjs.Dayjs;
  currentView: CalendarView;
  setDate: (value: dayjs.Dayjs) => void;
  goNext: () => void;
  goPrevious: () => void;
  goToday: () => void;
  setView: (value: CalendarView) => void;
  events: CalendarEvent[];
  isLoading: boolean;
  refreshAppointments: () => void;
  selectedEvent: CalendarEvent | null;
  setSelectedEvent: (event: CalendarEvent | null) => void;
  draftEventDate: string | null;
  isEventModalOpen: boolean;
  openEventModal: (options?: OpenEventModalOptions) => void;
  closeEventModal: () => void;
  weekDaysShort: string[];
  weekDaysFull: string[];
}

type AppointmentPageProps = SharedData & {
  appointments?: AppointmentDto[];
  filters?: {
    date?: string;
    view?: CalendarView;
  };
};

const WEEK_DAYS_PT_SHORT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const WEEK_DAYS_PT_FULL = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

const DEFAULT_VIEW: CalendarView = 'month';

const CalendarContext = createContext<CalendarContextType | null>(null);

const mapAppointmentToEvent = (appointment: AppointmentDto): CalendarEvent => {
  const start = dayjs(`${appointment.date} ${appointment.start_time}`);
  const durationMinutes = Number(appointment.duration) || 60;
  const end = start.add(durationMinutes, 'minute');

  return {
    id: String(appointment.id),
    title: appointment.title,
    date: appointment.date,
    time: `${start.format('HH:mm')} - ${end.format('HH:mm')}`,
    startHour: start.hour(),
    startMinute: start.minute(),
    durationHours: Math.max(durationMinutes / 60, 0.5),
    color: appointment.event_type,
    location: appointment.location ?? undefined,
    doctor: appointment.doctor ?? undefined,
    notes: appointment.notes ?? undefined,
  };
};

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const page = usePage<AppointmentPageProps>();
  const filters = page.props.filters ?? {
    date: dayjs().format('YYYY-MM-DD'),
    view: DEFAULT_VIEW,
  };
  const appointments = page.props.appointments ?? [];

  const [optimisticFilters, setOptimisticFilters] = useState<{
    date?: string;
    view?: CalendarView;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [draftEventDate, setDraftEventDate] = useState<string | null>(null);

  useEffect(() => {
    setOptimisticFilters(null);
  }, [filters.date, filters.view]);

  const resolvedDate =
    optimisticFilters?.date ?? filters.date ?? dayjs().format('YYYY-MM-DD');
  const resolvedView =
    optimisticFilters?.view ??
    (filters.view && ['day', 'week', 'month', 'year'].includes(filters.view)
      ? (filters.view as CalendarView)
      : DEFAULT_VIEW);

  const currentDate = useMemo(() => dayjs(resolvedDate), [resolvedDate]);
  const currentView = resolvedView;

  const events = useMemo(() => {
    return [...appointments.map(mapAppointmentToEvent)].sort((a, b) => {
      const dateDiff = dayjs(a.date).diff(dayjs(b.date));
      if (dateDiff !== 0) {
        return dateDiff;
      }

      if (a.startHour !== b.startHour) {
        return a.startHour - b.startHour;
      }

      return a.startMinute - b.startMinute;
    });
  }, [appointments]);

  const requestAppointments = useCallback(
    (
      target: { date?: dayjs.Dayjs; view?: CalendarView },
      options?: { preserveScroll?: boolean }
    ) => {
      const nextDate = target.date ?? currentDate;
      const nextView = target.view ?? currentView;
      const formattedDate = nextDate.format('YYYY-MM-DD');

      setIsLoading(true);
      setOptimisticFilters({ date: formattedDate, view: nextView });

      router.get(
        appointmentRoute.url({
          query: {
            date: formattedDate,
            view: nextView,
          },
        }),
        {},
        {
          preserveState: true,
          preserveScroll: options?.preserveScroll ?? true,
          only: ['appointments', 'filters'],
          onSuccess: () => setOptimisticFilters(null),
          onError: () => setOptimisticFilters(null),
          onFinish: () => setIsLoading(false),
        }
      );
    },
    [currentDate, currentView]
  );

  const refreshAppointments = useCallback(() => {
    setIsLoading(true);
    router.reload({
      only: ['appointments', 'filters'],
      onSuccess: () => setOptimisticFilters(null),
      onError: () => setOptimisticFilters(null),
      onFinish: () => setIsLoading(false),
    });
  }, []);

  const setDate = useCallback(
    (value: dayjs.Dayjs) => {
      if (value.isSame(currentDate, 'day')) {
        return;
      }
      requestAppointments({ date: value });
    },
    [currentDate, requestAppointments]
  );

  const goNext = useCallback(() => {
    requestAppointments({ date: currentDate.add(1, currentView) });
  }, [currentDate, currentView, requestAppointments]);

  const goPrevious = useCallback(() => {
    requestAppointments({ date: currentDate.subtract(1, currentView) });
  }, [currentDate, currentView, requestAppointments]);

  const goToday = useCallback(() => {
    requestAppointments({ date: dayjs() });
  }, [requestAppointments]);

  const setView = useCallback(
    (value: CalendarView) => {
      if (value === currentView) {
        return;
      }
      requestAppointments({ view: value });
    },
    [currentView, requestAppointments]
  );

  const openEventModal = useCallback(
    (options: OpenEventModalOptions = {}) => {
      const { event, date } = options;
      if (event) {
        setSelectedEvent(event);
        setDraftEventDate(event.date);
      } else {
        setSelectedEvent(null);
        setDraftEventDate(date ?? currentDate.format('YYYY-MM-DD'));
      }
      setIsEventModalOpen(true);
    },
    [currentDate]
  );

  const closeEventModal = useCallback(() => {
    setSelectedEvent(null);
    setDraftEventDate(null);
    setIsEventModalOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      currentDate,
      currentView,
      setDate,
      goNext,
      goPrevious,
      goToday,
      setView,
      events,
      isLoading,
      refreshAppointments,
      selectedEvent,
      setSelectedEvent,
      draftEventDate,
      isEventModalOpen,
      openEventModal,
      closeEventModal,
      weekDaysShort: WEEK_DAYS_PT_SHORT,
      weekDaysFull: WEEK_DAYS_PT_FULL,
    }),
    [
      currentDate,
      currentView,
      setDate,
      goNext,
      goPrevious,
      goToday,
      setView,
      events,
      isLoading,
      refreshAppointments,
      selectedEvent,
      draftEventDate,
      isEventModalOpen,
      openEventModal,
      closeEventModal,
    ]
  );

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context)
    throw new Error('useCalendar must be used inside <CalendarProvider />');
  return context;
}
