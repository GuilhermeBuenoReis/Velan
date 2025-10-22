import { Activity, Calendar, LayoutDashboard } from 'lucide-react';
import { motion } from 'motion/react';
import { createRandomId } from '@/utils/create-random-id';

const steps = [
  {
    id: createRandomId(),
    icon: Calendar,
    title: 'Agende com facilidade',
    description:
      'Sistema inteligente de agendamentos que se adapta à sua rotina e disponibilidade.',
    tone: {
      solid: 'rgba(107,95,209,1)',
      soft: 'rgba(107,95,209,0.16)',
      glow: 'rgba(107,95,209,0.28)',
    },
  },
  {
    id: createRandomId(),
    icon: LayoutDashboard,
    title: 'Gerencie sua clínica',
    description:
      'Painel completo para profissionais com métricas, histórico e ferramentas de gestão.',
    tone: {
      solid: 'rgba(76,163,176,1)',
      soft: 'rgba(76,163,176,0.16)',
      glow: 'rgba(76,163,176,0.28)',
    },
  },
  {
    id: createRandomId(),
    icon: Activity,
    title: 'Acompanhe sua saúde',
    description:
      'Histórico médico completo, exames e evolução de tratamentos em um só lugar.',
    tone: {
      solid: 'rgba(89,193,120,1)',
      soft: 'rgba(89,193,120,0.16)',
      glow: 'rgba(89,193,120,0.28)',
    },
  },
] as const;

export function WelcomeHowItWorks() {
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
            <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
              Como funciona
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-[color:var(--text-secondary)]">
            Três passos simples para transformar sua experiência em saúde
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="relative h-full overflow-hidden rounded-2xl border border-sidebar-border bg-gradient-to-br from-[color:var(--surface)] to-[color:var(--surface-muted)] p-8">
                  <motion.div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${step.tone.glow}, transparent 70%)`,
                    }}
                  />

                  <div className="relative mb-6">
                    <motion.div
                      className="relative flex h-16 w-16 items-center justify-center rounded-2xl"
                      style={{
                        backgroundColor: step.tone.soft,
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div
                        className="absolute inset-0 rounded-2xl blur-xl opacity-50"
                        style={{ backgroundColor: step.tone.glow }}
                      />
                      <Icon
                        className="relative z-10 h-8 w-8"
                        style={{ color: step.tone.solid }}
                      />
                    </motion.div>
                  </div>

                  <h3 className="mb-3 text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-[color:var(--text-secondary)]">
                    {step.description}
                  </p>

                  <div className="absolute right-6 top-6 text-6xl text-foreground/5">
                    {index + 1}
                  </div>

                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${step.tone.glow}, transparent)`,
                    }}
                  />
                </div>

                {index < steps.length - 1 && (
                  <div className="absolute right-[-1rem] top-1/2 hidden h-0.5 w-8 bg-gradient-to-r from-foreground/10 to-transparent md:block" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
