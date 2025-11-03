import type { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import { Calendar, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { CalendarView } from '../context/calendar-context';
import { useCalendar } from '../context/calendar-context';

export function CalendarHeader() {
  const { currentDate, currentView, goPrevious, goNext, goToday, setView } =
    useCalendar();

  const formatDateRangeByView = (date: Dayjs, view: string): string => {
    const dateFormat = date.locale('pt-br');

    if (view === 'day') return dateFormat.format('dddd, D [de] MMMM [de] YYYY');
    if (view === 'week') {
      const start = dateFormat.startOf('week').format('D MMM');
      const end = dateFormat.endOf('week').format('D MMM YYYY');
      return `${start} - ${end}`;
    }
    if (view === 'month') return dateFormat.format('MMMM [de] YYYY');
    if (view === 'year') return dateFormat.format('YYYY');
    return '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-6 py-4"
    >
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center">
          <div className="flex items-center gap-3 min-w-[320px]">
            <Calendar className="mr-2 h-5 w-5 text-[var(--color-primary)]" />
            <h1 className="text-[var(--color-text)] font-semibold text-lg capitalize">
              {formatDateRangeByView(currentDate, currentView)}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={goPrevious}
              className="h-8 w-8 rounded-full hover:bg-[var(--color-surface-hover)] cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4 text-[var(--color-text-secondary)]" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={goNext}
              className="h-8 w-8 rounded-full hover:bg-[var(--color-surface-hover)] cursor-pointer"
            >
              <ChevronRight className="h-4 w-4 text-[var(--color-text-secondary)]" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={goToday}
              className="rounded-sm border-[var(--color-border)] text-gray-900 p-3 cursor-pointer"
            >
              Hoje
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Tabs
            value={currentView}
            onValueChange={value => setView(value as CalendarView)}
          >
            <TabsList className="h-9 bg-[var(--color-surface-muted)]">
              <TabsTrigger
                value="day"
                className="data-[state=active]:bg-[var(--color-surface)] cursor-pointer"
              >
                Dia
              </TabsTrigger>
              <TabsTrigger
                value="week"
                className="data-[state=active]:bg-[var(--color-surface)] cursor-pointer"
              >
                Semana
              </TabsTrigger>
              <TabsTrigger
                value="month"
                className="data-[state=active]:bg-[var(--color-surface)] cursor-pointer"
              >
                Mês
              </TabsTrigger>
              <TabsTrigger
                value="year"
                className="data-[state=active]:bg-[var(--color-surface)] cursor-pointer"
              >
                Ano
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-secondary)]" />
            <Input
              type="text"
              placeholder="Pesquisar por eventos"
              className="h-9 w-64 rounded-lg border-[var(--color-border)] bg-[var(--color-surface)] pl-9 text-[var(--color-text)] focus:border-[var(--color-border-strong)]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
