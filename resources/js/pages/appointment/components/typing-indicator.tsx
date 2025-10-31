import { motion } from 'motion/react';
import { useChatAssistant } from '../context/chat-assistant-context';

export function TypingIndicator() {
  const { isTyping } = useChatAssistant();

  if (!isTyping) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex justify-start"
    >
      <div className="flex gap-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 shadow-sm">
        {[0, 0.2, 0.4].map((delay, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay }}
            className="h-2 w-2 rounded-full bg-[var(--color-text-secondary)]"
          />
        ))}
      </div>
    </motion.div>
  );
}
