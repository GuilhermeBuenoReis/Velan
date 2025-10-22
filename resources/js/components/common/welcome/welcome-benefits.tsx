import { BarChart3, Clock, Lock, Shield, Users, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { createRandomId } from '@/utils/create-random-id';

type BenefitTone = {
  solid: string;
  soft: string;
  glow: string;
};

const benefits = [
  {
    id: createRandomId(),
    icon: Zap,
    title: 'Velocidade incomparável',
    description:
      'Interface otimizada para máxima performance. Carregamento instantâneo em qualquer dispositivo.',
    tone: {
      solid: 'rgba(76,163,176,1)',
      soft: 'rgba(76,163,176,0.15)',
      glow: 'rgba(76,163,176,0.28)',
    } satisfies BenefitTone,
  },
  {
    id: createRandomId(),
    icon: Shield,
    title: 'Segurança total',
    description:
      'Dados criptografados end-to-end, compliance com LGPD e certificações internacionais.',
    tone: {
      solid: 'rgba(107,95,209,1)',
      soft: 'rgba(107,95,209,0.15)',
      glow: 'rgba(107,95,209,0.28)',
    } satisfies BenefitTone,
  },
  {
    id: createRandomId(),
    icon: Users,
    title: 'Colaboração em tempo real',
    description:
      'Equipes médicas conectadas. Compartilhe informações de forma segura e instantânea.',
    tone: {
      solid: 'rgba(142,128,240,1)',
      soft: 'rgba(142,128,240,0.15)',
      glow: 'rgba(142,128,240,0.28)',
    } satisfies BenefitTone,
  },
  {
    id: createRandomId(),
    icon: Clock,
    title: 'Disponível 24/7',
    description:
      'Acesse suas informações a qualquer hora, de qualquer lugar. Sincronização automática em nuvem.',
    tone: {
      solid: 'rgba(236,235,244,1)',
      soft: 'rgba(236,235,244,0.18)',
      glow: 'rgba(236,235,244,0.28)',
    } satisfies BenefitTone,
  },
  {
    id: createRandomId(),
    icon: BarChart3,
    title: 'Insights inteligentes',
    description:
      'Analytics avançados e relatórios personalizados para tomada de decisão baseada em dados.',
    tone: {
      solid: 'rgba(67,163,102,1)',
      soft: 'rgba(67,163,102,0.15)',
      glow: 'rgba(67,163,102,0.28)',
    } satisfies BenefitTone,
  },
  {
    id: createRandomId(),
    icon: Lock,
    title: 'Privacidade garantida',
    description:
      'Seus dados pertencem a você. Controle total sobre quem acessa suas informações.',
    tone: {
      solid: 'rgba(124,110,228,1)',
      soft: 'rgba(124,110,228,0.15)',
      glow: 'rgba(124,110,228,0.28)',
    } satisfies BenefitTone,
  },
] as const;

export function WelcomeBenefits() {
  return (
    <section className="relative bg-[color:var(--bg)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl sm:text-5xl">
            <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--primary-hover)] to-[var(--accent)] bg-clip-text text-transparent">
              Por que escolher a Velan
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-[color:var(--text-secondary)]">
            Tecnologia de ponta combinada com experiência do usuário excepcional
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="relative h-full overflow-hidden rounded-2xl border border-sidebar-border/70 bg-gradient-to-br from-[color:var(--surface)] to-[color:var(--surface-muted)]/60 p-8 backdrop-blur-sm">
                  <motion.div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at top left, ${benefit.tone.glow}, transparent 60%)`,
                    }}
                  />

                  <div className="relative mb-6">
                    <motion.div
                      className="relative flex h-14 w-14 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: benefit.tone.soft,
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-60"
                        style={{ backgroundColor: benefit.tone.glow }}
                      />
                      <Icon
                        className="relative z-10 h-7 w-7"
                        style={{ color: benefit.tone.solid }}
                      />
                    </motion.div>
                  </div>

                  <h3 className="mb-3 text-lg font-semibold text-foreground">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
                    {benefit.description}
                  </p>

                  <div
                    className="absolute right-0 top-0 h-20 w-20 opacity-10"
                    style={{
                      background: `radial-gradient(circle at top right, ${benefit.tone.glow}, transparent 70%)`,
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
