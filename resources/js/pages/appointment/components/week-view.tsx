import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useCalendar } from '../context/calendar-context';
import { EventCard } from './event-card';

const HOURS = Array.from({ length: 14 }, (_, i) => i + 7);
const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

export function WeekView() {
  const { currentDate, events, openEventModal } = useCalendar();
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(dayjs()), 60000);
    return () => clearInterval(timer);
  }, []);

  const weekDates = useMemo(() => {
    const startOfWeek = currentDate.startOf('week');
    return Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, 'day'));
  }, [currentDate]);

  const today = dayjs().startOf('day');

  const isToday = (date: dayjs.Dayjs) => date.isSame(today, 'day');

  const getEventsForDay = (dayIndex: number) => {
    const day = weekDates[dayIndex];
    return events.filter(event => dayjs(event.date).isSame(day, 'day'));
  };

  const formatTime = (hour: number) =>
    dayjs().hour(hour).minute(0).format('h A');

  const timeIndicator = useMemo(() => {
    const now = currentTime;
    const currentWeekStart = weekDates[0].startOf('day');
    const currentWeekEnd = weekDates[6].endOf('day');

    if (now.isBefore(currentWeekStart) || now.isAfter(currentWeekEnd))
      return null;
    if (now.hour() < 7 || now.hour() >= 21) return null;

    const hoursSince7AM = now.hour() - 7;
    const position = hoursSince7AM * 80 + (now.minute() / 60) * 80;
    const dayIndex = now.day();
    return { position, dayIndex };
  }, [currentTime, weekDates]);

  return (
    <div className="w-full overflow-auto bg-[var(--color-surface)]">
      <div className="min-w-[800px]">
        <div className="sticky top-0 z-[5] bg-[var(--color-surface)] border-b border-[var(--color-border)] grid grid-cols-[80px_repeat(7,1fr)]">
          <div className="border-r border-[var(--color-border)] p-3 text-xs text-[var(--color-muted)]">
            Local Time
          </div>
          {weekDates.map((date, index) => (
            <div
              key={date.format('YYYY-MM-DD')}
              className={`border-r border-[var(--color-border)] p-3 text-center ${
                index === 6 ? 'border-r-0' : ''
              }`}
            >
              <div className="text-xs text-zinc-500">{DAYS[index]}</div>
              <div
                className={`inline-flex items-center justify-center w-8 h-8 mt-1 rounded-full transition ${
                  isToday(date)
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'text-[var(--color-text)]'
                }`}
              >
                {date.date()}
              </div>
            </div>
          ))}
        </div>

        <div className="relative">
          {timeIndicator && (
            <div
              className="absolute left-0 right-0 z-[3] pointer-events-none"
              style={{ top: `${timeIndicator.position}px` }}
            >
              <div className="grid grid-cols-[80px_repeat(7,1fr)]">
                <div className="flex items-center justify-end pr-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                </div>
                {DAYS.map((_, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`${dayIndex === timeIndicator.dayIndex ? '' : 'opacity-0'}`}
                  >
                    <div className="h-[2px] bg-red-500" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {HOURS.map(hour => (
            <div
              key={hour}
              className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-[var(--color-border)]"
              style={{ minHeight: '80px' }}
            >
              <div className="border-r border-[var(--color-border)] p-2 text-xs text-gray-950 text-right pr-3">
                {formatTime(hour)}
              </div>

              {DAYS.map((_, dayIndex) => {
                const day = weekDates[dayIndex];
                const dayEvents = getEventsForDay(dayIndex).filter(
                  event => event.startHour === hour
                );

                return (
                  <div
                    key={day.format('YYYY-MM-DD')}
                    className={`border-r border-[var(--color-border)] p-2 relative ${
                      dayIndex === 6 ? 'border-r-0' : ''
                    } ${isToday(day) ? 'bg-[var(--color-primary)]/5' : ''}`}
                  >
                    {dayEvents.map(event => {
                      const heightInPx = event.durationHours * 80;
                      const topOffset = (event.startMinute / 60) * 80;
                      return (
                        <button
                          key={event.id}
                          type="button"
                          onClick={() => openEventModal({ event })}
                          className="absolute left-2 right-2 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-md transition outline-none"
                          style={{
                            top: `${topOffset}px`,
                            height: `${heightInPx - 8}px`,
                          }}
                        >
                          <EventCard event={event} />
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
