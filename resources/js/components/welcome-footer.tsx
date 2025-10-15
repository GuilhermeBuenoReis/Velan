import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';

const socialLinks = [
  { label: 'twitter', href: '/social/twitter' },
  { label: 'linkedin', href: '/social/linkedin' },
  { label: 'instagram', href: '/social/instagram' },
];

const productLinks = [
  { label: 'Recursos', href: '/features' },
  { label: 'Preços', href: '/pricing' },
  { label: 'Segurança', href: '/security' },
  { label: 'Atualizações', href: '/updates' },
  { label: 'Roadmap', href: '/roadmap' },
];

const companyLinks = [
  { label: 'Sobre', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Carreiras', href: '/careers' },
  { label: 'Imprensa', href: '/press' },
  { label: 'Parceiros', href: '/partners' },
];

const legalLinks = [
  { label: 'Política de privacidade', href: '/privacy-policy' },
  { label: 'Termos de uso', href: '/terms-of-use' },
  { label: 'Cookies', href: '/cookies' },
];

export function WelcomeFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-[#0F0F17] to-[#1A152A] border-t border-white/5">
      <div className="relative py-20 sm:py-24 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#6C63FF]/20 via-[#00C6AE]/10 to-transparent blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl sm:text-5xl mb-6">
              <span className="bg-gradient-to-r from-[#6C63FF] via-[#A78BFA] to-[#00C6AE] bg-clip-text text-transparent">
                Pronto para transformar sua saúde?
              </span>
            </h2>
            <p className="text-[#A0A0B0] mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de profissionais e pacientes que já confiam na
              Velan para gerenciar sua saúde de forma inteligente.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              whileHover={{ scale: 1.02 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#6C63FF] to-[#A78BFA] hover:from-[#5B52EE] hover:to-[#967AE9] text-white border-0 shadow-lg shadow-[#6C63FF]/50 px-8 py-6 rounded-2xl"
              >
                Começar gratuitamente
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="lg:col-span-1">
              <h3 className="text-3xl mb-4">
                <span className="bg-gradient-to-r from-[#6C63FF] to-[#00C6AE] bg-clip-text text-transparent">
                  Velan
                </span>
              </h3>
              <p className="text-[#A0A0B0] text-sm mb-4">
                A próxima geração em gestão de saúde. Tecnologia que cuida de
                você.
              </p>
              <div className="flex gap-3">
                {socialLinks.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center border border-white/10 hover:border-[#6C63FF]/50 transition-all duration-300"
                  >
                    <div className="w-5 h-5 bg-gradient-to-r from-[#6C63FF] to-[#00C6AE] rounded-sm" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[#EAEAEA] mb-4">Produto</h4>
              <ul className="space-y-3">
                {productLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-[#A0A0B0] hover:text-[#00C6AE] transition-colors duration-300"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[#EAEAEA] mb-4">Empresa</h4>
              <ul className="space-y-3">
                {companyLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-[#A0A0B0] hover:text-[#00C6AE] transition-colors duration-300"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[#EAEAEA] mb-4">Contato</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-[#A0A0B0]">
                  <Mail className="h-4 w-4 mt-0.5 text-[#6C63FF]" />
                  <a
                    href="mailto:contato@velan.com"
                    className="hover:text-[#00C6AE] transition-colors"
                  >
                    contato@velan.com
                  </a>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#A0A0B0]">
                  <Phone className="h-4 w-4 mt-0.5 text-[#6C63FF]" />
                  <span>+55 11 9999-9999</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#A0A0B0]">
                  <MapPin className="h-4 w-4 mt-0.5 text-[#6C63FF]" />
                  <span>São Paulo, SP - Brasil</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#A0A0B0]">
              © {currentYear} Velan. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap gap-6">
              {legalLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-sm text-[#A0A0B0] hover:text-[#00C6AE] transition-colors duration-300"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6C63FF]/50 to-transparent" />
    </footer>
  );
}
