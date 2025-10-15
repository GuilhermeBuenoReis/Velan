import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
export function WelcomeHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A152A] via-[#0F0F17] to-[#00C6AE]/20">
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-[#6C63FF]/30 rounded-full blur-[128px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#00C6AE]/30 rounded-full blur-[128px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl sm:text-3xl lg:text-8xl tracking-tight mb-4">
                <span className="bg-gradient-to-r from-[#6C63FF] via-[#A78BFA] to-[#00C6AE] bg-clip-text text-transparent">
                  Velan
                </span>
              </h1>
            </motion.div>

            <motion.p
              className="text-xl sm:text-2xl lg:text-3xl text-[#EAEAEA]/90 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Cuidar, evoluir, simplificar.
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-base sm:text-lg text-[#A0A0B0] max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A próxima geração em gestão de saúde. Conecte pacientes, médicos e
              clínicas em uma plataforma inteligente e segura.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#6C63FF] to-[#A78BFA] hover:from-[#5B52EE] hover:to-[#967AE9] text-white border-0 shadow-lg shadow-[#6C63FF]/50 px-8 py-6 rounded-2xl"
                >
                  Começar agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-[#00C6AE] text-[#00C6AE] hover:bg-[#00C6AE]/10 bg-transparent px-8 py-6 rounded-2xl"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Ver demonstração
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative mt-16 h-64 sm:h-80 lg:h-96"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <motion.div
                className="absolute left-[10%] top-[20%] w-48 h-32 bg-gradient-to-br from-[#6C63FF]/20 to-[#6C63FF]/5 backdrop-blur-xl rounded-2xl border border-[#6C63FF]/30 p-4 shadow-2xl"
                animate={{
                  y: [0, -20, 0],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="w-8 h-8 bg-[#6C63FF] rounded-lg mb-2" />
                <div className="space-y-2">
                  <div className="w-full h-2 bg-[#EAEAEA]/20 rounded" />
                  <div className="w-3/4 h-2 bg-[#EAEAEA]/20 rounded" />
                </div>
              </motion.div>

              <motion.div
                className="absolute right-[10%] top-[30%] w-48 h-32 bg-gradient-to-br from-[#00C6AE]/20 to-[#00C6AE]/5 backdrop-blur-xl rounded-2xl border border-[#00C6AE]/30 p-4 shadow-2xl"
                animate={{
                  y: [0, 20, 0],
                  rotate: [2, -2, 2],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.5,
                }}
              >
                <div className="w-8 h-8 bg-[#00C6AE] rounded-lg mb-2" />
                <div className="space-y-2">
                  <div className="w-full h-2 bg-[#EAEAEA]/20 rounded" />
                  <div className="w-2/3 h-2 bg-[#EAEAEA]/20 rounded" />
                </div>
              </motion.div>

              <motion.div
                className="absolute left-1/2 -translate-x-1/2 top-[50%] w-56 h-36 bg-gradient-to-br from-[#F7C948]/20 to-[#F7C948]/5 backdrop-blur-xl rounded-2xl border border-[#F7C948]/30 p-4 shadow-2xl"
                animate={{
                  y: [0, -15, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 1,
                }}
              >
                <div className="flex gap-2 mb-3">
                  <div className="w-6 h-6 bg-[#F7C948] rounded-full" />
                  <div className="w-6 h-6 bg-[#F7C948]/60 rounded-full" />
                </div>
                <div className="space-y-2">
                  <div className="w-full h-2 bg-[#EAEAEA]/20 rounded" />
                  <div className="w-5/6 h-2 bg-[#EAEAEA]/20 rounded" />
                  <div className="w-4/6 h-2 bg-[#EAEAEA]/20 rounded" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F0F17] to-transparent" />{' '}
    </section>
  );
}
