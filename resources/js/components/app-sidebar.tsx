import { Link, router, usePage } from '@inertiajs/react';
import {
  Calendar,
  FileText,
  Heart,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  User,
  Users,
} from 'lucide-react';
import { type CSSProperties, useEffect, useMemo, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { cn } from '@/lib/utils';
import { dashboard, logout } from '@/routes';
import { edit as profileEditRoute } from '@/routes/profile';
import type { SharedData } from '@/types';

const navItems = [
  { icon: Home, label: 'Início', href: dashboard().url },
  { icon: Calendar, label: 'Consultas', href: '/consultas' },
  { icon: Users, label: 'Meus Médicos', href: '/medicos' },
  { icon: FileText, label: 'Resultados e Exames', href: '/exames' },
  { icon: Heart, label: 'Saúde & Hábitos', href: '/habitos' },
  { icon: MessageSquare, label: 'Mensagens', href: '/mensagens' },
  { icon: Settings, label: 'Configurações', href: profileEditRoute().url },
] as const;

function getInitials(name: string | undefined) {
  if (!name) {
    return 'US';
  }

  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0]!.slice(0, 2).toUpperCase();
  }

  return `${parts[0]![0] ?? ''}${parts[parts.length - 1]![0] ?? ''}`.toUpperCase();
}

export function AppSidebar() {
  const {
    props: {
      auth: { user },
    },
    url,
  } = usePage<SharedData>();
  const { state, isMobile, setOpenMobile } = useSidebar();
  const cleanupMobileNavigation = useMobileNavigation();
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

  const handleLogout = () => {
    cleanupMobileNavigation();
    router.flushAll();
    router.post(logout().url);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  const handleNavClick = (label: string) => {
    setActiveItem(label);
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      className={cn(
        'border-r border-[#1A152A]/40 text-[#EAEAEA]/80',
        'shadow-[inset_-1px_0_0_rgba(255,255,255,0.05)] transition-all duration-300 ease-in-out',
        '[&>[data-sidebar=sidebar]]:bg-gradient-to-b [&>[data-sidebar=sidebar]]:from-[#1A152A] [&>[data-sidebar=sidebar]]:to-[#0F0F17]',
        '[&>[data-sidebar=sidebar]]:flex [&>[data-sidebar=sidebar]]:flex-col [&>[data-sidebar=sidebar]]:justify-between',
        '[&>[data-sidebar=sidebar]]:backdrop-blur-xl [&>[data-sidebar=sidebar]]:text-[#EAEAEA]/80',
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
            <div className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-gradient-to-br from-[#6C63FF] to-[#00C6AE] shadow-[0_0_18px_rgba(0,198,174,0.35)]">
              <Heart className="h-5 w-5 text-white" />
            </div>
            {!isCollapsed && (
              <span className="text-lg font-semibold tracking-tight text-white transition-opacity duration-200">
                Velan
              </span>
            )}
          </div>
        </div>
      </SidebarHeader>

      <Separator className="mx-4 mb-4 bg-[#1A152A]/40" />

      <SidebarContent className="flex-1 overflow-hidden px-3 pb-6 flex items-center">
        <ScrollArea className="h-full pr-1">
          <SidebarMenu className="space-y-1">
            {navItems.map(item => {
              const isActive = activeItem === item.label;

              return (
                <SidebarMenuItem key={item.label}>
                  <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={cn(
                          'group relative flex w-full items-center gap-3 rounded-[16px] px-3 py-2 text-sm font-medium text-[#EAEAEA]/80 transition-all duration-300 ease-in-out',
                          'hover:bg-[#6C63FF]/12 hover:text-white hover:shadow-[0_0_8px_#00C6AE]/30',
                          'data-[active=true]:bg-[#6C63FF]/15 data-[active=true]:text-white data-[active=true]:shadow-[0_0_12px_rgba(108,99,255,0.25)]',
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
                          <item.icon className="h-5 w-5 shrink-0 text-[#00C6AE] transition-transform duration-300 group-hover:scale-105" />
                          <span className="truncate group-data-[collapsible=icon]:hidden">
                            {item.label}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </TooltipTrigger>
                    {isCollapsed && (
                      <TooltipContent
                        side="right"
                        className="border border-[#6C63FF]/30 bg-[#1A152A]/95 text-xs font-medium text-white shadow-[0_12px_30px_rgba(8,8,16,0.55)]"
                      >
                        {item.label}
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
        <Separator className="mb-4 bg-[#1A152A]/40" />
        <div className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-14 w-14 rounded-[16px] border border-[#00C6AE]/40 bg-transparent p-0 transition-all duration-300 hover:border-[#00C6AE]/70 hover:shadow-[0_0_12px_rgba(0,198,174,0.35)]"
              >
                <Avatar className="size-14 !rounded-[16px]">
                  {user.avatar && (
                    <AvatarImage src={user.avatar} alt={user.name} />
                  )}
                  <AvatarFallback className="!rounded-[inherit] bg-gradient-to-br from-[#6C63FF] to-[#00C6AE] text-sm font-medium text-white">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              align="end"
              sideOffset={12}
              className="min-w-[220px] rounded-[16px] border border-[#00C6AE]/20 bg-[#1A152A]/95 p-2 text-[#EAEAEA] shadow-[0_24px_60px_rgba(10,10,20,0.65)]"
            >
              <DropdownMenuLabel className="mb-1 flex flex-col gap-0.5 text-xs font-medium uppercase tracking-wide text-[#EAEAEA]/60">
                <span className="text-sm font-semibold text-white normal-case">
                  {user.name}
                </span>
                <span className="text-xs text-[#EAEAEA]/60">{user.email}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-2 bg-[#1A152A]/60" />
              <DropdownMenuItem className="flex items-center gap-2 rounded-[12px] px-3 py-2 text-sm text-[#EAEAEA]/85 transition-colors duration-200 hover:bg-[#6C63FF]/15 hover:text-white hover:shadow-[0_0_8px_#00C6AE]/20">
                <User className="h-4 w-4 text-[#00C6AE]" />
                Meu Perfil
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 rounded-[12px] px-3 py-2 text-sm text-[#EAEAEA]/85 transition-colors duration-200 hover:bg-[#6C63FF]/15 hover:text-white hover:shadow-[0_0_8px_#00C6AE]/20">
                <Settings className="h-4 w-4 text-[#00C6AE]" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-2 bg-[#1A152A]/60" />
              <DropdownMenuItem
                className="flex items-center gap-2 rounded-[12px] px-3 py-2 text-sm text-red-400 transition-colors duration-200 hover:bg-red-500/10 hover:text-red-300 hover:shadow-[0_0_8px_rgba(239,68,68,0.25)]"
                onSelect={event => {
                  event.preventDefault();
                  handleLogout();
                }}
              >
                <LogOut className="h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
