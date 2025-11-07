import { zodResolver } from '@hookform/resolvers/zod';
import { usePage } from '@inertiajs/react';
import dayjs from 'dayjs';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import type { SharedData } from '@/types';
import { useCalendar } from '../context/calendar-context';

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
  const {
    isEventModalOpen,
    closeEventModal,
    selectedEvent,
    draftEventDate,
    refreshAppointments,
  } = useCalendar();
  const isOpen = isEventModalOpen && !selectedEvent;
  const { auth } = usePage<SharedData>().props;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<NewAppointmentFormData>({
    resolver: zodResolver(newAppointmentSchema),
    defaultValues: {
      title: '',
      date: dayjs().format('YYYY-MM-DD'),
      startTime: '09:00',
      duration: '60',
      eventType: 'blue',
      location: '',
      doctor: '',
      notes: '',
    },
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (draftEventDate) {
      setValue('date', draftEventDate, { shouldDirty: false });
    }
  }, [draftEventDate, isOpen, setValue]);

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      reset();
      clearErrors();
      closeEventModal();
    }
  };

  const handleServerErrors = (
    serverErrors: Record<string, string[] | string>
  ) => {
    const fieldMap: Record<string, keyof NewAppointmentFormData> = {
      title: 'title',
      date: 'date',
      start_time: 'startTime',
      duration: 'duration',
      event_type: 'eventType',
      location: 'location',
      doctor: 'doctor',
      notes: 'notes',
    };

    Object.entries(serverErrors).forEach(([field, message]) => {
      const normalized = Array.isArray(message) ? message[0] : message;
      const target = fieldMap[field];
      if (target) {
        setError(target, { type: 'server', message: normalized });
        return;
      }

      setError('root', { type: 'server', message: normalized });
    });
  };

  const getXsrfToken = () => {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  };

  const ensureCsrfCookie = async () => {
    if (getXsrfToken()) {
      return;
    }

    await fetch('/sanctum/csrf-cookie', {
      method: 'GET',
      credentials: 'same-origin',
    });
  };

  async function handleCreateNewAppointment(values: NewAppointmentFormData) {
    clearErrors('root');
    await ensureCsrfCookie();
    const xsrf = getXsrfToken();
    const durationInMinutes = Number(values.duration) || 60;

    try {
      const response = await fetch('/appointments', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...(xsrf ? { 'X-XSRF-TOKEN': xsrf } : {}),
        },
        body: JSON.stringify({
          user_id: auth.user.id,
          title: values.title,
          date: values.date,
          start_time: values.startTime,
          duration: durationInMinutes,
          event_type: values.eventType,
          location: values.location || null,
          doctor: values.doctor || null,
          notes: values.notes || null,
        }),
      });

      if (!response.ok) {
        if (response.status === 422) {
          const data = await response.json();
          if (data.errors) {
            handleServerErrors(data.errors);
          }
          setError('root', {
            type: 'server',
            message:
              data.message ??
              'Não foi possível salvar a consulta. Verifique os dados informados.',
          });
          return;
        }

        throw new Error('Não foi possível salvar a consulta.');
      }

      reset();
      closeEventModal();
      refreshAppointments();
    } catch (error) {
      setError('root', {
        type: 'server',
        message:
          error instanceof Error
            ? error.message
            : 'Não foi possível salvar a consulta.',
      });
    }
  }

  const eventTypes = [
    { value: 'blue', label: 'Regular Consultation', color: 'bg-blue-200' },
    { value: 'purple', label: 'Internal Session', color: 'bg-purple-200' },
    { value: 'orange', label: 'Personal / Urgent', color: 'bg-orange-200' },
    { value: 'red', label: 'Canceled / Alert', color: 'bg-red-200' },
  ];

  const durationOptions = [
    { value: '30', label: '30 minutos' },
    { value: '60', label: '1 hora' },
    { value: '90', label: '1h 30min' },
    { value: '120', label: '2 horas' },
    { value: '180', label: '3 horas' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="sm:max-w-[500px] bg-[var(--color-surface)] text-[var(--color-text)]">
        <DialogHeader>
          <DialogTitle>New Appointment</DialogTitle>
          <DialogDescription>
            Informe os detalhes para criar uma nova consulta.
          </DialogDescription>
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
                  {durationOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.duration && (
                <p className="text-sm text-red-500">
                  {errors.duration.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Event Type *</Label>
              <Select
                value={watch('eventType')}
                onValueChange={v =>
                  setValue(
                    'eventType',
                    v as NewAppointmentFormData['eventType']
                  )
                }
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

          {errors.root && (
            <p className="text-sm text-red-500">{errors.root.message}</p>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDialogChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 transition"
            >
              {isSubmitting && (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save Appointment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
