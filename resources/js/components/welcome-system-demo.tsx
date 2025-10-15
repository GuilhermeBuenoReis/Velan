import { motion } from 'motion/react';
import { createRandomId } from '@/utils/create-random-id';

const stats = [
  {
    id: createRandomId(),
    label: 'Consultas hoje',
    value: '12',
    color: '#6C63FF',
  },
  {
    id: createRandomId(),
    label: 'Pacientes ativos',
    value: '248',
    color: '#00C6AE',
  },
  {
    id: createRandomId(),
    label: 'Taxa de satisfação',
    value: '98%',
    color: '#F7C948',
  },
];

const scheduleItems = [
  { id: createRandomId(), time: '13:00' },
  { id: createRandomId(), time: '12:00' },
  { id: createRandomId(), time: '11:00' },
];

const chartData = [
  { id: createRandomId(), height: 40 },
  { id: createRandomId(), height: 70 },
  { id: createRandomId(), height: 50 },
  { id: createRandomId(), height: 80 },
  { id: createRandomId(), height: 60 },
  { id: createRandomId(), height: 90 },
  { id: createRandomId(), height: 75 },
];

export function WelcomeSystemDemo() {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-[#0F0F17] via-[#1A152A] to-[#0F0F17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl mb-4">
            <span className="bg-gradient-to-r from-[#00C6AE] to-[#6C63FF] bg-clip-text text-transparent">
              Tecnologia que funciona
            </span>
          </h2>
          <p className="text-[#A0A0B0] max-w-2xl mx-auto">
            Interface intuitiva e moderna, desenhada para profissionais que
            valorizam eficiência
          </p>
        </motion.div>

        <motion.div
          className="relative max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-[#6C63FF]/20 via-[#00C6AE]/20 to-[#F7C948]/20 rounded-3xl blur-3xl" />

          <div className="relative bg-[#0F0F17] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#1A152A] to-[#2A2535] border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF6B6B]" />
                <div className="w-3 h-3 rounded-full bg-[#F7C948]" />
                <div className="w-3 h-3 rounded-full bg-[#00C6AE]" />
              </div>
              <div className="flex-1 text-center text-sm text-[#A0A0B0]">
                Dashboard - Velan
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.id}
                    className="bg-gradient-to-br from-[#1A152A] to-[#2A2535] rounded-xl p-4 border border-white/5"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <p className="text-[#A0A0B0] text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl" style={{ color: stat.color }}>
                      {stat.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-[#1A152A] to-[#2A2535] rounded-xl p-6 border border-white/5">
                  <h3 className="text-[#EAEAEA] mb-4">Próximas consultas</h3>
                  <div className="space-y-3">
                    {scheduleItems.map(item => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 bg-[#0F0F17]/50 rounded-lg border border-white/5"
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-[#6C63FF] to-[#A78BFA] rounded-lg" />
                        <div className="flex-1">
                          <div className="h-3 bg-[#EAEAEA]/20 rounded w-32 mb-1" />
                          <div className="h-2 bg-[#EAEAEA]/10 rounded w-24" />
                        </div>
                        <div className="text-xs text-[#00C6AE]">
                          {item.time}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#1A152A] to-[#2A2535] rounded-xl p-6 border border-white/5">
                  <h3 className="text-[#EAEAEA] mb-4">Visão geral</h3>
                  <div className="h-48 flex items-end justify-between gap-2">
                    {chartData.map((bar, index) => (
                      <motion.div
                        key={bar.id}
                        className="flex-1 bg-gradient-to-t from-[#6C63FF] to-[#00C6AE] rounded-t-lg"
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
                  className="px-4 py-2 bg-gradient-to-r from-[#6C63FF] to-[#A78BFA] rounded-lg text-sm text-white"
                >
                  Nova consulta
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#1A152A] border border-[#00C6AE]/30 rounded-lg text-sm text-[#00C6AE]"
                >
                  Relatórios
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-[#1A152A] border border-white/10 rounded-lg text-sm text-[#EAEAEA]"
                >
                  Configurações
                </button>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-20 left-0 right-0 h-32 bg-gradient-to-b from-[#6C63FF]/5 to-transparent blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
}
