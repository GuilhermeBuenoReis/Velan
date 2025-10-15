import { Menu, X } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useState } from 'react';
import { Button } from './ui/button';

export function WelcomeNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(15, 15, 23, 0)', 'rgba(15, 15, 23, 0.95)']
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
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
      style={{ backgroundColor }}
    >
      <motion.div
        className="border-b"
        style={{
          borderColor: useTransform(
            borderOpacity,
            value => `rgba(255, 255, 255, ${value})`
          ),
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <motion.a
              href="/"
              className="text-2xl sm:text-3xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="bg-gradient-to-r from-[#6C63FF] to-[#00C6AE] bg-clip-text text-transparent">
                Velan
              </span>
            </motion.a>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Button
                asChild
                variant="ghost"
                className="text-[#EAEAEA] hover:text-[#00C6AE] hover:bg-white/5"
              >
                <a href={authLinks.login}>Entrar</a>
              </Button>

              <Button
                asChild
                className="bg-gradient-to-r from-[#6D63FF] to-[#A78BFA] hover:from-[#5B52EE] hover:to-[#967AE9] text-white border-0 shadow-lg shadow-[#6C63FF]/30"
              >
                <a href={authLinks.register}>Começar grátis</a>
              </Button>
            </div>
            <Button
              className="md:hidden p-2 text-[#EAEAEA] hover:text-[#00C6AE] transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-black" />
              ) : (
                <Menu className="h-6 w-6 text-black" />
              )}
            </Button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            className="md:hidden border-t border-white/10 bg-[#0F0F17]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-[#A0A0B0] hover:text-[#00C6AE] transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-white/10 text-[#EAEAEA] hover:bg-white/5"
                >
                  <a href={authLinks.login}>Entrar</a>
                </Button>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-[#6C63FF] to-[#A78BFA] text-white border-0"
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
