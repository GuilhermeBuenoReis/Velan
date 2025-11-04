import { motion } from 'motion/react';
import { useCalendar } from '../context/calendar-context';
import type { CalendarEvent } from '../types/event';

const eventColorClasses = {
  blue: 'from-blue-500/90 to-blue-600/90 text-white',
  purple: 'from-purple-500/90 to-purple-600/90 text-white',
  orange: 'from-orange-500/90 to-orange-600/90 text-white',
  red: 'from-red-500/90 to-red-600/90 text-white',
};

export function EventCard({ event }: { event: CalendarEvent }) {
  const { openEventModal } = useCalendar();
  const colorClass = eventColorClasses[event.color] || eventColorClasses.blue;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
      onClick={() => openEventModal({ event })}
      className={`rounded-lg p-3 cursor-pointer shadow-[0_2px_6px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_10px_rgba(0,0,0,0.18)] transition-all bg-gradient-to-br ${colorClass}`}
    >
      <div className="text-[10px] font-medium bg-black/20 backdrop-blur-sm px-2 py-0.5 rounded-full w-fit mb-1">
        {event.time}
      </div>

      <div className="font-semibold text-sm leading-tight">{event.title}</div>

      {event.location && (
        <div className="text-xs opacity-90 mt-1 truncate">
          📍 {event.location}
        </div>
      )}
    </motion.div>
  );
}
