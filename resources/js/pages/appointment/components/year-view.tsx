import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useCalendar } from '../context/calendar-context';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export function YearView() {
  const { currentDate, events, setView, setSelectedEvent } = useCalendar();
  const year = currentDate.year();
  const months = Array.from({ length: 12 }, (_, i) =>
    dayjs().month(i).locale('pt-br').format('MMMM')
  );

  const getDaysInMonth = (monthIndex: number) => {
    const firstDay = dayjs(new Date(year, monthIndex, 1));
    const daysInMonth = firstDay.daysInMonth();
    const startDayOfWeek = firstDay.day();
    const days: (number | null)[] = [];

    for (let i = 0; i < startDayOfWeek; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);

    return days;
  };

  const hasEventsOnDay = (monthIndex: number, day: number) => {
    const date = dayjs(new Date(year, monthIndex, day));
    return events.some(event => dayjs(event.date).isSame(date, 'day'));
  };

  const isToday = (monthIndex: number, day: number) => {
    const date = dayjs(new Date(year, monthIndex, day));
    return date.isSame(dayjs(), 'day');
  };

  const handleMonthClick = (monthIndex: number) => {
    setView('month');
    const selectedMonth = currentDate.month(monthIndex);
    setSelectedEvent(null);
  };

  return (
    <div className="flex-1 overflow-auto bg-[var(--color-surface)] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {months.map((month, monthIndex) => {
            const days = getDaysInMonth(monthIndex);

            return (
              <button
                key={monthIndex}
                type="button"
                onClick={() => handleMonthClick(monthIndex)}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 hover:shadow-md transition focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] text-[var(--color-text)] outline-none"
              >
                <div className="text-center font-medium mb-3 capitalize">
                  {month}
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {weekDays.map((day, i) => (
                    <div
                      key={i}
                      className="text-center text-xs text-[var(--color-text-secondary)]"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, i) => {
                    if (day === null)
                      return <div key={i} className="aspect-square" />;

                    const hasEvents = hasEventsOnDay(monthIndex, day);
                    const isTodayDate = isToday(monthIndex, day);

                    return (
                      <div
                        key={i}
                        className={`aspect-square flex items-center justify-center text-xs rounded-md transition relative ${
                          isTodayDate
                            ? 'bg-[var(--color-primary)] text-white font-semibold'
                            : 'hover:bg-[var(--color-surface-hover)] text-[var(--color-text)]'
                        }`}
                      >
                        {day}
                        {hasEvents && !isTodayDate && (
                          <div className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[var(--color-primary)]"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
