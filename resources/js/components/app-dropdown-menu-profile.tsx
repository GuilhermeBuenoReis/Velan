import { router, usePage } from '@inertiajs/react';
import { LogOut, Settings, User } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
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
  if (!name) return 'US';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0]?.slice(0, 2).toUpperCase();
  return `${parts[0]?.[0] ?? ''}${parts[parts.length - 1]?.[0] ?? ''}`.toUpperCase();
}

export function AppDropdownMenuProfile() {
  const cleanupMobileNavigation = useMobileNavigation();
  const { isMobile, setOpenMobile, open } = useSidebar();
  const {
    props: {
      auth: { user },
    },
  } = usePage<SharedData>();

  function handleLogout() {
    cleanupMobileNavigation();
    router.flushAll();
    router.post(logout().url);
    if (isMobile) setOpenMobile(false);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={`
            group relative flex items-center
            transition-all duration-300
            ${open ? 'w-full p-6 justify-start gap-3' : 'h-12 w-12 p-0 justify-center'}
            ${
              open
                ? 'border border-[color:var(--accent)]/40 hover:border-[color:var(--accent)]/70 hover:shadow-[0_0_10px_rgba(76,163,176,0.25)]'
                : 'border-none hover:shadow-none'
            }
            bg-transparent rounded-md
          `}
        >
          <Avatar className="size-9 rounded-full shrink-0 ring-1 ring-[color:var(--accent)]/20 ">
            {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
            <AvatarFallback className="!rounded-[inherit] bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-xs font-medium text-white">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>

          <AnimatePresence>
            {open && (
              <motion.div
                className="flex flex-col overflow-hidden"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25 }}
              >
                <span className="text-sm font-semibold leading-[1.2] text-foreground truncate max-w-[155px]">
                  {user.name}
                </span>
                <span className="text-[0.78rem] leading-[1.1] text-[color:var(--text-secondary)] truncate max-w-[155px]">
                  {user.email}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="right"
        align="end"
        sideOffset={12}
        className="min-w-[220px] rounded-[12px] border border-sidebar-border bg-[color:var(--surface)]/98 p-2 text-foreground shadow-[0_24px_60px_rgba(14,13,19,0.45)]"
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

        <DropdownMenuItem className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground transition-colors duration-200 hover:bg-[color:var(--primary)]/12 hover:text-foreground hover:shadow-[0_0_6px_rgba(107,95,209,0.2)]">
          <User className="h-4 w-4 text-[color:var(--accent)]" />
          Meu Perfil
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground transition-colors duration-200 hover:bg-[color:var(--primary)]/12 hover:text-foreground hover:shadow-[0_0_6px_rgba(107,95,209,0.2)]">
          <Settings className="h-4 w-4 text-[color:var(--accent)]" />
          Configurações
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2 bg-sidebar-border/70" />

        <DropdownMenuItem
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[color:var(--destructive)] transition-colors duration-200 hover:bg-[color:var(--destructive)]/12 hover:text-[color:var(--destructive)] hover:shadow-[0_0_6px_rgba(214,90,90,0.25)]"
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
