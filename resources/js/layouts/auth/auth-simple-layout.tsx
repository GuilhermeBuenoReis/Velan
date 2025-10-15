import { motion } from 'motion/react';
import type { PropsWithChildren } from 'react';

interface AuthLayoutProps {
  title?: string;
  description?: string;
}

const particlePositions = [...Array(6)].map((_, index) => ({
  left: `${20 + index * 15}%`,
  top: `${30 + (index % 3) * 20}%`,
  delay: index * 0.5,
  duration: 8 + index * 2,
}));

const orbitAngles = [0, 60, 120, 180, 240, 300];

export function AuthSimpleLayout({
  children,
  title,
  description,
}: PropsWithChildren<AuthLayoutProps>) {
  return (
    <div className="flex min-h-screen bg-[#0F0F17]">
      <div className="relative hidden overflow-hidden lg:flex lg:w-1/2 xl:w-3/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A152A] via-[#0F0F17] to-[#00C6AE]/30" />
        <motion.div
          className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#6C63FF]/30 blur-[128px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#00C6AE]/30 blur-[128px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {particlePositions.map(({ left, top, delay, duration }, index) => (
            <motion.div
              key={index}
              className="absolute h-20 w-20 rounded-2xl border border-white/10 backdrop-blur-sm"
              style={{ left, top }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 180, 360],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay,
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            {orbitAngles.map((angle, index) => (
              <motion.div
                key={angle}
                className="absolute h-16 w-16 rounded-2xl border border-white/10 bg-gradient-to-br from-[#6C63FF]/20 to-[#00C6AE]/20 backdrop-blur-xl"
                style={{
                  left: `${Math.cos((angle * Math.PI) / 180) * 150}px`,
                  top: `${Math.sin((angle * Math.PI) / 180) * 150}px`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.3,
                }}
              >
                <div className="flex h-full w-full items-center justify-center">
                  <div
                    className="h-8 w-8 rounded-lg"
                    style={{
                      backgroundColor:
                        index % 3 === 0
                          ? '#6C63FF'
                          : index % 3 === 1
                            ? '#00C6AE'
                            : '#F7C948',
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-[#00C6AE]/30 blur-[150px]" />
      </div>
      <div className="relative flex flex-1 items-center justify-center p-8">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#6C63FF]/5 to-transparent" />
        <motion.div
          className="relative z-10 w-full max-w-[420px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-[#00C6AE]/20 via-[#6C63FF]/20 to-transparent blur-sm" />
          <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-[#1A152A]/80 to-[#0F0F17]/80 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-6">
              <h1 className="mb-2 text-3xl">
                <span className="bg-gradient-to-r from-[#6C63FF] to-[#00C6AE] bg-clip-text text-transparent">
                  Velan
                </span>
              </h1>
              <p className="text-sm text-[#A0A0B0]">
                Cuidar, evoluir, simplificar.
              </p>
            </div>
            {title && <h2 className="mb-2 text-xl text-[#EAEAEA]">{title}</h2>}
            {description && (
              <p className="mb-6 text-sm text-[#A0A0B0]">{description}</p>
            )}
            {children}
          </div>
          <div className="absolute -bottom-20 left-1/2 h-32 w-64 -translate-x-1/2 rounded-full bg-[#6C63FF]/20 blur-3xl" />
        </motion.div>
      </div>
    </div>
  );
}
