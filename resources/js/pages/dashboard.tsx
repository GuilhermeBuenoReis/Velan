import { Head } from '@inertiajs/react';
import { DashboardHealthHabits } from '@/components/dashboard-health-habits';
import { DashboardHealthOverview } from '@/components/dashboard-health-overview';
import { DashboardMessagesPanel } from '@/components/dashboard-messages-panel';
import { DashboardResultsExams } from '@/components/dashboard-results-exams';
import { DashboardUpcomingAppointments } from '@/components/dashboard-upcoming-appointments';
import { AppLayout } from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

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
