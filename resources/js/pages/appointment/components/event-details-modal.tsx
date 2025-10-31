import { Calendar, Clock, FileText, MapPin, User } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCalendar } from '../context/calendar-context';

const eventColorBgClasses = {
  blue: 'bg-blue-100',
  purple: 'bg-purple-100',
  orange: 'bg-orange-100',
  red: 'bg-red-100',
};

const eventColorTextClasses = {
  blue: 'text-blue-900',
  purple: 'text-purple-900',
  orange: 'text-orange-900',
  red: 'text-red-900',
};

export function EventDetailsModal() {
  const { selectedEvent, isEventModalOpen, closeEventModal } = useCalendar();

  if (!selectedEvent) return null;

  const bgColorClass =
    eventColorBgClasses[selectedEvent.color] || eventColorBgClasses.blue;
  const textColorClass =
    eventColorTextClasses[selectedEvent.color] || eventColorTextClasses.blue;

  return (
    <Dialog open={isEventModalOpen} onOpenChange={closeEventModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div
            className={`${bgColorClass} ${textColorClass} -mx-6 -mt-6 px-6 py-4 rounded-t-lg`}
          >
            <DialogTitle className={textColorClass}>
              {selectedEvent.title}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <div className="text-gray-900">{selectedEvent.time}</div>
              <div className="text-xs text-gray-500">
                Duration: {selectedEvent.durationHours}{' '}
                {selectedEvent.durationHours === 1 ? 'hour' : 'hours'}
              </div>
            </div>
          </div>

          {selectedEvent.location && (
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
              <div className="text-gray-900">{selectedEvent.location}</div>
            </div>
          )}

          {selectedEvent.doctor && (
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <div className="text-xs text-gray-500">Provider</div>
                <div className="text-gray-900">{selectedEvent.doctor}</div>
              </div>
            </div>
          )}

          {selectedEvent.notes && (
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
              <div>
                <div className="text-xs text-gray-500">Notes</div>
                <div className="text-gray-900">{selectedEvent.notes}</div>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 pt-2 border-t border-gray-200">
            <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <div className="text-xs text-gray-500">Calendar</div>
              <div className="text-gray-900">
                {selectedEvent.color === 'blue' && 'Work'}
                {selectedEvent.color === 'purple' && 'Personal'}
                {selectedEvent.color === 'orange' && 'Events'}
                {selectedEvent.color === 'red' && 'Important'}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
