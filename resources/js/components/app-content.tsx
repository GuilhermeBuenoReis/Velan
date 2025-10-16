import type * as React from 'react';
import { SidebarInset, useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface AppContentProps extends React.ComponentProps<'main'> {
  variant?: 'header' | 'sidebar';
}

export function AppContent({
  variant = 'header',
  children,
  ...props
}: AppContentProps) {
  if (variant === 'sidebar') {
    return (
      <SidebarAppContent {...props}>
        {children}
      </SidebarAppContent>
    );
  }

  return (
    <main
      className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl"
      {...props}
    >
      {children}
    </main>
  );
}

function SidebarAppContent({
  children,
  className,
  ...props
}: React.ComponentProps<'main'>) {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <SidebarInset
      className={cn(
        'flex-1 bg-transparent px-4 py-6 transition-all duration-300 ease-in-out',
        'md:px-8 lg:px-12',
        isCollapsed ? 'md:ml-[80px]' : 'md:ml-[280px]',
        'ml-0',
        className
      )}
      {...props}
    >
      {children}
    </SidebarInset>
  );
}
