import dayjs from 'dayjs';
import { createContext, useContext, useMemo, useState } from 'react';
import { useUrlState } from '@/hooks/use-url-state';
import type { CalendarEvent } from '../types/event';

type CalendarView = 'day' | 'week' | 'month' | 'year';

interface CalendarContextType {
  currentDate: dayjs.Dayjs;
  currentView: CalendarView;
  goNext: () => void;
  goPrevious: () => void;
  goToday: () => void;
  setView: (value: string) => void;
  events: CalendarEvent[];
  addEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  updateEvent: (id: string, updated: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  selectedEvent: CalendarEvent | null;
  setSelectedEvent: (event: CalendarEvent | null) => void;
  isEventModalOpen: boolean;
  openEventModal: (event?: CalendarEvent) => void;
  closeEventModal: () => void;
}

const CalendarContext = createContext<CalendarContextType | null>(null);

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [dateValue, setDateValue] = useUrlState('date', dayjs().format());
  const [viewValue, setViewValue] = useUrlState('view', 'month');
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const currentDate = dayjs(dateValue);
  const currentView: CalendarView = ['day', 'week', 'month', 'year'].includes(
    viewValue
  )
    ? (viewValue as CalendarView)
    : 'month';

  const goNext = () => {
    const nextDate = currentDate.add(1, currentView);
    setDateValue(nextDate.format());
  };

  const goPrevious = () => {
    const prevDate = currentDate.subtract(1, currentView);
    setDateValue(prevDate.format());
  };

  const goToday = () => setDateValue(dayjs().format());

  const setView = (value: string) => {
    if (['day', 'week', 'month', 'year'].includes(value)) setViewValue(value);
  };

  const addEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const newEvent: CalendarEvent = { id: crypto.randomUUID(), ...event };
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = (id: string, updated: Partial<CalendarEvent>) => {
    setEvents(prev =>
      prev.map(event => (event.id === id ? { ...event, ...updated } : event))
    );
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const openEventModal = (event?: CalendarEvent) => {
    if (event) setSelectedEvent(event);
    setIsEventModalOpen(true);
  };

  const closeEventModal = () => {
    setSelectedEvent(null);
    setIsEventModalOpen(false);
  };

  const value = useMemo(
    () => ({
      currentDate,
      currentView,
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
      isEventModalOpen,
      openEventModal,
      closeEventModal,
    }),
    [currentDate, currentView, events, selectedEvent, isEventModalOpen]
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
