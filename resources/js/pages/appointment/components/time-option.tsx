import { motion } from 'motion/react';
import { useChatAssistant } from '../context/chat-assistant-context';

interface TimeOptionProps {
  timeLabel: string;
}

export function TimeOption({ timeLabel }: TimeOptionProps) {
  const { onSubmitCurrentStep } = useChatAssistant();

  const handleSelectTime = () => {
    onSubmitCurrentStep('time', { time: timeLabel });
  };

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleSelectTime}
      className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-xs font-medium text-[var(--color-text)] shadow-sm transition-colors hover:border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)]/10"
    >
      {timeLabel}
    </motion.button>
  );
}
