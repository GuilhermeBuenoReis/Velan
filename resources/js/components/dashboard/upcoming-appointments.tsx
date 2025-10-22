import { Calendar, ChevronRight, Clock, MapPin, Video } from 'lucide-react';
import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

const appointments = [
  {
    id: 1,
    doctor: 'Dr. Carlos Silva',
    specialty: 'Cardiologia',
    date: '22 Out 2025',
    time: '14:30',
    type: 'Presencial',
    location: 'Consultório Centro',
    status: 'Confirmada',
    avatar:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop',
  },
  {
    id: 2,
    doctor: 'Dra. Ana Beatriz',
    specialty: 'Endocrinologia',
    date: '28 Out 2025',
    time: '10:00',
    type: 'Telemedicina',
    location: 'Online',
    status: 'Confirmada',
    avatar:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop',
  },
  {
    id: 3,
    doctor: 'Dr. Pedro Henrique',
    specialty: 'Ortopedia',
    date: '02 Nov 2025',
    time: '16:00',
    type: 'Presencial',
    location: 'Hospital São Lucas',
    status: 'Pendente',
    avatar:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop',
  },
];

export function DashboardUpcomingAppointments() {
  return (
    <Card className="mt-4 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2>Próximas Consultas</h2>
          <p className="text-sm text-[#B8B8C0] mt-1">
            Suas consultas agendadas
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-[#00C6AE] hover:bg-[#00C6AE]/10"
        >
          Ver todas
        </Button>
      </div>

      <div className="space-y-3">
        {appointments.map((appointment, index) => (
          <motion.div
            key={appointment.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Dialog>
              <DialogTrigger asChild>
                <Card className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-[#6C63FF]/30 hover:bg-white/10 transition-all cursor-pointer group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <Avatar className="w-12 h-12 border-2 border-[#6C63FF]/30">
                        <AvatarImage src={appointment.avatar} />
                        <AvatarFallback>
                          {appointment.doctor.split(' ')[1][0]}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="truncate">{appointment.doctor}</h4>
                          <Badge
                            variant="secondary"
                            className={`shrink-0 ${
                              appointment.status === 'Confirmada'
                                ? 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/30'
                                : 'bg-[#F7C948]/20 text-[#F7C948] border-[#F7C948]/30'
                            }`}
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-[#B8B8C0] mb-2">
                          {appointment.specialty}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-[#B8B8C0]">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{appointment.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{appointment.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {appointment.type === 'Telemedicina' ? (
                              <Video className="w-4 h-4 text-[#00C6AE]" />
                            ) : (
                              <MapPin className="w-4 h-4" />
                            )}
                            <span>{appointment.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-[#B8B8C0] group-hover:text-[#6C63FF] transition-colors shrink-0" />
                  </div>
                </Card>
              </DialogTrigger>

              <DialogContent className="bg-[#1A152A]/95 backdrop-blur-xl border border-[#6C63FF]/20 rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <Avatar className="w-12 h-12 border-2 border-[#6C63FF]/50">
                      <AvatarImage src={appointment.avatar} />
                      <AvatarFallback>
                        {appointment.doctor.split(' ')[1][0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3>{appointment.doctor}</h3>
                      <p className="text-sm text-[#B8B8C0]">
                        {appointment.specialty}
                      </p>
                    </div>
                  </DialogTitle>
                  <DialogDescription>
                    Detalhes da consulta agendada
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                  <div className="p-4 bg-white/5 rounded-xl space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-[#6C63FF]" />
                      <div>
                        <p className="text-sm text-[#B8B8C0]">Data</p>
                        <p>{appointment.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[#00C6AE]" />
                      <div>
                        <p className="text-sm text-[#B8B8C0]">Horário</p>
                        <p>{appointment.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {appointment.type === 'Telemedicina' ? (
                        <Video className="w-5 h-5 text-[#F7C948]" />
                      ) : (
                        <MapPin className="w-5 h-5 text-[#F7C948]" />
                      )}
                      <div>
                        <p className="text-sm text-[#B8B8C0]">Local</p>
                        <p>{appointment.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-to-r from-[#6C63FF] to-[#00C6AE] hover:opacity-90">
                      {appointment.type === 'Telemedicina'
                        ? 'Entrar na Videochamada'
                        : 'Ver Localização'}
                    </Button>
                    <Button
                      variant="outline"
                      className="border-[#EF4444]/30 text-[#EF4444] hover:bg-[#EF4444]/10"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
