import { Menu, X } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function WelcomeNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(14, 13, 19, 0)', 'rgba(14, 13, 19, 0.92)']
  );

  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Plans', href: '#plans' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];
  const authLinks = {
    login: '/login',
    register: '/register',
  };

  return (
    <motion.nav
      className="fixed left-0 right-0 top-0 z-50 backdrop-blur-xl"
      style={{ backgroundColor }}
    >
      <motion.div
        className="border-b"
        style={{
          borderColor: useTransform(
            borderOpacity,
            value => `rgba(227, 225, 236, ${value})`
          ),
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between sm:h-20">
            <motion.a
              href="/"
              className="text-2xl text-foreground sm:text-3xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                Velan
              </span>
            </motion.a>

            <div className="hidden items-center gap-8 text-[color:var(--text-secondary)] md:flex">
              {navLinks.map(link => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-4 md:flex">
              <Button
                asChild
                variant="ghost"
                className="text-foreground hover:bg-[color:var(--surface)]/10 hover:text-[color:var(--accent)]"
              >
                <a href={authLinks.login}>Entrar</a>
              </Button>

              <Button
                asChild
                className="border-0 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white shadow-lg shadow-[rgba(107,95,209,0.25)] transition-colors hover:from-[var(--primary-hover)] hover:to-[var(--accent)]"
              >
                <a href={authLinks.register}>Começar grátis</a>
              </Button>
            </div>
            <Button
              className="p-2 text-foreground transition-colors hover:text-[color:var(--accent)] md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </Button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            className="border-t border-[color:var(--border)] bg-[color:var(--bg)] md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="space-y-4 px-4 py-6">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block py-2 text-[color:var(--text-secondary)] transition-colors hover:text-[color:var(--accent)]"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="space-y-3 pt-4">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-[color:var(--border)] text-foreground hover:bg-[color:var(--surface)]/10"
                >
                  <a href={authLinks.login}>Entrar</a>
                </Button>
                <Button
                  asChild
                  className="w-full border-0 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white shadow-[0_12px_24px_rgba(107,95,209,0.2)]"
                >
                  <a href={authLinks.register}>Começar grátis</a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.nav>
  );
}
