import { Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { createRandomId } from '@/utils/create-random-id';

const testimonials = [
  {
    id: createRandomId(),
    name: 'Dr. Ana Carolina',
    role: 'Cardiologista',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    quote:
      'A Velan revolucionou a forma como gerencio minha clínica. Agora tenho mais tempo para focar no que realmente importa: meus pacientes.',
    color: '#6C63FF',
  },
  {
    id: createRandomId(),
    name: 'Roberto Silva',
    role: 'Paciente',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    quote:
      'Nunca foi tão fácil acompanhar minha saúde. Todo meu histórico médico está sempre disponível, em qualquer lugar.',
    color: '#00C6AE',
  },
  {
    id: createRandomId(),
    name: 'Dra. Mariana Costa',
    role: 'Clínica Médica',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
    quote:
      'A interface é intuitiva e elegante. Meus pacientes adoram a facilidade de agendamento e o acompanhamento em tempo real.',
    color: '#F7C948',
  },
];

const trustIndicators = [
  { id: createRandomId(), value: '10k+', label: 'Consultas realizadas' },
  { id: createRandomId(), value: '500+', label: 'Profissionais ativos' },
  { id: createRandomId(), value: '98%', label: 'Satisfação' },
  { id: createRandomId(), value: '24/7', label: 'Suporte' },
];

export function WelcomeTestimonials() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#0F0F17] overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#6C63FF]/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00C6AE]/10 rounded-full blur-[128px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl mb-4">
            <span className="bg-gradient-to-r from-[#6C63FF] via-[#A78BFA] to-[#00C6AE] bg-clip-text text-transparent">
              Confiado por profissionais
            </span>
          </h2>
          <p className="text-[#A0A0B0] max-w-2xl mx-auto">
            Veja o que médicos e pacientes estão falando sobre a Velan
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="relative h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-6 overflow-hidden">
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at top, ${testimonial.color}10, transparent 70%)`,
                  }}
                />

                <div className="relative mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${testimonial.color}20` }}
                  >
                    <Quote
                      className="h-5 w-5"
                      style={{ color: testimonial.color }}
                    />
                  </div>
                </div>

                {/* Quote Text */}
                <p className="text-[#EAEAEA]/90 mb-6 relative z-10 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-3 relative z-10">
                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-full blur-lg opacity-50"
                      style={{ backgroundColor: testimonial.color }}
                    />
                    <ImageWithFallback
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="relative w-12 h-12 rounded-full object-cover border-2"
                      style={{ borderColor: testimonial.color }}
                    />
                  </div>
                  <div>
                    <p className="text-[#EAEAEA]">{testimonial.name}</p>
                    <p className="text-sm text-[#A0A0B0]">{testimonial.role}</p>
                  </div>
                </div>

                <div
                  className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${testimonial.color}, transparent)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 pt-16 border-t border-white/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {trustIndicators.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <p className="text-3xl sm:text-4xl bg-gradient-to-r from-[#6C63FF] to-[#00C6AE] bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-[#A0A0B0]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
