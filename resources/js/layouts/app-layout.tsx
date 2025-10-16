import type { ReactNode } from 'react';
import { AppSidebarLayout } from '@/layouts/app/app-sidebar-layout';
import type { BreadcrumbItem } from '@/types';

interface AppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
  return (
    <AppSidebarLayout breadcrumbs={breadcrumbs} {...props}>
      {children}
    </AppSidebarLayout>
  );
}
