import { Head } from '@inertiajs/react';
import { AppLayout } from '@/layouts/app-layout';
import { DashboardResultsExams } from '@/pages/dashboard/components/results-exams';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { DashboardHealthHabits } from './components/health-habits';
import { DashboardHealthOverview } from './components/health-overview';
import { DashboardMessagesPanel } from './components/messages-panel';
import { DashboardUpcomingAppointments } from './components/upcoming-appointments';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: dashboard().url,
  },
];

export function Dashboard() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard" />

      <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <DashboardHealthOverview />
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="space-y-6 lg:space-y-8">
          <DashboardUpcomingAppointments />
          <DashboardHealthHabits />
        </div>

        <div className="space-y-6 lg:space-y-8">
          <DashboardMessagesPanel />
          <DashboardResultsExams />
        </div>
      </div>
    </AppLayout>
  );
}
