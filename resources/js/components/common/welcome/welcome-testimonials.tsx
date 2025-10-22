import { Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { createRandomId } from '@/utils/create-random-id';

type TestimonialTone = {
  base: string;
  soft: string;
  glow: string;
};

const testimonials = [
  {
    id: createRandomId(),
    name: 'Dr. Ana Carolina',
    role: 'Cardiologista',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    quote:
      'A Velan revolucionou a forma como gerencio minha clínica. Agora tenho mais tempo para focar no que realmente importa: meus pacientes.',
    tone: {
      base: 'rgba(107,95,209,1)',
      soft: 'rgba(107,95,209,0.16)',
      glow: 'rgba(107,95,209,0.3)',
    } satisfies TestimonialTone,
  },
  {
    id: createRandomId(),
    name: 'Roberto Silva',
    role: 'Paciente',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    quote:
      'Nunca foi tão fácil acompanhar minha saúde. Todo meu histórico médico está sempre disponível, em qualquer lugar.',
    tone: {
      base: 'rgba(76,163,176,1)',
      soft: 'rgba(76,163,176,0.16)',
      glow: 'rgba(76,163,176,0.28)',
    } satisfies TestimonialTone,
  },
  {
    id: createRandomId(),
    name: 'Dra. Mariana Costa',
    role: 'Clínica Médica',
    avatar:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
    quote:
      'A interface é intuitiva e elegante. Meus pacientes adoram a facilidade de agendamento e o acompanhamento em tempo real.',
    tone: {
      base: 'rgba(89,193,120,1)',
      soft: 'rgba(89,193,120,0.16)',
      glow: 'rgba(89,193,120,0.28)',
    } satisfies TestimonialTone,
  },
] as const;

const trustIndicators = [
  { id: createRandomId(), value: '10k+', label: 'Consultas realizadas' },
  { id: createRandomId(), value: '500+', label: 'Profissionais ativos' },
  { id: createRandomId(), value: '98%', label: 'Satisfação' },
  { id: createRandomId(), value: '24/7', label: 'Suporte' },
] as const;

export function WelcomeTestimonials() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--bg)] py-24 sm:py-32">
      <div className="absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[color:var(--primary)]/18 blur-[128px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[color:var(--accent)]/16 blur-[128px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl sm:text-5xl">
            <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--primary-hover)] to-[var(--accent)] bg-clip-text text-transparent">
              Confiado por profissionais
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-[color:var(--text-secondary)]">
            Veja o que médicos e pacientes estão falando sobre a Velan
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
              <div className="relative h-full overflow-hidden rounded-2xl border border-sidebar-border bg-gradient-to-br from-[color:var(--surface)] to-[color:var(--surface-muted)]/70 p-6 backdrop-blur-xl">
                <motion.div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at top, ${testimonial.tone.soft}, transparent 65%)`,
                  }}
                />

                <div className="relative mb-4">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: testimonial.tone.soft }}
                  >
                    <Quote
                      className="h-5 w-5"
                      style={{ color: testimonial.tone.base }}
                    />
                  </div>
                </div>

                <p className="relative z-10 mb-6 leading-relaxed text-foreground/90">
                  "{testimonial.quote}"
                </p>

                <div className="relative z-10 flex items-center gap-3">
                  <div className="relative">
                    <div
                      className="absolute inset-0 rounded-full opacity-50 blur-lg"
                      style={{ backgroundColor: testimonial.tone.glow }}
                    />
                    <ImageWithFallback
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="relative h-12 w-12 rounded-full border-2 object-cover"
                      style={{ borderColor: testimonial.tone.base }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-[color:var(--text-secondary)]">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div
                  className="absolute bottom-0 left-0 right-0 h-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${testimonial.tone.base}, transparent)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 border-t border-sidebar-border/70 pt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {trustIndicators.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <p className="mb-2 text-3xl sm:text-4xl">
                  <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                </p>
                <p className="text-sm text-[color:var(--text-secondary)]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
