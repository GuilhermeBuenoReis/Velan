import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCalendar } from '../context/calendar-context';
import { useChatAssistant } from '../context/chat-assistant-context';
import type { CalendarEvent } from '../types/event';

const newAppointmentSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório'),
  date: z.string().min(1, 'Data é obrigatória'),
  startTime: z.string().min(1, 'Hora de início é obrigatória'),
  duration: z.string().min(1),
  eventType: z.enum(['blue', 'purple', 'orange', 'red']),
  location: z.string().optional(),
  doctor: z.string().optional(),
  notes: z.string().optional(),
});

type NewAppointmentFormData = z.infer<typeof newAppointmentSchema>;

export function NewAppointmentModal() {
  const { isEventModalOpen, closeEventModal } = useCalendar();
  const { setAppointment } = useChatAssistant();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<NewAppointmentFormData>({
    resolver: zodResolver(newAppointmentSchema),
    defaultValues: {
      title: '',
      date: dayjs().format('YYYY-MM-DD'),
      startTime: '09:00',
      duration: '1',
      eventType: 'blue',
      location: '',
      doctor: '',
      notes: '',
    },
  });

  function handleCreateNewAppointment(values: NewAppointmentFormData) {
    const start = dayjs(`${values.date}T${values.startTime}`);
    const durationHours = parseFloat(values.duration);
    const end = start.add(durationHours, 'hour');
    const [hours, minutes] = values.startTime.split(':').map(Number);

    const newAppointment: Omit<CalendarEvent, 'id'> = {
      title: values.title,
      date: values.date,
      time: `${start.format('HH:mm')} - ${end.format('HH:mm')}`,
      startHour: hours,
      startMinute: minutes,
      durationHours,
      color: values.eventType,
      location: values.location || undefined,
      doctor: values.doctor || undefined,
      notes: values.notes || undefined,
    };

    setAppointment({
      doctorId: '',
      doctorName: values.doctor || '',
      date: values.date,
      time: values.startTime,
      notes: values.notes,
    });

    closeEventModal();
    reset();
  }

  const eventTypes = [
    { value: 'blue', label: 'Regular Consultation', color: 'bg-blue-200' },
    { value: 'purple', label: 'Internal Session', color: 'bg-purple-200' },
    { value: 'orange', label: 'Personal / Urgent', color: 'bg-orange-200' },
    { value: 'red', label: 'Canceled / Alert', color: 'bg-red-200' },
  ];

  return (
    <Dialog open={isEventModalOpen} onOpenChange={closeEventModal}>
      <DialogContent className="sm:max-w-[500px] bg-[var(--color-surface)] text-[var(--color-text)]">
        <DialogHeader>
          <DialogTitle>New Appointment</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleCreateNewAppointment)}
          className="space-y-4 pt-4"
        >
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              {...register('title')}
              placeholder="e.g., Patient Consultation"
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input type="date" {...register('date')} />
              {errors.date && (
                <p className="text-sm text-red-500">{errors.date.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time *</Label>
              <Input type="time" {...register('startTime')} />
              {errors.startTime && (
                <p className="text-sm text-red-500">
                  {errors.startTime.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Duration *</Label>
              <Select
                value={watch('duration')}
                onValueChange={v => setValue('duration', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">30 minutes</SelectItem>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="1.5">1.5 hours</SelectItem>
                  <SelectItem value="2">2 hours</SelectItem>
                  <SelectItem value="3">3 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Event Type *</Label>
              <Select
                value={watch('eventType')}
                onValueChange={v => setValue('eventType', v as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${type.color}`} />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              {...register('location')}
              placeholder="e.g., Main Building, Room 204"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor">Doctor / Provider</Label>
            <Input
              {...register('doctor')}
              placeholder="e.g., Dr. Sarah Johnson"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              {...register('notes')}
              placeholder="Additional information..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeEventModal}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 transition"
            >
              Save Appointment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
