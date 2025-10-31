import { Calendar, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import { usePagination } from '@/hooks/use-pagination';
import { createRandomId } from '@/utils/create-random-id';
import { Badge } from '../../../components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Tabs, TabsContent, TabsList } from '../../../components/ui/tabs';
import { DashboardResultsExamsPagination } from './results-exams-pagination';

const recentExams = [
  {
    id: createRandomId(),
    name: 'Hemograma Completo',
    date: '15 Out 2025',
    doctor: 'Dr. Carlos Silva',
    highlight: true,
  },
  {
    id: createRandomId(),
    name: 'Glicemia em Jejum',
    date: '10 Out 2025',
    doctor: 'Dra. Ana Beatriz',
    highlight: false,
  },
  {
    id: createRandomId(),
    name: 'Radiografia de Tórax',
    date: '05 Out 2025',
    doctor: 'Dr. Pedro Henrique',
    highlight: false,
  },
  {
    id: createRandomId(),
    name: 'Ressonância Magnética',
    date: '28 Set 2025',
    doctor: 'Dra. Sofia Mendes',
    highlight: false,
  },
  {
    id: createRandomId(),
    name: 'Teste Ergométrico',
    date: '21 Set 2025',
    doctor: 'Dr. Marcelo Pires',
  },
  {
    id: createRandomId(),
    name: 'Ultrassom Obstétrico',
    date: '12 Set 2025',
    doctor: 'Dra. Helena Almeida',
    highlight: false,
  },
];

const historyExams = [
  {
    id: createRandomId(),
    name: 'Eletrocardiograma',
    date: '20 Set 2025',
    doctor: 'Dr. Carlos Silva',
    highlight: false,
  },
  {
    id: createRandomId(),
    name: 'Ultrassom Abdominal',
    date: '15 Ago 2025',
    doctor: 'Dra. Ana Beatriz',
    highlight: false,
  },
  {
    id: createRandomId(),
    name: 'Ressonância de Joelho',
    date: '02 Jul 2025',
    doctor: 'Dr. Gustavo Souza',
    highlight: false,
  },
  {
    id: createRandomId(),
    name: 'Mapeamento de Retina',
    date: '18 Jun 2025',
    doctor: 'Dra. Lívia Campos',
    highlight: false,
  },
  {
    id: createRandomId(),
    name: 'Exame de Colesterol',
    date: '30 Mai 2025',
    doctor: 'Dr. Ricardo Lima',
    highlight: false,
  },
];

type ExamsTabs = 'recent' | 'history';

const mixColor = (cssVar: string, percentage: number) =>
  `color-mix(in srgb, ${cssVar} ${percentage}%, transparent)`;

export function DashboardResultsExams() {
  const [activeTab, setActiveTab] = useState<ExamsTabs>('recent');

  const exams = activeTab === 'recent' ? recentExams : historyExams;

  const {
    paginatedData,
    totalPages,
    currentPage,
    goToPage,
    nextPage,
    prevPage,
  } = usePagination('results_page', exams, 3);

  const tabs = [
    { label: 'Recentes', value: 'recent' },
    { label: 'Histórico', value: 'history' },
  ];

  return (
    <Card className="mt-4 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-md">
      <CardHeader>
        <CardTitle className="mt-6 text-[1.05rem]">
          Resultados e Exames
        </CardTitle>
        <CardDescription className="text-sm text-[var(--color-text-secondary)] mt-1">
          Acesse seus resultados médicos
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={tab => {
            setActiveTab(tab as ExamsTabs);
            goToPage(1);
          }}
        >
          <TabsList className="relative flex w-full justify-between items-center p-3 border-b border-white/10 mb-4 rounded-sm">
            {tabs.map(tab => {
              const isActive = activeTab === tab.value;
              return (
                <button
                  type="submit"
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value as ExamsTabs)}
                  className={`relative text-sm p-2 font-medium transition-colors duration-200 flex-1 cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-[var(--color-text-tertiary)] hover:text-white/80'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute -bottom-[1px] left-0 right-0 h-[2px] rounded-sm"
                      style={{
                        backgroundImage:
                          'linear-gradient(to right, var(--color-accent), var(--color-chart-4))',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </TabsList>

          <TabsContent value={activeTab} className="space-y-2">
            {paginatedData.map((exam, index) => {
              const accent = exam.highlight
                ? 'var(--color-warning)'
                : 'var(--color-accent)';
              const cardStyles = {
                '--exam-bg': exam.highlight
                  ? mixColor(accent, 10)
                  : mixColor('var(--color-surface)', 5),
                '--exam-border': exam.highlight
                  ? mixColor(accent, 30)
                  : mixColor('var(--color-surface)', 10),
                '--exam-border-hover': exam.highlight
                  ? mixColor(accent, 50)
                  : mixColor('var(--color-surface)', 20),
                '--exam-icon-bg': mixColor(accent, 20),
                '--exam-icon-shadow': mixColor(
                  accent,
                  exam.highlight ? 30 : 25
                ),
                '--exam-icon-color': accent,
              } as CSSProperties;

              return (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Card
                    className="p-4 border rounded-xl transition-all hover:scale-[1.02] bg-[var(--exam-bg)] border-[color:var(--exam-border)] hover:border-[color:var(--exam-border-hover)]"
                    style={cardStyles}
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background: 'var(--exam-icon-bg)',
                          boxShadow: `0 0 15px var(--exam-icon-shadow)`,
                        }}
                      >
                        <FileText
                          className="w-6 h-6"
                          style={{ color: 'var(--exam-icon-color)' }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="mb-1 flex items-start justify-between gap-2">
                          <h4 className="truncate">{exam.name}</h4>
                          {exam.highlight && (
                            <Badge
                              className="shrink-0"
                              style={{
                                borderColor: mixColor(accent, 30),
                                background: mixColor(accent, 20),
                                color: accent,
                              }}
                            >
                              Novo
                            </Badge>
                          )}
                        </div>
                        <div className="mb-3 flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{exam.date}</span>
                          </div>
                          <span>•</span>
                          <span>{exam.doctor}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}

            <DashboardResultsExamsPagination
              totalPages={totalPages}
              currentPage={currentPage}
              goToPage={goToPage}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
