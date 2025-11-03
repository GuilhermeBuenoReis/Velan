import { motion } from 'motion/react';
import { useCalendar } from '../context/calendar-context';
import type { CalendarEvent } from '../types/event';

const eventColorClasses = {
  blue: 'bg-blue-200 border-blue-300 text-blue-900',
  purple: 'bg-purple-200 border-purple-300 text-purple-900',
  orange: 'bg-orange-200 border-orange-300 text-orange-900',
  red: 'bg-red-200 border-red-300 text-red-900',
};

export function EventCard({ event }: { event: CalendarEvent }) {
  const { openEventModal } = useCalendar();
  const colorClass = eventColorClasses[event.color] || eventColorClasses.blue;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
      onClick={() => openEventModal({ event })}
      className={`${colorClass} border rounded-lg p-2 cursor-pointer shadow-sm hover:shadow-md transition-shadow h-full overflow-hidden`}
    >
      <div className="text-xs opacity-90">{event.time}</div>
      <div className="mt-0.5">{event.title}</div>
      {event.location && (
        <div className="text-xs opacity-75 mt-1 truncate">{event.location}</div>
      )}
    </motion.div>
  );
}
