import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Video,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

dayjs.locale('pt-br');

interface Appointment {
  id: string;
  patient: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  endTime: string;
  type: 'Presencial' | 'Online';
  status: 'Confirmada' | 'Pendente' | 'Cancelada';
  notes?: string;
}

interface WeeklyScheduleProps {
  appointments: Appointment[];
}

export function WeeklySchedule({ appointments }: WeeklyScheduleProps) {
  const [weekOffset, setWeekOffset] = useState(0);

  const startOfWeek = dayjs()
    .add(weekOffset, 'week')
    .startOf('week')
    .add(1, 'day');
  const daysOfWeek = Array.from({ length: 7 }, (_, i) =>
    startOfWeek.add(i, 'day')
  );

  const hours = Array.from({ length: 13 }, (_, i) => 7 + i); // 07h às 19h
  const weekRange = `${daysOfWeek[0].format('DD MMM')} – ${daysOfWeek[6].format(
    'DD MMM YYYY'
  )}`;

  function getAppointmentsByDay(date: string) {
    return appointments.filter(a => a.date === date);
  }

  const colorByStatus = {
    Confirmada: 'bg-[#4FC3F7]/15 border-[#4FC3F7]/30 text-[#81D4FA]',
    Pendente: 'bg-[#FFD54F]/15 border-[#FFD54F]/30 text-[#FFE082]',
    Cancelada: 'bg-[#EF9A9A]/15 border-[#EF9A9A]/30 text-[#FFCDD2]',
  };

  return (
    <div className="flex justify-center w-full">
      <Card className="bg-[#14141C] border border-[#2C2C38] text-white rounded-2xl shadow-lg w-full max-w-6xl overflow-hidden">
        {/* Cabeçalho */}
        <CardHeader className="flex items-center justify-between px-6 py-4 border-b border-[#2E2E3A]">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-sky-400" />
            <CardTitle className="text-white text-base font-semibold">
              Agenda Semanal
            </CardTitle>
          </div>

          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setWeekOffset(weekOffset - 1)}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {weekRange}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setWeekOffset(weekOffset + 1)}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {/* Corpo */}
        <CardContent className="p-0">
          <ScrollArea className="h-[600px]">
            <div className="grid grid-cols-[60px_repeat(7,1fr)] border-t border-[#2E2E3A] relative text-gray-300">
              {/* Coluna de horas */}
              <div className="flex flex-col text-xs items-end pr-2 pt-12">
                {hours.map(h => (
                  <div key={h} className="h-16 text-gray-500">
                    {h}:00
                  </div>
                ))}
              </div>

              {/* Colunas dos dias */}
              {daysOfWeek.map((day, i) => (
                <div
                  key={i}
                  className={cn(
                    'border-l border-[#2E2E3A] relative overflow-hidden',
                    i === 6 && 'border-r'
                  )}
                >
                  {/* Cabeçalho do dia */}
                  <div className="sticky top-0 bg-[#1A1A24] text-center py-3 border-b border-[#2E2E3A] z-10">
                    <div className="text-xs text-gray-400">
                      {day.format('dddd').charAt(0).toUpperCase() +
                        day.format('dddd').slice(1)}
                    </div>
                    <div className="text-sm font-semibold text-gray-200">
                      {day.format('DD/MM')}
                    </div>
                  </div>

                  {/* Linhas de hora */}
                  <div className="absolute inset-0 pointer-events-none">
                    {hours.map((_, idx) => (
                      <div
                        key={idx}
                        className="border-t border-[#2E2E3A]/60 h-16"
                      ></div>
                    ))}
                  </div>

                  {/* Consultas */}
                  <div className="relative h-full">
                    {getAppointmentsByDay(day.format('DD/MM/YYYY')).map(apt => {
                      const start = dayjs(
                        `${apt.date} ${apt.time}`,
                        'DD/MM/YYYY HH:mm'
                      );
                      const end = dayjs(
                        `${apt.date} ${apt.endTime}`,
                        'DD/MM/YYYY HH:mm'
                      );
                      const duration = end.diff(start, 'minute');
                      const topOffset =
                        (start.hour() - 7) * 64 + (start.minute() / 60) * 64;
                      const height = (duration / 60) * 64;

                      return (
                        <Tooltip key={apt.id}>
                          <TooltipTrigger asChild>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              className={cn(
                                'absolute left-1 right-1 rounded-lg px-2 py-1.5 text-xs shadow-md border backdrop-blur-sm overflow-hidden cursor-pointer',
                                colorByStatus[apt.status]
                              )}
                              style={{
                                top: `${topOffset}px`,
                                height: `${height}px`,
                              }}
                            >
                              <div className="font-medium truncate">
                                {apt.patient}
                              </div>
                              <div className="text-[10px] opacity-80 truncate">
                                {apt.time} – {apt.endTime}
                              </div>
                              <div className="flex items-center gap-1 opacity-70">
                                {apt.type === 'Online' ? (
                                  <Video className="h-3 w-3" />
                                ) : (
                                  <MapPin className="h-3 w-3" />
                                )}
                                <span className="truncate">{apt.doctor}</span>
                              </div>
                            </motion.div>
                          </TooltipTrigger>

                          <TooltipContent
                            side="right"
                            className="bg-[#1A1A24] border border-[#2E2E3A] text-gray-200 rounded-xl shadow-xl max-w-xs p-4"
                          >
                            <div className="font-semibold">{apt.patient}</div>
                            <div className="text-xs text-gray-400">
                              {apt.specialty}
                            </div>
                            <div className="text-xs mt-1">{apt.notes}</div>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
