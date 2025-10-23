import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';

export function WelcomeHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--surface)] via-[color:var(--bg)] to-[color:var(--accent)]/18">
        <motion.div
          className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-[color:var(--primary)]/28 blur-[128px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.28, 0.45, 0.28],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-[color:var(--accent)]/28 blur-[128px]"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.28, 0.48, 0.28],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="space-y-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="mb-4 text-3xl tracking-tight sm:text-3xl lg:text-7xl">
                <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--primary-hover)] to-[var(--accent)] bg-clip-text text-transparent">
                  Velan
                </span>
              </h1>
            </motion.div>

            <motion.p
              className="mx-auto max-w-2xl text-xl text-foreground/90 sm:text-2xl lg:text-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Cuidar, evoluir, simplificar.
            </motion.p>

            <motion.p
              className="mx-auto max-w-xl text-base text-[color:var(--text-secondary)] sm:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A próxima geração em gestão de saúde. Conecte pacientes, médicos e
              clínicas em uma plataforma inteligente e segura.
            </motion.p>

            <motion.div
              className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="rounded-2xl border-0 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] px-8 py-6 text-white shadow-lg shadow-[rgba(107,95,209,0.35)] transition-colors hover:from-[var(--primary-hover)] hover:to-[var(--accent)]"
                >
                  Começar agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-2xl border-2 border-[color:var(--accent)] bg-transparent px-8 py-6 text-[color:var(--accent)] transition-colors hover:bg-[color:var(--accent)]/12"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Ver demonstração
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative mt-16 h-64 sm:h-80 lg:h-96"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <motion.div
                className="absolute left-[10%] top-[20%] h-32 w-48 rounded-2xl border border-[color:var(--primary)]/30 bg-gradient-to-br from-[color:var(--primary)]/20 to-[color:var(--primary-hover)]/10 p-4 shadow-2xl backdrop-blur-xl"
                animate={{
                  y: [0, -20, 0],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="mb-2 h-8 w-8 rounded-lg bg-[color:var(--primary)]" />
                <div className="space-y-2">
                  <div className="h-2 w-full rounded bg-foreground/10" />
                  <div className="h-2 w-3/4 rounded bg-foreground/10" />
                </div>
              </motion.div>

              <motion.div
                className="absolute right-[10%] top-[30%] h-32 w-48 rounded-2xl border border-[color:var(--accent)]/30 bg-gradient-to-br from-[color:var(--accent)]/18 to-[color:var(--accent)]/8 p-4 shadow-2xl backdrop-blur-xl"
                animate={{
                  y: [0, 20, 0],
                  rotate: [2, -2, 2],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              >
                <div className="mb-2 h-8 w-8 rounded-lg bg-[color:var(--accent)]" />
                <div className="space-y-2">
                  <div className="h-2 w-full rounded bg-foreground/10" />
                  <div className="h-2 w-2/3 rounded bg-foreground/10" />
                </div>
              </motion.div>

              <motion.div
                className="absolute left-1/2 top-[50%] h-36 w-56 -translate-x-1/2 rounded-2xl border border-[color:var(--success)]/30 bg-gradient-to-br from-[color:var(--success)]/18 to-[color:var(--success)]/8 p-4 shadow-2xl backdrop-blur-xl"
                animate={{
                  y: [0, -15, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              >
                <div className="mb-3 flex gap-2">
                  <div className="h-6 w-6 rounded-full bg-[color:var(--success)]" />
                  <div className="h-6 w-6 rounded-full bg-[color:var(--success)]/60" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full rounded bg-foreground/10" />
                  <div className="h-2 w-5/6 rounded bg-foreground/10" />
                  <div className="h-2 w-4/6 rounded bg-foreground/10" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[color:var(--bg)] to-transparent" />
    </section>
  );
}
