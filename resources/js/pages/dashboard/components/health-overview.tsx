import { Calendar, FileText, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const stats = [
  {
    icon: Calendar,
    label: 'Próxima Consulta',
    value: '22 Out',
    detail: 'Dr. Silva - Cardiologia',
    color: '#6C63FF',
  },
  {
    icon: FileText,
    label: 'Último Exame',
    value: '5 dias atrás',
    detail: 'Exame de sangue',
    color: '#00C6AE',
  },
  {
    icon: Users,
    label: 'Médicos Ativos',
    value: '4',
    detail: 'Em acompanhamento',
    color: '#F7C948',
  },
];

export function DashboardHealthOverview() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-white/20 transition-all group">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${stat.color}20, transparent 70%)`,
                }}
              />

              <div className="relative flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm text-[#B8B8C0] mb-2">{stat.label}</p>
                  <h3 className="mb-1" style={{ fontSize: '24px' }}>
                    {stat.value}
                  </h3>
                  <p className="text-sm text-[#B8B8C0]">{stat.detail}</p>
                </div>

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${stat.color}20`,
                    boxShadow: `0 0 20px ${stat.color}30`,
                  }}
                >
                  <stat.icon
                    className="w-6 h-6"
                    style={{ color: stat.color }}
                  />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="relative overflow-hidden p-6 bg-gradient-to-br from-[#6C63FF]/10 to-[#00C6AE]/5 backdrop-blur-xl border border-[#6C63FF]/20 rounded-2xl">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="mb-1">Score de Saúde</h3>
              <p className="text-sm text-[#B8B8C0]">
                Baseado em seus hábitos e consultas
              </p>
            </div>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background:
                  'conic-gradient(from 0deg, #6C63FF 0%, #00C6AE 75%, #ffffff20 75%)',
              }}
            >
              <div className="w-14 h-14 rounded-full bg-[#0F0F17] flex items-center justify-center">
                <span className="text-[20px] text-white">85</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Atividade Física</span>
                <span className="text-[#B8B8C0]">90%</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Nutrição</span>
                <span className="text-[#B8B8C0]">75%</span>
              </div>
              <Progress value={75} className="h-2 " />
            </div>
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Sono</span>
                <span className="text-[#B8B8C0]">88%</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 p-3 bg-[#10B981]/10 border border-[#10B981]/20 rounded-xl text-center"
          >
            <p className="text-sm text-[#10B981]">✨ Você está evoluindo!</p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
