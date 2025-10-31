import type { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import { Calendar, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCalendar } from '../context/calendar-context';

export function CalendarHeader() {
  const { currentDate, currentView, goPrevious, goNext, goToday, setView } =
    useCalendar();

  const formatDateRangeByView = (date: Dayjs, view: string): string => {
    const d = date.locale('pt-br');

    if (view === 'day') return d.format('dddd, D [de] MMMM [de] YYYY');
    if (view === 'week') {
      const start = d.startOf('week').format('D MMM');
      const end = d.endOf('week').format('D MMM YYYY');
      return `${start} - ${end}`;
    }
    if (view === 'month') return d.format('MMMM [de] YYYY');
    if (view === 'year') return d.format('YYYY');
    return '';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-10 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-4 shadow-sm"
    >
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg text-white shadow-sm"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, var(--color-secondary), var(--color-primary))',
              }}
            >
              <Calendar className="h-5 w-5" />
            </div>
            <span className="tracking-tight text-[var(--color-text)] font-medium">
              HealthCare
            </span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="min-w-[280px] text-[var(--color-text)] font-medium">
              {formatDateRangeByView(currentDate, currentView)}
            </h1>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={goPrevious}
                className="h-8 w-8 rounded-lg hover:bg-[var(--color-surface-hover)]"
              >
                <ChevronLeft className="h-4 w-4 text-[var(--color-text-secondary)]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={goNext}
                className="h-8 w-8 rounded-lg hover:bg-[var(--color-surface-hover)]"
              >
                <ChevronRight className="h-4 w-4 text-[var(--color-text-secondary)]" />
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={goToday}
              className="rounded-lg border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
            >
              Today
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Tabs value={currentView} onValueChange={setView}>
            <TabsList className="h-9 bg-[var(--color-surface-muted)]">
              <TabsTrigger
                value="day"
                className="data-[state=active]:bg-[var(--color-surface)]"
              >
                Day
              </TabsTrigger>
              <TabsTrigger
                value="week"
                className="data-[state=active]:bg-[var(--color-surface)]"
              >
                Week
              </TabsTrigger>
              <TabsTrigger
                value="month"
                className="data-[state=active]:bg-[var(--color-surface)]"
              >
                Month
              </TabsTrigger>
              <TabsTrigger
                value="year"
                className="data-[state=active]:bg-[var(--color-surface)]"
              >
                Year
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-secondary)]" />
            <Input
              type="text"
              placeholder="Search events..."
              className="h-9 w-64 rounded-lg border-[var(--color-border)] bg-[var(--color-surface)] pl-9 text-[var(--color-text)] focus:border-[var(--color-border-strong)]"
            />
          </div>

          <div className="text-xs text-[var(--color-text-secondary)]">
            GMT-3
          </div>
        </div>
      </div>
    </motion.div>
  );
}
