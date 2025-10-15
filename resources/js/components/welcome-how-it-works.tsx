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
    color: '#6C63FF',
  },
  {
    id: createRandomId(),
    icon: LayoutDashboard,
    title: 'Gerencie sua clínica',
    description:
      'Painel completo para profissionais com métricas, histórico e ferramentas de gestão.',
    color: '#00C6AE',
  },
  {
    id: createRandomId(),
    icon: Activity,
    title: 'Acompanhe sua saúde',
    description:
      'Histórico médico completo, exames e evolução de tratamentos em um só lugar.',
    color: '#F7C948',
  },
];

export function WelcomeHowItWorks() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#0F0F17]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl mb-4">
            <span className="bg-gradient-to-r from-[#6C63FF] to-[#00C6AE] bg-clip-text text-transparent">
              Como funciona
            </span>
          </h2>
          <p className="text-[#A0A0B0] max-w-2xl mx-auto">
            Três passos simples para transformar sua experiência em saúde
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <div className="relative h-full bg-gradient-to-br from-[#1A152A] to-[#0F0F17] rounded-2xl border border-white/5 p-8 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${step.color}15, transparent 70%)`,
                    }}
                  />

                  <div className="relative mb-6">
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
                      style={{
                        backgroundColor: `${step.color}20`,
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {/* Icon Glow */}
                      <div
                        className="absolute inset-0 rounded-2xl blur-xl opacity-50"
                        style={{ backgroundColor: step.color }}
                      />
                      <Icon
                        className="relative z-10 h-8 w-8"
                        style={{ color: step.color }}
                      />
                    </motion.div>
                  </div>

                  <h3 className="text-[#EAEAEA] mb-3">{step.title}</h3>
                  <p className="text-[#A0A0B0]">{step.description}</p>

                  {/* Step Number */}
                  <div className="absolute top-6 right-6 text-6xl opacity-5">
                    {index + 1}
                  </div>

                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`,
                    }}
                  />
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-white/20 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
