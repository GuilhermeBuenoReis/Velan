import { LoaderCircle } from 'lucide-react';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useEffect, useMemo, useState } from 'react';
import { useCalendar } from '../context/calendar-context';
import { EventCard } from './event-card';

const HOURS = Array.from({ length: 14 }, (_, i) => i + 7);

export function DayView() {
  const { currentDate, events, openEventModal, isLoading } = useCalendar();
  const [currentTime, setCurrentTime] = useState(dayjs());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(dayjs()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (hour: number) =>
    dayjs().hour(hour).minute(0).format('h A');

  const isToday = currentDate.isSame(dayjs(), 'day');

  const getCurrentTimePosition = () => {
    if (!isToday) return null;
    const hoursSince7AM = currentTime.hour() - 7;
    const position = hoursSince7AM * 80 + (currentTime.minute() / 60) * 80;
    return hoursSince7AM >= 0 && hoursSince7AM < 14 ? position : null;
  };

  const dayEvents = useMemo(
    () => events.filter(event => dayjs(event.date).isSame(currentDate, 'day')),
    [events, currentDate]
  );

  const dayName = currentDate.locale('pt-br').format('dddd');
  const currentDayNumber = currentDate.date();

  return (
    <div className="w-full overflow-auto bg-[var(--color-surface)]">
      <div className="max-w-4xl mx-auto">
        <div className="sticky top-0 z-[5] bg-[var(--color-surface)] border-b border-[var(--color-border)] px-6 py-4">
          <div className="text-center">
            <div className="text-sm text-[var(--color-text-secondary)] capitalize">
              {dayName}
            </div>
            <div
              className={`inline-flex items-center justify-center w-12 h-12 mt-2 rounded-full ${
                isToday
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'text-[var(--color-text)]'
              }`}
            >
              <span className="text-xl">{currentDayNumber}</span>
            </div>
          </div>
        </div>

        <div className="relative px-6">
          {isLoading && (
            <div className="absolute inset-0 z-[9] flex items-center justify-center bg-[var(--color-surface)]/70 backdrop-blur">
              <LoaderCircle className="h-6 w-6 animate-spin text-[var(--color-primary)]" />
            </div>
          )}
          {HOURS.map(hour => (
            <div
              key={hour}
              className="grid grid-cols-[100px_1fr] border-b border-[var(--color-border)]"
              style={{ minHeight: '80px' }}
            >
              <div className="p-2 text-sm text-[var(--color-text-secondary)] text-right pr-4">
                {formatTime(hour)}
              </div>
              <div className="border-l border-[var(--color-border)] p-3 relative">
                {dayEvents
                  .filter(event => event.startHour === hour)
                  .map(event => {
                    const heightInPx = event.durationHours * 80;
                    const topOffset = (event.startMinute / 60) * 80;
                    return (
                      <button
                        key={event.id}
                        type="button"
                        onClick={() => openEventModal({ event })}
                        className="absolute left-3 right-3 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded-md transition outline-none"
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
            </div>
          ))}

          {getCurrentTimePosition() !== null && (
            <div
              className="absolute left-0 right-0 z-[3] pointer-events-none"
              style={{ top: `${getCurrentTimePosition()}px` }}
            >
              <div className="flex items-center">
                <div className="w-[100px] flex justify-end pr-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                </div>
                <div className="flex-1 h-[2px] bg-red-500" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
