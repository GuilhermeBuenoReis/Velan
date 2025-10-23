import { Check, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { createRandomId } from '@/utils/create-random-id';

type PlanTone = {
  base: string;
  soft: string;
  shadow: string;
  gradient: string;
};

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
    tone: {
      base: 'rgba(107,95,209,1)',
      soft: 'rgba(107,95,209,0.18)',
      shadow: 'rgba(107,95,209,0.28)',
      gradient:
        'linear-gradient(135deg, rgba(107,95,209,1), rgba(133,122,226,1))',
    } satisfies PlanTone,
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
    tone: {
      base: 'rgba(76,163,176,1)',
      soft: 'rgba(76,163,176,0.2)',
      shadow: 'rgba(76,163,176,0.32)',
      gradient:
        'linear-gradient(135deg, rgba(76,163,176,1), rgba(124,189,199,1))',
    } satisfies PlanTone,
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
    tone: {
      base: 'rgba(89,193,120,1)',
      soft: 'rgba(89,193,120,0.18)',
      shadow: 'rgba(89,193,120,0.3)',
      gradient:
        'linear-gradient(135deg, rgba(89,193,120,1), rgba(126,208,150,1))',
    } satisfies PlanTone,
  },
] as const;

export function WelcomePricing() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[color:var(--bg)] via-[color:var(--surface-muted)] to-[color:var(--bg)] py-24 sm:py-32">
      <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 bg-velan-gradient-light opacity-40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-16 text-center sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-4xl sm:text-5xl">
            <span className="bg-gradient-to-r from-[var(--accent)] via-[var(--primary)] to-[var(--primary-hover)] bg-clip-text text-transparent">
              Planos para cada necessidade
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-[color:var(--text-secondary)]">
            Escolha o plano ideal para você ou sua clínica. Cancele quando
            quiser.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: plan.highlighted ? -12 : -8 }}
              className={`group relative ${
                plan.highlighted ? 'md:-mt-4 md:mb-4' : ''
              }`}
            >
              <div
                className={`absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                  plan.highlighted ? 'opacity-60' : ''
                }`}
                style={{
                  background: plan.tone.gradient,
                }}
              />

              <div
                className={`relative h-full overflow-hidden rounded-2xl border p-8 ${
                  plan.highlighted
                    ? 'border-transparent bg-[color:var(--surface)] shadow-[0_20px_60px_rgba(76,163,176,0.18)]'
                    : 'border-sidebar-border bg-gradient-to-br from-[color:var(--surface)] to-[color:var(--surface-muted)]'
                }`}
                style={
                  plan.highlighted
                    ? { boxShadow: `0 20px 60px ${plan.tone.shadow}` }
                    : undefined
                }
              >
                {plan.badge && (
                  <div className="absolute right-0 top-0">
                    <div
                      className="flex items-center gap-1 rounded-bl-2xl rounded-tr-2xl px-4 py-1 text-sm"
                      style={{
                        backgroundColor: plan.tone.soft,
                        color: plan.tone.base,
                      }}
                    >
                      <Sparkles className="h-3 w-3" />
                      {plan.badge}
                    </div>
                  </div>
                )}

                <motion.div
                  className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                    plan.highlighted ? 'opacity-25' : ''
                  }`}
                  style={{
                    background: `radial-gradient(circle at top, ${plan.tone.soft}, transparent 65%)`,
                  }}
                />

                <div className="relative z-10">
                  <h3 className="mb-2 text-2xl font-semibold text-foreground">
                    {plan.name}
                  </h3>
                  <p className="mb-6 text-sm text-[color:var(--text-secondary)]">
                    {plan.description}
                  </p>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span
                        className="text-5xl font-semibold"
                        style={{ color: plan.tone.base }}
                      >
                        {plan.price}
                      </span>
                      <span className="text-[color:var(--text-secondary)]">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className={`mb-8 w-full rounded-xl ${
                        plan.highlighted
                          ? 'bg-[length:200%_200%] text-white transition-[background-position] duration-300'
                          : 'border-2 bg-transparent transition-colors hover:bg-[color:var(--surface)]/10'
                      }`}
                      style={
                        plan.highlighted
                          ? {
                              backgroundImage: plan.tone.gradient,
                              boxShadow: `0 12px 36px ${plan.tone.shadow}`,
                            }
                          : {
                              borderColor: plan.tone.soft,
                              color: plan.tone.base,
                            }
                      }
                    >
                      Começar agora
                    </Button>
                  </motion.div>

                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={`${plan.id}-${featureIndex}`}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.08 * featureIndex }}
                      >
                        <div
                          className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: plan.tone.soft }}
                        >
                          <Check
                            className="h-3 w-3"
                            style={{ color: plan.tone.base }}
                          />
                        </div>
                        <span className="text-sm text-[color:var(--text-secondary)]">
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
                    background: `linear-gradient(90deg, transparent, ${plan.tone.base}, transparent)`,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-12 text-center text-sm text-[color:var(--text-secondary)]"
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
