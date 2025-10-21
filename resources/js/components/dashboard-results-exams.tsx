import { Calendar, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { usePagination } from '@/hooks/use-pagination';
import { createRandomId } from '@/utils/create-random-id';
import { DashboardResultsExamsPagination } from './dashboard-result-exams-pagination';
import { Badge } from './ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Tabs, TabsContent, TabsList } from './ui/tabs';

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
        <CardDescription className="text-sm text-[#B8B8C0] mt-1">
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
                    isActive ? 'text-white' : 'text-[#999] hover:text-white/80'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-gradient-to-r from-[#6C63FF] to-[#00C6AE] rounded-sm"
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
            {paginatedData.map((exam, index) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Card
                  className={`p-4 border rounded-xl transition-all hover:scale-[1.02] ${
                    exam.highlight
                      ? 'bg-[#F7C948]/10 border-[#F7C948]/30 hover:border-[#F7C948]/50'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* conteúdo do exame */}
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${
                        exam.highlight ? 'bg-[#F7C948]/20' : 'bg-[#6C63FF]/20'
                      }`}
                      style={{
                        boxShadow: exam.highlight
                          ? '0 0 15px rgba(247, 201, 72, 0.3)'
                          : '0 0 15px rgba(108, 99, 255, 0.25)',
                      }}
                    >
                      <FileText
                        className="w-6 h-6"
                        style={{
                          color: exam.highlight ? '#F7C948' : '#6C63FF',
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="mb-1 flex items-start justify-between gap-2">
                        <h4 className="truncate">{exam.name}</h4>
                        {exam.highlight && (
                          <Badge className="shrink-0 border-[#F7C948]/30 bg-[#F7C948]/20 text-[#F7C948]">
                            Novo
                          </Badge>
                        )}
                      </div>
                      <div className="mb-3 flex items-center gap-3 text-sm text-[#B8B8C0]">
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
            ))}

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
