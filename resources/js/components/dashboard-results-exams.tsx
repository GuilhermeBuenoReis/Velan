import { Calendar, Download, Eye, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { createRandomId } from '@/utils/create-random-id';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const recentExams = [
  {
    id: createRandomId(),
    name: 'Hemograma Completo',
    date: '15 Out 2025',
    doctor: 'Dr. Carlos Silva',
    status: 'Disponível',
    highlight: true,
  },
  {
    id: createRandomId(),
    name: 'Glicemia em Jejum',
    date: '10 Out 2025',
    doctor: 'Dra. Ana Beatriz',
    status: 'Disponível',
    highlight: false,
  },
  {
    id: createRandomId(),
    name: 'Radiografia de Tórax',
    date: '05 Out 2025',
    doctor: 'Dr. Pedro Henrique',
    status: 'Disponível',
    highlight: false,
  },
];

const historyExams = [
  {
    id: createRandomId(),
    name: 'Eletrocardiograma',
    date: '20 Set 2025',
    doctor: 'Dr. Carlos Silva',
    status: 'Arquivado',
  },
  {
    id: createRandomId(),
    name: 'Ultrassom Abdominal',
    date: '15 Ago 2025',
    doctor: 'Dra. Ana Beatriz',
    status: 'Arquivado',
  },
];

type ExamsTabs = 'recent' | 'history';

export function DashboardResultsExams() {
  return (
    <Card className="mt-4 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
      <CardHeader>
        <CardTitle className="mt-6">Resultados e Exames</CardTitle>
        <CardDescription className="text-sm text-[#B8B8C0] mt-1">
          Acesse seus resultados médicos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={'recent' satisfies ExamsTabs} className="w-full">
          <TabsList className="w-full bg-white/5 p-1 rounded-xl mb-4">
            <TabsTrigger
              value={'recent' satisfies ExamsTabs}
              className="flex-1 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#6C63FF]/20 data-[state=active]:to-[#00C6AE]/10"
            >
              Recentes
            </TabsTrigger>
            <TabsTrigger
              value={'history' satisfies ExamsTabs}
              className="flex-1 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#6C63FF]/20 data-[state=active]:to-[#00C6AE]/10"
            >
              Histórico
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  );
}
