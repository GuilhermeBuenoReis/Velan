import type { CalendarEvent } from './event';

export type AppointmentEventType = CalendarEvent['color'];

export interface AppointmentDto {
  id: number;
  user_id: number;
  title: string;
  date: string;
  start_time: string;
  duration: number | string;
  event_type: AppointmentEventType;
  location: string | null;
  doctor: string | null;
  notes: string | null;
}
