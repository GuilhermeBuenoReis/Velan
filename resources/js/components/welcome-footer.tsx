import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';

const socialLinks = [
  { label: 'twitter', href: '/social/twitter' },
  { label: 'linkedin', href: '/social/linkedin' },
  { label: 'instagram', href: '/social/instagram' },
] as const;

const productLinks = [
  { label: 'Recursos', href: '/features' },
  { label: 'Preços', href: '/pricing' },
  { label: 'Segurança', href: '/security' },
  { label: 'Atualizações', href: '/updates' },
  { label: 'Roadmap', href: '/roadmap' },
] as const;

const companyLinks = [
  { label: 'Sobre', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Carreiras', href: '/careers' },
  { label: 'Imprensa', href: '/press' },
  { label: 'Parceiros', href: '/partners' },
] as const;

const legalLinks = [
  { label: 'Política de privacidade', href: '/privacy-policy' },
  { label: 'Termos de uso', href: '/terms-of-use' },
  { label: 'Cookies', href: '/cookies' },
] as const;

export function WelcomeFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-sidebar-border bg-gradient-to-b from-[color:var(--surface)] to-[color:var(--surface-muted)]">
      <div className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-velan-gradient-light opacity-40 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-4xl sm:text-5xl">
              <span className="bg-gradient-to-r from-[var(--primary)] via-[var(--primary-hover)] to-[var(--accent)] bg-clip-text text-transparent">
                Pronto para transformar sua saúde?
              </span>
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-[color:var(--text-secondary)]">
              Junte-se a milhares de profissionais e pacientes que já confiam na
              Velan para gerenciar sua saúde de forma inteligente.
            </p>
            <motion.div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              whileHover={{ scale: 1.02 }}
            >
              <Button
                size="lg"
                className="rounded-2xl border-0 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] px-8 py-6 text-white shadow-lg shadow-[rgba(107,95,209,0.3)] transition-colors hover:from-[var(--primary-hover)] hover:to-[var(--accent)]"
              >
                Começar gratuitamente
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-sidebar-border/70">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            <div className="lg:col-span-1">
              <h3 className="mb-4 text-3xl font-semibold">
                <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                  Velan
                </span>
              </h3>
              <p className="mb-4 text-sm text-[color:var(--text-secondary)]">
                A próxima geração em gestão de saúde. Tecnologia que cuida de
                você.
              </p>
              <div className="flex gap-3">
                {socialLinks.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-sidebar-border/70 bg-[color:var(--surface)] transition-all duration-300 hover:border-[color:var(--accent)]/70 hover:bg-[color:var(--accent)]/10"
                  >
                    <div className="h-5 w-5 rounded-sm bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[color:var(--text-secondary)]">
                Produto
              </h4>
              <ul className="space-y-3">
                {productLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-[color:var(--text-secondary)] transition-colors duration-300 hover:text-[color:var(--accent)]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[color:var(--text-secondary)]">
                Empresa
              </h4>
              <ul className="space-y-3">
                {companyLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-[color:var(--text-secondary)] transition-colors duration-300 hover:text-[color:var(--accent)]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[color:var(--text-secondary)]">
                Contato
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-[color:var(--text-secondary)]">
                  <Mail className="mt-0.5 h-4 w-4 text-[color:var(--primary)]" />
                  <a
                    href="mailto:contato@velan.com"
                    className="transition-colors hover:text-[color:var(--accent)]"
                  >
                    contato@velan.com
                  </a>
                </li>
                <li className="flex items-start gap-2 text-sm text-[color:var(--text-secondary)]">
                  <Phone className="mt-0.5 h-4 w-4 text-[color:var(--primary)]" />
                  <span>+55 11 9999-9999</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[color:var(--text-secondary)]">
                  <MapPin className="mt-0.5 h-4 w-4 text-[color:var(--primary)]" />
                  <span>São Paulo, SP - Brasil</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-sidebar-border/70">
        <div className="mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-sm text-[color:var(--text-secondary)] sm:flex-row sm:px-6 lg:px-8">
          <p>© {currentYear} Velan. Todos os direitos reservados.</p>
          <div className="flex flex-wrap gap-6">
            {legalLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="transition-colors duration-300 hover:text-[color:var(--accent)]"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/40 to-transparent" />
    </footer>
  );
}
