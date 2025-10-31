import dayjs from 'dayjs';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useCalendar } from '../context/calendar-context';
import type { CalendarEvent } from '../types/event';

const eventColorClasses = {
  blue: 'bg-blue-400',
  purple: 'bg-purple-400',
  orange: 'bg-orange-400',
  red: 'bg-red-400',
};

export function MonthView() {
  const { currentDate, openEventModal } = useCalendar();
  const [events] = useState<CalendarEvent[]>([]);

  const generateDaysInMonth = (date: dayjs.Dayjs) => {
    const startOfMonth = date.startOf('month');
    const endOfMonth = date.endOf('month');

    return Array.from({ length: 42 }, (_, i) => {
      const offset = i - startOfMonth.day() + 1;
      const day = date.date(offset);
      return offset > 0 && offset <= endOfMonth.date() ? day : null;
    });
  };

  const isToday = (date: dayjs.Dayjs | null) =>
    !!date && date.isSame(dayjs(), 'day');

  const getEventsForDate = (date: dayjs.Dayjs | null) =>
    date ? events.filter(e => dayjs(e.date).isSame(date, 'day')) : [];

  const days = generateDaysInMonth(dayjs(currentDate));
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="flex-1 overflow-auto bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-t-lg overflow-hidden">
          {weekDays.map(day => (
            <div
              key={day}
              className="bg-gray-50 py-3 text-center text-sm text-gray-600"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200 border-x border-b border-gray-200 rounded-b-lg overflow-hidden">
          {days.map((date, index) => {
            const dayEvents = getEventsForDate(date);
            const isCurrentDay = isToday(date);

            return (
              <button
                key={index}
                type="button"
                onClick={() => date && openEventModal?.({} as CalendarEvent)}
                disabled={!date}
                className={`relative bg-white min-h-[120px] p-2 text-left hover:bg-gray-50 transition-colors ${
                  !date ? 'bg-gray-50/50 cursor-default' : 'cursor-pointer'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {date && (
                  <div className="h-full flex flex-col">
                    <div className="flex justify-center mb-2">
                      <div
                        className={`flex items-center justify-center w-7 h-7 rounded-full text-sm ${
                          isCurrentDay
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {date.date()}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-1">
                      {dayEvents.slice(0, 3).map(event => (
                        <TooltipProvider key={event.id}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                onClick={e => {
                                  e.stopPropagation();
                                  openEventModal(event);
                                }}
                                className={`h-1.5 rounded-full flex-1 min-w-[20px] ${
                                  eventColorClasses[event.color]
                                } hover:opacity-80 transition-opacity`}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <div className="text-xs">
                                <div>{event.title}</div>
                                <div className="text-gray-400">
                                  {event.time}
                                </div>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-gray-500 w-full mt-1">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
