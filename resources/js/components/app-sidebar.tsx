import { Link, usePage } from '@inertiajs/react';
import {
  Calendar,
  FileText,
  Heart,
  Home,
  MessageSquare,
  Settings,
  Users,
} from 'lucide-react';
import { type CSSProperties, useEffect, useMemo, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import { edit as profileEditRoute } from '@/routes/profile';
import type { SharedData } from '@/types';
import { AppDropdownMenuProfile } from './app-dropdown-menu-profile';

const navItems = [
  { icon: Home, label: 'Início', href: dashboard().url },
  { icon: Calendar, label: 'Consultas', href: '/consultas' },
  { icon: Users, label: 'Meus Médicos', href: '/medicos' },
  { icon: FileText, label: 'Resultados e Exames', href: '/exames' },
  { icon: Heart, label: 'Saúde & Hábitos', href: '/habitos' },
  { icon: MessageSquare, label: 'Mensagens', href: '/mensagens' },
  { icon: Settings, label: 'Configurações', href: profileEditRoute().url },
] as const;

export function AppSidebar() {
  const { url } = usePage<SharedData>();

  const { state, isMobile, setOpenMobile } = useSidebar();

  const [activeItem, setActiveItem] = useState<string>(
    () => navItems[0]?.label ?? ''
  );

  const isCollapsed = state === 'collapsed';

  const matchingNavItem = useMemo(() => {
    return (
      navItems.find(item => {
        if (item.href === '/') {
          return url === item.href;
        }

        return url.startsWith(item.href);
      }) ?? null
    );
  }, [url]);

  useEffect(() => {
    if (matchingNavItem) {
      setActiveItem(matchingNavItem.label);
    }
  }, [matchingNavItem]);

  function handleNavClick(label: string) {
    setActiveItem(label);
    if (isMobile) {
      setOpenMobile(false);
    }
  }

  return (
    <Sidebar
      collapsible="icon"
      variant="sidebar"
      className={cn(
        'border-r border-sidebar-border text-muted-foreground',
        'shadow-[inset_-1px_0_0_rgba(255,255,255,0.04)] transition-all duration-300 ease-in-out',
        '[&>[data-sidebar=sidebar]]:bg-gradient-to-b [&>[data-sidebar=sidebar]]:from-[color:var(--surface)] [&>[data-sidebar=sidebar]]:to-[color:var(--surface-muted)]',
        '[&>[data-sidebar=sidebar]]:flex [&>[data-sidebar=sidebar]]:flex-col [&>[data-sidebar=sidebar]]:justify-between',
        '[&>[data-sidebar=sidebar]]:backdrop-blur-xl [&>[data-sidebar=sidebar]]:text-muted-foreground',
        '[&>[data-sidebar=sidebar]]:px-0 [&>[data-sidebar=sidebar]]:py-0'
      )}
      style={
        {
          '--sidebar-width': '280px',
          '--sidebar-width-icon': '80px',
        } as CSSProperties
      }
    >
      <SidebarHeader className="px-4 pb-3 pt-6">
        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] shadow-[0_0_18px_rgba(107,95,209,0.28)]">
              <Heart className="h-5 w-5 text-white" />
            </div>
            {!isCollapsed && (
              <span className="text-lg font-semibold tracking-tight text-foreground transition-opacity duration-200">
                Velan
              </span>
            )}
          </div>
        </div>
      </SidebarHeader>

      <div className="mt-auto px-4 pb-6 pt-0">
        <Separator className="my-2 bg-sidebar-border/70" />
      </div>

      <SidebarContent className="flex-1 overflow-hidden px-3 pb-6 flex items-center">
        <ScrollArea className="h-full pr-1">
          <SidebarMenu className="space-y-1">
            {navItems.map(item => {
              const isActive = activeItem === item.label;

              return (
                <SidebarMenuItem key={item.label} className="flex items-center">
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={cn(
                          'group relative flex w-full items-center gap-3 rounded-[16px] px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 ease-in-out',
                          'hover:bg-[color:var(--primary)]/12 hover:text-foreground hover:shadow-[0_0_8px_rgba(107,95,209,0.22)]',
                          'data-[active=true]:bg-[color:var(--primary)]/16 data-[active=true]:text-primary-foreground data-[active=true]:shadow-[0_0_12px_rgba(107,95,209,0.24)]',
                          'group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:px-0'
                        )}
                      >
                        <Link
                          href={item.href}
                          prefetch
                          preserveScroll
                          onClick={() => handleNavClick(item.label)}
                          aria-current={isActive ? 'page' : undefined}
                          className={cn(
                            'flex w-full items-center gap-3',
                            'group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0'
                          )}
                        >
                          <item.icon className="h-5 w-5 shrink-0 text-[color:var(--accent)] transition-transform duration-300 group-hover:scale-105" />
                          <span className="truncate group-data-[collapsible=icon]:hidden">
                            {item.label}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent
                        side="right"
                        sideOffset={8}
                        className="flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium shadow-lg transition-all duration-200"
                      >
                        <span className="leading-none">{item.label}</span>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="mt-auto px-4 pb-6 pt-0">
        <Separator className="mb-4 bg-sidebar-border/70" />
        <div className="flex items-center justify-center">
          <AppDropdownMenuProfile />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
