import { router, usePage } from '@inertiajs/react';
import { LogOut, Settings, User } from 'lucide-react';
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
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import type { SharedData } from '@/types';
import { useSidebar } from './ui/sidebar';

function getInitials(name: string | undefined) {
  if (!name) {
    return 'US';
  }

  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0]?.slice(0, 2).toUpperCase();
  }

  return `${parts[0]?.[0] ?? ''}${parts[parts.length - 1]?.[0] ?? ''}`.toUpperCase();
}

export function AppDropdownMenuProfile() {
  const cleanupMobileNavigation = useMobileNavigation();
  const { isMobile, setOpenMobile } = useSidebar();
  const {
    props: {
      auth: { user },
    },
  } = usePage<SharedData>();

  function handleLogout() {
    cleanupMobileNavigation();
    router.flushAll();
    router.post(logout().url);
    if (isMobile) {
      setOpenMobile(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-14 w-14 rounded-full border border-[color:var(--accent)]/40 bg-transparent p-0 transition-all duration-300 hover:border-[color:var(--accent)]/70 hover:shadow-[0_0_12px_rgba(76,163,176,0.3)]"
        >
          <Avatar className="size-14 !rounded-full">
            {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
            <AvatarFallback className="!rounded-[inherit] bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-sm font-medium text-white">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        align="end"
        sideOffset={12}
        className="min-w-[220px] rounded-[16px] border border-sidebar-border bg-[color:var(--surface)]/98 p-2 text-foreground shadow-[0_24px_60px_rgba(14,13,19,0.45)]"
      >
        <DropdownMenuLabel className="mb-1 flex flex-col gap-0.5 text-xs font-medium uppercase tracking-wide text-[color:var(--text-secondary)]">
          <span className="text-sm font-semibold text-foreground normal-case">
            {user.name}
          </span>
          <span className="text-xs text-[color:var(--text-secondary)]">
            {user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2 bg-sidebar-border/70" />
        <DropdownMenuItem className="flex items-center gap-2 rounded-[12px] px-3 py-2 text-sm text-foreground transition-colors duration-200 hover:bg-[color:var(--primary)]/12 hover:text-foreground hover:shadow-[0_0_8px_rgba(107,95,209,0.2)]">
          <User className="h-4 w-4 text-[color:var(--accent)]" />
          Meu Perfil
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 rounded-[12px] px-3 py-2 text-sm text-foreground transition-colors duration-200 hover:bg-[color:var(--primary)]/12 hover:text-foreground hover:shadow-[0_0_8px_rgba(107,95,209,0.2)]">
          <Settings className="h-4 w-4 text-[color:var(--accent)]" />
          Configurações
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-2 bg-sidebar-border/70" />
        <DropdownMenuItem
          className="flex items-center gap-2 rounded-[12px] px-3 py-2 text-sm text-[color:var(--destructive)] transition-colors duration-200 hover:bg-[color:var(--destructive)]/12 hover:text-[color:var(--destructive)] hover:shadow-[0_0_8px_rgba(214,90,90,0.25)]"
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
  );
}
