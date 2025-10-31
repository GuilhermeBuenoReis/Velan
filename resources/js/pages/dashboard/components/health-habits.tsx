import { Droplets, Footprints, Moon, Smile } from 'lucide-react';
import { motion } from 'motion/react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { createRandomId } from '@/utils/create-random-id';

const habits = [
  {
    id: createRandomId(),
    icon: Moon,
    label: 'Sono',
    value: '7.5h',
    goal: '8h',
    percentage: 94,
    colorVar: '--color-accent',
  },
  {
    id: createRandomId(),
    icon: Footprints,
    label: 'Passos',
    value: '8,542',
    goal: '10,000',
    percentage: 85,
    colorVar: '--color-chart-4',
  },
  {
    id: createRandomId(),
    icon: Droplets,
    label: 'Hidratação',
    value: '1.8L',
    goal: '2.5L',
    percentage: 72,
    colorVar: '--color-info',
  },
  {
    id: createRandomId(),
    icon: Smile,
    label: 'Humor',
    value: 'Ótimo',
    goal: '—',
    percentage: 90,
    colorVar: '--color-warning',
  },
];

const mixColor = (cssVar: string, percentage: number) =>
  `color-mix(in srgb, ${cssVar} ${percentage}%, transparent)`;

export function DashboardHealthHabits() {
  return (
    <Card className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
      <div className="mt-6">
        <h2>Saúde e Hábitos</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Acompanhe sua evolução diária
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {habits.map((habit, index) => {
          const colorValue = `var(${habit.colorVar})`;
          const tileBg = mixColor(colorValue, 20);
          const tileGlow = mixColor(colorValue, 30);

          return (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-all group">
                <div className="flex flex-col items-center text-center">
                  <div
                    className="h-16 w-16 rounded-2xl flex items-center justify-center mb-3 relative"
                    style={{ background: tileBg }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition"
                      style={{
                        background: `radial-gradient(circle, ${tileGlow}, transparent)`,
                      }}
                    />
                    <habit.icon
                      className="w-7 h-7 relative z-10"
                      style={{ color: colorValue }}
                    />
                  </div>
                  <h4 className="mb-1">{habit.label}</h4>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-2">
                    Meta: {habit.goal}
                  </p>

                  <div className="w-full mb-3 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xl font-semibold">
                        {habit.value}
                      </span>
                      <span className="text-sm text-[var(--color-text-secondary)]">
                        {habit.percentage}%
                      </span>
                    </div>
                    <Progress value={habit.percentage} />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 border rounded-sm text-center"
        style={{
          background:
            'linear-gradient(to right, color-mix(in srgb, var(--color-success) 10%, transparent), color-mix(in srgb, var(--color-chart-4) 10%, transparent))',
          borderColor: mixColor('var(--color-success)', 20),
        }}
      >
        <p className="text-sm">
          <span className="mr-2">🎯</span>
          <span className="text-[var(--color-success)]">
            Continue assim! Você está no caminho certo.
          </span>
        </p>
      </motion.div>
    </Card>
  );
}
