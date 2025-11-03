import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useUrlState } from '@/hooks/use-url-state';
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
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (id: string, updated: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  selectedEvent: CalendarEvent | null;
  setSelectedEvent: (event: CalendarEvent | null) => void;
  draftEventDate: string | null;
  isEventModalOpen: boolean;
  openEventModal: (options?: OpenEventModalOptions) => void;
  closeEventModal: () => void;
  weekDaysShort: string[];
  weekDaysFull: string[];
}

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

const CalendarContext = createContext<CalendarContextType | null>(null);

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [dateValue, setDateValue] = useUrlState('date', dayjs().format());
  const [viewValue, setViewValue] = useUrlState('view', 'month');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [draftEventDate, setDraftEventDate] = useState<string | null>(null);

  const currentDate = dayjs(dateValue);

  const currentView: CalendarView = ['day', 'week', 'month', 'year'].includes(
    viewValue
  )
    ? (viewValue as CalendarView)
    : 'month';

  const setDate = useCallback(
    (value: dayjs.Dayjs) => {
      setDateValue(value.format());
    },
    [setDateValue]
  );

  const goNext = useCallback(() => {
    const nextDate = currentDate.add(1, currentView);
    setDateValue(nextDate.format());
  }, [currentDate, currentView, setDateValue]);

  const goPrevious = useCallback(() => {
    const prevDate = currentDate.subtract(1, currentView);
    setDateValue(prevDate.format());
  }, [currentDate, currentView, setDateValue]);

  const goToday = useCallback(() => {
    setDateValue(dayjs().format());
  }, [setDateValue]);

  const setView = useCallback(
    (value: CalendarView) => {
      setViewValue(value);
    },
    [setViewValue]
  );

  const addEvent = useCallback((event: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = { id: crypto.randomUUID(), ...event };
    setEvents(prev => [...prev, newEvent]);
  }, []);

  const updateEvent = useCallback(
    (id: string, updated: Partial<CalendarEvent>) => {
      setEvents(prev =>
        prev.map(event => (event.id === id ? { ...event, ...updated } : event))
      );
    },
    []
  );

  const deleteEvent = useCallback((id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  }, []);

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
      addEvent,
      updateEvent,
      deleteEvent,
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
      addEvent,
      updateEvent,
      deleteEvent,
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
