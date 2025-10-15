import { BarChart3, Clock, Lock, Shield, Users, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { createRandomId } from '@/utils/create-random-id';

const benefits = [
  {
    id: createRandomId(),
    icon: Zap,
    title: 'Velocidade incomparável',
    description:
      'Interface otimizada para máxima performance. Carregamento instantâneo em qualquer dispositivo.',
    color: '#F7C948',
  },
  {
    id: createRandomId(),
    icon: Shield,
    title: 'Segurança total',
    description:
      'Dados criptografados end-to-end, compliance com LGPD e certificações internacionais.',
    color: '#6C63FF',
  },
  {
    id: createRandomId(),
    icon: Users,
    title: 'Colaboração em tempo real',
    description:
      'Equipes médicas conectadas. Compartilhe informações de forma segura e instantânea.',
    color: '#00C6AE',
  },
  {
    id: createRandomId(),
    icon: Clock,
    title: 'Disponível 24/7',
    description:
      'Acesse suas informações a qualquer hora, de qualquer lugar. Sincronização automática em nuvem.',
    color: '#A78BFA',
  },
  {
    id: createRandomId(),
    icon: BarChart3,
    title: 'Insights inteligentes',
    description:
      'Analytics avançados e relatórios personalizados para tomada de decisão baseada em dados.',
    color: '#00C6AE',
  },
  {
    id: createRandomId(),
    icon: Lock,
    title: 'Privacidade garantida',
    description:
      'Seus dados pertencem a você. Controle total sobre quem acessa suas informações.',
    color: '#6C63FF',
  },
];

export function WelcomeBenefits() {
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
            <span className="bg-gradient-to-r from-[#F7C948] via-[#6C63FF] to-[#00C6AE] bg-clip-text text-transparent">
              Por que escolher a Velan
            </span>
          </h2>
          <p className="text-[#A0A0B0] max-w-2xl mx-auto">
            Tecnologia de ponta combinada com experiência do usuário excepcional
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                {/* Card */}
                <div className="relative h-full bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm rounded-2xl border border-white/5 p-8 overflow-hidden">
                  {/* Hover Glow */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at top left, ${benefit.color}10, transparent 60%)`,
                    }}
                  />

                  <div className="relative mb-6">
                    <motion.div
                      className="w-14 h-14 rounded-xl flex items-center justify-center relative"
                      style={{
                        backgroundColor: `${benefit.color}15`,
                      }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      {/* Icon Glow */}
                      <div
                        className="absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                        style={{ backgroundColor: benefit.color }}
                      />
                      <Icon
                        className="relative z-10 h-7 w-7"
                        style={{ color: benefit.color }}
                      />
                    </motion.div>
                  </div>

                  <h3 className="text-[#EAEAEA] mb-3">{benefit.title}</h3>
                  <p className="text-[#A0A0B0] text-sm leading-relaxed">
                    {benefit.description}
                  </p>

                  <div
                    className="absolute top-0 right-0 w-20 h-20 opacity-5"
                    style={{
                      background: `radial-gradient(circle at top right, ${benefit.color}, transparent 70%)`,
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
