import { motion } from 'motion/react';
import { useChatAssistant } from '../context/chat-assistant-context';

export function ChatMessage() {
  const { messages } = useChatAssistant();

  return (
    <>
      {messages.map(message => {
        const isUser = message.sender === 'user';
        const gradientBackground =
          'linear-gradient(135deg, var(--color-secondary), var(--color-primary))';

        const classes = [
          'max-w-[85%]',
          'rounded-2xl',
          'px-4',
          'py-3',
          'text-sm',
          'shadow-sm',
          'whitespace-pre-wrap',
          isUser
            ? 'text-white rounded-tr-md'
            : 'border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] rounded-tl-md',
        ].join(' ');

        return (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={classes}
              style={
                isUser ? { backgroundImage: gradientBackground } : undefined
              }
            >
              <p>{message.text}</p>
              {message.component && (
                <div className="mt-2">{message.component}</div>
              )}
            </div>
          </motion.div>
        );
      })}
    </>
  );
}
