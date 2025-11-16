import { Calendar, ChevronRight, Clock, MapPin, Video } from 'lucide-react';
import { motion } from 'motion/react';
import type { CSSProperties } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

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

const mixColor = (cssVar: string, percentage: number) =>
  `color-mix(in srgb, ${cssVar} ${percentage}%, transparent)`;

export function DashboardUpcomingAppointments() {
  return (
    <Card className="mt-4 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2>Próximas Consultas</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Suas consultas agendadas
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-[var(--color-chart-4)] hover:bg-[var(--upcoming-see-all-hover)]"
          style={
            {
              '--upcoming-see-all-hover': mixColor('var(--color-chart-4)', 10),
            } as CSSProperties
          }
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
                <Card
                  className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all cursor-pointer group hover:border-[color:var(--upcoming-card-hover-border)]"
                  style={
                    {
                      '--upcoming-card-hover-border': mixColor(
                        'var(--color-accent)',
                        30
                      ),
                    } as CSSProperties
                  }
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <Avatar
                        className="w-12 h-12 border-2 border-[color:var(--upcoming-avatar-border)]"
                        style={
                          {
                            '--upcoming-avatar-border': mixColor(
                              'var(--color-accent)',
                              30
                            ),
                          } as CSSProperties
                        }
                      >
                        <AvatarImage src={appointment.avatar} />
                        <AvatarFallback
                          className="text-white"
                          style={{
                            background:
                              'linear-gradient(135deg, var(--color-accent), var(--color-chart-4))',
                          }}
                        >
                          {appointment.doctor.split(' ')[1][0]}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="truncate">{appointment.doctor}</h4>
                          <Badge
                            variant="secondary"
                            className="shrink-0"
                            style={
                              {
                                borderColor: mixColor(
                                  appointment.status === 'Confirmada'
                                    ? 'var(--color-success)'
                                    : 'var(--color-warning)',
                                  30
                                ),
                                background: mixColor(
                                  appointment.status === 'Confirmada'
                                    ? 'var(--color-success)'
                                    : 'var(--color-warning)',
                                  20
                                ),
                                color:
                                  appointment.status === 'Confirmada'
                                    ? 'var(--color-success)'
                                    : 'var(--color-warning)',
                              } as CSSProperties
                            }
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                          {appointment.specialty}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-secondary)]">
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
                              <Video className="w-4 h-4 text-[var(--color-chart-4)]" />
                            ) : (
                              <MapPin className="w-4 h-4" />
                            )}
                            <span>{appointment.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors shrink-0" />
                  </div>
                </Card>
              </DialogTrigger>

              <DialogContent
                className="backdrop-blur-xl border rounded-2xl"
                style={
                  {
                    backgroundColor: mixColor(
                      'var(--color-surface-indigo)',
                      95
                    ),
                    borderColor: mixColor('var(--color-accent)', 20),
                  } as CSSProperties
                }
              >
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <Avatar
                      className="w-12 h-12 border-2 border-[color:var(--upcoming-dialog-avatar-border)]"
                      style={
                        {
                          '--upcoming-dialog-avatar-border': mixColor(
                            'var(--color-accent)',
                            50
                          ),
                        } as CSSProperties
                      }
                    >
                      <AvatarImage src={appointment.avatar} />
                      <AvatarFallback
                        className="text-white"
                        style={{
                          background:
                            'linear-gradient(135deg, var(--color-accent), var(--color-chart-4))',
                        }}
                      >
                        {appointment.doctor.split(' ')[1][0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3>{appointment.doctor}</h3>
                      <p className="text-sm text-[var(--color-text-secondary)]">
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
                      <Calendar className="w-5 h-5 text-[var(--color-accent)]" />
                      <div>
                        <p className="text-sm text-[var(--color-text-secondary)]">
                          Data
                        </p>
                        <p>{appointment.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[var(--color-chart-4)]" />
                      <div>
                        <p className="text-sm text-[var(--color-text-secondary)]">
                          Horário
                        </p>
                        <p>{appointment.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {appointment.type === 'Telemedicina' ? (
                        <Video className="w-5 h-5 text-[var(--color-warning)]" />
                      ) : (
                        <MapPin className="w-5 h-5 text-[var(--color-warning)]" />
                      )}
                      <div>
                        <p className="text-sm text-[var(--color-text-secondary)]">
                          Local
                        </p>
                        <p>{appointment.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1 hover:opacity-90"
                      style={{
                        backgroundImage:
                          'linear-gradient(to right, var(--color-accent), var(--color-chart-4))',
                      }}
                    >
                      {appointment.type === 'Telemedicina'
                        ? 'Entrar na Videochamada'
                        : 'Ver Localização'}
                    </Button>
                    <Button
                      variant="outline"
                      className="text-[var(--color-destructive)] hover:bg-[var(--upcoming-cancel-hover)] border-[color:var(--color-destructive-light)]"
                      style={
                        {
                          '--upcoming-cancel-hover': mixColor(
                            'var(--color-destructive)',
                            10
                          ),
                          '--color-destructive-light': mixColor(
                            'var(--color-destructive)',
                            30
                          ),
                        } as CSSProperties
                      }
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
