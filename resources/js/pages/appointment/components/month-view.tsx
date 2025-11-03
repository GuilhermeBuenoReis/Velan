import dayjs from 'dayjs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useCalendar } from '../context/calendar-context';

const eventColorClasses = {
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
};

export function MonthView() {
  const { currentDate, events, openEventModal, setDate } = useCalendar();
  const referenceMonth = currentDate.startOf('month');
  const gridStart = referenceMonth.startOf('week');
  const days = Array.from({ length: 42 }, (_, index) =>
    gridStart.add(index, 'day')
  );
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

  const today = dayjs();

  const getEventsForDate = (date: dayjs.Dayjs) =>
    events.filter(event => dayjs(event.date).isSame(date, 'day'));

  const handleCreateAppointment = (date: dayjs.Dayjs, isDisabled: boolean) => {
    if (isDisabled) return;
    setDate(date);
    openEventModal({ date: date.format('YYYY-MM-DD') });
  };

  return (
    <TooltipProvider>
      <div className="w-full overflow-auto bg-[var(--color-surface)] p-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-7 gap-px overflow-hidden rounded-t-lg border border-[var(--color-border)] bg-[var(--color-border)]">
            {weekDays.map(day => (
              <div
                key={day}
                className="bg-[var(--color-surface-muted)] py-3 text-center text-sm text-[var(--color-text-secondary)]"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-px overflow-hidden rounded-b-lg border-x border-b border-[var(--color-border)] bg-[var(--color-border)]">
            {days.map(day => {
              const isCurrentMonth = day.isSame(referenceMonth, 'month');
              const isCurrentDay = day.isSame(today, 'day');
              const dayEvents = getEventsForDate(day);

              return (
                <button
                  key={day.format('YYYY-MM-DD')}
                  type="button"
                  onClick={() => handleCreateAppointment(day, !isCurrentMonth)}
                  disabled={!isCurrentMonth}
                  className={`relative min-h-[120px] p-2 text-left transition-colors ${
                    isCurrentMonth
                      ? 'cursor-pointer bg-[var(--color-surface)] hover:bg-[var(--color-surface-hover)]'
                      : 'cursor-default bg-[var(--color-surface-muted)]/70 text-[var(--color-text-secondary)]/60'
                  } focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]`}
                >
                  <div className="flex h-full flex-col">
                    <div className="mb-2 flex justify-center">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${
                          isCurrentDay
                            ? 'bg-[var(--color-primary)] text-white'
                            : 'text-[var(--color-text)]'
                        }`}
                      >
                        {day.date()}
                      </div>
                    </div>

                    <div className="mt-1 flex flex-wrap gap-1">
                      {dayEvents.slice(0, 3).map(event => (
                        <Tooltip key={event.id}>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              onClick={e => {
                                e.stopPropagation();
                                openEventModal({ event });
                              }}
                              className={`h-1.5 flex-1 min-w-[20px] rounded-full transition-opacity hover:opacity-80 ${eventColorClasses[event.color] ?? eventColorClasses.blue}`}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-xs text-[var(--color-text)]">
                              <div className="font-medium">{event.title}</div>
                              <div className="text-[var(--color-text-secondary)]">
                                {event.time}
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ))}

                      {dayEvents.length > 3 && (
                        <div className="mt-1 w-full text-xs text-[var(--color-text-secondary)]">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
