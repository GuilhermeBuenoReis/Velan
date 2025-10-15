import { Check, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { createRandomId } from '@/utils/create-random-id';
import { Button } from './ui/button';

const plans = [
  {
    id: createRandomId(),
    name: 'Starter',
    price: 'R$ 49',
    period: '/mês',
    description: 'Perfeito para profissionais independentes',
    features: [
      'Até 50 pacientes',
      'Agendamento online',
      'Histórico médico digital',
      'Suporte por email',
      'App móvel básico',
    ],
    highlighted: false,
    color: '#6C63FF',
  },
  {
    id: createRandomId(),
    name: 'Pro',
    price: 'R$ 149',
    period: '/mês',
    description: 'Ideal para clínicas em crescimento',
    features: [
      'Pacientes ilimitados',
      'Agendamento inteligente',
      'Prontuário eletrônico completo',
      'Relatórios e analytics',
      'Suporte prioritário 24/7',
      'Integração com laboratórios',
      'API personalizada',
    ],
    highlighted: true,
    color: '#00C6AE',
    badge: 'Mais popular',
  },
  {
    id: createRandomId(),
    name: 'Clinic',
    price: 'R$ 399',
    period: '/mês',
    description: 'Solução completa para grandes clínicas',
    features: [
      'Tudo do plano Pro',
      'Multi-localização',
      'Gestão de equipe',
      'Telemedicina integrada',
      'Faturamento automático',
      'Customização avançada',
      'Gerente de conta dedicado',
    ],
    highlighted: false,
    color: '#F7C948',
  },
];

export function WelcomePricing() {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-[#0F0F17] via-[#1A152A] to-[#0F0F17] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#6C63FF]/10 to-transparent blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl mb-4">
            <span className="bg-gradient-to-r from-[#00C6AE] via-[#6C63FF] to-[#A78BFA] bg-clip-text text-transparent">
              Planos para cada necessidade
            </span>
          </h2>
          <p className="text-[#A0A0B0] max-w-2xl mx-auto">
            Escolha o plano ideal para você ou sua clínica. Cancele quando
            quiser.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: plan.highlighted ? -12 : -8 }}
              className={`relative group ${
                plan.highlighted ? 'md:-mt-4 md:mb-4' : ''
              }`}
            >
              <div
                className={`absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                  plan.highlighted ? 'opacity-50' : ''
                }`}
                style={{
                  background: `linear-gradient(135deg, ${plan.color}, transparent)`,
                }}
              />

              <div
                className={`relative h-full bg-gradient-to-br from-[#1A152A] to-[#0F0F17] rounded-2xl p-8 overflow-hidden ${
                  plan.highlighted ? 'border-2' : 'border border-white/5'
                }`}
                style={
                  plan.highlighted
                    ? { borderColor: `${plan.color}40` }
                    : undefined
                }
              >
                {plan.badge && (
                  <div className="absolute top-0 right-0">
                    <div
                      className="px-4 py-1 rounded-bl-2xl rounded-tr-2xl text-sm flex items-center gap-1"
                      style={{
                        backgroundColor: `${plan.color}20`,
                        color: plan.color,
                      }}
                    >
                      <Sparkles className="h-3 w-3" />
                      {plan.badge}
                    </div>
                  </div>
                )}

                <motion.div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    plan.highlighted ? 'opacity-30' : ''
                  }`}
                  style={{
                    background: `radial-gradient(circle at top, ${plan.color}15, transparent 60%)`,
                  }}
                />

                <div className="relative z-10">
                  <h3 className="text-2xl text-[#EAEAEA] mb-2">{plan.name}</h3>
                  <p className="text-sm text-[#A0A0B0] mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl" style={{ color: plan.color }}>
                        {plan.price}
                      </span>
                      <span className="text-[#A0A0B0]">{plan.period}</span>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className={`w-full mb-8 rounded-xl ${
                        plan.highlighted
                          ? 'bg-gradient-to-r text-white shadow-lg'
                          : 'bg-transparent border-2 hover:bg-white/5'
                      }`}
                      style={
                        plan.highlighted
                          ? {
                              backgroundImage: `linear-gradient(135deg, ${plan.color}, ${plan.color}CC)`,
                              boxShadow: `0 8px 32px ${plan.color}40`,
                            }
                          : {
                              borderColor: `${plan.color}40`,
                              color: plan.color,
                            }
                      }
                    >
                      Começar agora
                    </Button>
                  </motion.div>

                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={plan.id}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * featureIndex }}
                      >
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: `${plan.color}20` }}
                        >
                          <Check
                            className="h-3 w-3"
                            style={{ color: plan.color }}
                          />
                        </div>
                        <span className="text-sm text-[#EAEAEA]/80">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 transition-opacity duration-500 ${
                    plan.highlighted
                      ? 'opacity-100'
                      : 'opacity-0 group-hover:opacity-100'
                  }`}
                  style={{
                    background: `linear-gradient(90deg, transparent, ${plan.color}, transparent)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-sm text-[#A0A0B0] mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          Todos os planos incluem 14 dias de teste grátis. Sem cartão de crédito
          necessário.
        </motion.p>
      </div>
    </section>
  );
}
