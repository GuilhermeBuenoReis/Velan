export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  startHour: number;
  startMinute: number;
  durationHours: number;
  color: 'blue' | 'purple' | 'orange' | 'red';
  location?: string;
  doctor?: string;
  notes?: string;
}
