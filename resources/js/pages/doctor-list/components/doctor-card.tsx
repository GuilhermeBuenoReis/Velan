import { Calendar, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface DoctorCardProps {
  id: string;
  name?: string;
  specialty?: string;
  description?: string;
  rating?: number;
  image?: string;
  status?: 'available-today' | 'upcoming';
  onClick: () => void;
  index: number;
}

export function DoctorCard({
  name,
  specialty,
  description,
  rating,
  image,
  status,
  onClick,
  index,
}: DoctorCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="relative bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
      onClick={onClick}
    >
      <div className="absolute top-6 right-6">
        <Badge
          className={`${
            status === 'available-today'
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-blue-100 text-blue-700'
          } border-0`}
        >
          {status === 'available-today'
            ? 'Disponível hoje'
            : 'Próximos horários'}
        </Badge>
      </div>

      <div className="flex flex-col items-center mb-4">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full blur-md opacity-30"
            style={{
              background:
                'linear-gradient(135deg, var(--color-secondary), var(--color-primary))',
            }}
          ></div>
          <Avatar className="h-24 w-24 border-4 border-white shadow-lg relative">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback
              className="text-white"
              style={{
                background:
                  'linear-gradient(135deg, var(--color-secondary), var(--color-primary))',
              }}
            >
              {getInitials(name!)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="text-center mb-4">
        <h3 className="text-gray-900 mb-1">{name}</h3>
        <p className="text-[var(--color-primary)] mb-2">{specialty}</p>
        <p className="text-gray-600 line-clamp-2 text-sm px-2">{description}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center justify-center gap-1 mb-4">
        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
        <span className="text-gray-900">{rating?.toFixed(1)}</span>
        <span className="text-gray-500">/ 5</span>
      </div>

      <Button
        className="w-full hover:opacity-90 transition-opacity rounded-2xl shadow-md"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--color-secondary), var(--color-primary))',
        }}
        onClick={e => {
          e.stopPropagation();
          onClick();
        }}
      >
        <Calendar className="w-4 h-4 mr-2" />
        Ver horários
      </Button>
    </motion.div>
  );
}
