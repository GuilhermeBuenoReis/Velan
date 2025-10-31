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
    colorVar: '--color-accent',
  },
  {
    icon: FileText,
    label: 'Último Exame',
    value: '5 dias atrás',
    detail: 'Exame de sangue',
    colorVar: '--color-chart-4',
  },
  {
    icon: Users,
    label: 'Médicos Ativos',
    value: '4',
    detail: 'Em acompanhamento',
    colorVar: '--color-warning',
  },
];

const mixColor = (cssVar: string, percentage: number) =>
  `color-mix(in srgb, ${cssVar} ${percentage}%, transparent)`;

export function DashboardHealthOverview() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const colorValue = `var(${stat.colorVar})`;
          const radialTint = mixColor(colorValue, 15);
          const iconBg = mixColor(colorValue, 18);
          const shadowTint = mixColor(colorValue, 25);

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden p-6 bg-white/5 backdrop-blur-xl border rounded-2xl hover:border-white/20 transition-all group">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${radialTint}, transparent 70%)`,
                  }}
                />

                <div className="relative flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                      {stat.label}
                    </p>
                    <h3 className="mb-1" style={{ fontSize: '24px' }}>
                      {stat.value}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {stat.detail}
                    </p>
                  </div>

                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: iconBg,
                      boxShadow: `0 0 20px ${shadowTint}`,
                    }}
                  >
                    <stat.icon
                      className="w-6 h-6"
                      style={{ color: colorValue }}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card
          className="relative overflow-hidden p-6 backdrop-blur-xl border rounded-2xl"
          style={{
            backgroundImage:
              'linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 10%, transparent), color-mix(in srgb, var(--color-chart-4) 5%, transparent))',
            borderColor: mixColor('var(--color-accent)', 20),
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="mb-1">Score de Saúde</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Baseado em seus hábitos e consultas
              </p>
            </div>
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                background:
                  'conic-gradient(from 0deg, var(--color-accent) 0%, var(--color-chart-4) 75%, var(--color-border-translucent) 75%)',
              }}
            >
              <div className="w-14 h-14 rounded-full bg-[var(--color-surface-overlay)] flex items-center justify-center">
                <span className="text-[20px] text-white">85</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Atividade Física</span>
                <span className="text-[var(--color-text-secondary)]">90%</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Nutrição</span>
                <span className="text-[var(--color-text-secondary)]">75%</span>
              </div>
              <Progress value={75} className="h-2 " />
            </div>
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Sono</span>
                <span className="text-[var(--color-text-secondary)]">88%</span>
              </div>
              <Progress value={88} className="h-2" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 p-3 border rounded-xl text-center"
            style={{
              background: mixColor('var(--color-success)', 15),
              borderColor: mixColor('var(--color-success)', 20),
            }}
          >
            <p className="text-sm text-[var(--color-success)]">
              ✨ Você está evoluindo!
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
