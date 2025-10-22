import { motion } from 'motion/react';
import { createRandomId } from '@/utils/create-random-id';

const stats = [
  {
    id: createRandomId(),
    label: 'Consultas hoje',
    value: '12',
    tone: {
      base: 'rgba(107,95,209,1)',
      soft: 'rgba(107,95,209,0.16)',
    },
  },
  {
    id: createRandomId(),
    label: 'Pacientes ativos',
    value: '248',
    tone: {
      base: 'rgba(76,163,176,1)',
      soft: 'rgba(76,163,176,0.16)',
    },
  },
  {
    id: createRandomId(),
    label: 'Taxa de satisfação',
    value: '98%',
    tone: {
      base: 'rgba(89,193,120,1)',
      soft: 'rgba(89,193,120,0.18)',
    },
  },
] as const;

const scheduleItems = [
  { id: createRandomId(), time: '13:00' },
  { id: createRandomId(), time: '12:00' },
  { id: createRandomId(), time: '11:00' },
] as const;

const chartData = [
  { id: createRandomId(), height: 40 },
  { id: createRandomId(), height: 70 },
  { id: createRandomId(), height: 50 },
  { id: createRandomId(), height: 80 },
  { id: createRandomId(), height: 60 },
  { id: createRandomId(), height: 90 },
  { id: createRandomId(), height: 75 },
] as const;

export function WelcomeSystemDemo() {
  return (
    <section className="relative bg-gradient-to-b from-[color:var(--bg)] via-[color:var(--surface-muted)] to-[color:var(--bg)] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl sm:text-5xl">
            <span className="bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] bg-clip-text text-transparent">
              Tecnologia que funciona
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-[color:var(--text-secondary)]">
            Interface intuitiva e moderna, desenhada para profissionais que
            valorizam eficiência
          </p>
        </motion.div>

        <motion.div
          className="relative mx-auto max-w-5xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[var(--primary)]/20 via-[var(--accent)]/20 to-[var(--success)]/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-3xl border border-sidebar-border bg-[color:var(--surface)] shadow-[0_30px_80px_rgba(14,13,19,0.35)]">
            <div className="flex items-center gap-2 border-b border-sidebar-border/70 bg-gradient-to-r from-[color:var(--surface-muted)] to-[color:var(--surface)] px-4 py-3">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-[color:var(--destructive)]/80" />
                <div className="h-3 w-3 rounded-full bg-[color:var(--accent)]/80" />
                <div className="h-3 w-3 rounded-full bg-[color:var(--success)]/80" />
              </div>
              <div className="flex-1 text-center text-sm text-[color:var(--text-secondary)]">
                Dashboard - Velan
              </div>
            </div>

            <div className="space-y-6 p-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.id}
                    className="rounded-xl border border-sidebar-border/60 bg-gradient-to-br from-[color:var(--surface-muted)]/80 to-[color:var(--surface)] p-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <p className="mb-1 text-sm text-[color:var(--text-secondary)]">
                      {stat.label}
                    </p>
                    <p
                      className="text-3xl font-semibold"
                      style={{ color: stat.tone.base }}
                    >
                      {stat.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="rounded-xl border border-sidebar-border/60 bg-gradient-to-br from-[color:var(--surface-muted)]/80 to-[color:var(--surface)] p-6">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">
                    Próximas consultas
                  </h3>
                  <div className="space-y-3">
                    {scheduleItems.map(item => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 rounded-lg border border-sidebar-border/80 bg-[color:var(--surface)]/80 p-3"
                      >
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)]" />
                        <div className="flex-1">
                          <div className="mb-1 h-3 w-32 rounded bg-foreground/10" />
                          <div className="h-2 w-24 rounded bg-foreground/10" />
                        </div>
                        <div className="text-xs font-medium text-[color:var(--accent)]">
                          {item.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-sidebar-border/60 bg-gradient-to-br from-[color:var(--surface-muted)]/80 to-[color:var(--surface)] p-6">
                  <h3 className="mb-4 text-lg font-semibold text-foreground">
                    Visão geral
                  </h3>
                  <div className="flex h-48 items-end justify-between gap-2">
                    {chartData.map((bar, index) => (
                      <motion.div
                        key={bar.id}
                        className="flex-1 rounded-t-lg bg-gradient-to-t from-[var(--primary)] to-[var(--accent)]"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${bar.height}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="rounded-lg bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] px-4 py-2 text-sm font-medium text-white shadow-[0_10px_24px_rgba(107,95,209,0.35)] transition-transform hover:scale-[1.02]"
                >
                  Nova consulta
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-[color:var(--accent)]/60 bg-[color:var(--surface)] px-4 py-2 text-sm font-medium text-[color:var(--accent)] transition-colors hover:bg-[color:var(--accent)]/12"
                >
                  Relatórios
                </button>
                <button
                  type="button"
                  className="rounded-lg border border-sidebar-border/70 bg-[color:var(--surface)] px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-[color:var(--surface-muted)]/60"
                >
                  Configurações
                </button>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-20 left-0 right-0 h-32 bg-gradient-to-b from-[var(--primary)]/10 to-transparent blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
