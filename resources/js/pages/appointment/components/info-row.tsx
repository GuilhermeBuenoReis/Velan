import { Calendar, Clock, User } from 'lucide-react';
import { useChatAssistant } from '../context/chat-assistant-context';

interface InfoRowProps {
  icon: React.ElementType;
  text: string;
}

export function InfoRow({ icon: Icon, text }: InfoRowProps) {
  return (
    <div className="flex items-center gap-2 text-xs text-[var(--color-text)]">
      <Icon className="h-4 w-4 text-[var(--color-primary)]" />
      <span>{text}</span>
    </div>
  );
}

export function ChatInfoRow() {
  const { currentStep, messages } = useChatAssistant();

  const latestMessage = messages[messages.length - 1];
  const text =
    currentStep === 'date'
      ? `Data selecionada: ${latestMessage?.text ?? '—'}`
      : currentStep === 'time'
        ? `Horário escolhido: ${latestMessage?.text ?? '—'}`
        : currentStep === 'doctor'
          ? `Médico: ${latestMessage?.text ?? '—'}`
          : '';

  const Icon =
    currentStep === 'date' ? Calendar : currentStep === 'time' ? Clock : User;

  if (!text) return null;

  return <InfoRow icon={Icon} text={text} />;
}
