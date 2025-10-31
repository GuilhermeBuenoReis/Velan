import { createContext, useContext, useMemo, useState } from 'react';
import { useUrlState } from '@/hooks/use-url-state';
import type { ChatMessage, ChatStep } from '../types/chat';
export interface AppointmentData {
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  notes?: string;
}

export interface ChatStepDataMap {
  doctor: { doctorId: string; doctorName: string };
  date: { date: string };
  time: { time: string };
  notes: { notes?: string };
  confirmation: Record<string, never>;
  greeting: Record<string, never>;
  success: Record<string, never>;
}

export interface ChatAssistantContextType {
  isOpen: boolean;
  openChat: () => void;
  onCloseChatModal: () => void;
  currentStep: ChatStep;
  setStep: (step: ChatStep) => void;
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  addBotMessage: (step: ChatStep, customText?: string) => void;
  clearMessages: () => void;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
  appointment: AppointmentData;
  setAppointment: (data: AppointmentData) => void;
  scrollToBottom: (ref: React.RefObject<HTMLDivElement>) => void;
  onSkipNotes: () => void;
  onSubmitCurrentStep: <T extends ChatStep>(
    step: T,
    values?: ChatStepDataMap[T]
  ) => void;
}

const ChatAssistantContext = createContext<ChatAssistantContextType | null>(
  null
);

export function ChatAssistantProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useUrlState<ChatStep>('chat-step', 'greeting');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [appointment, setAppointment] = useState<AppointmentData>({
    doctorId: '',
    doctorName: '',
    date: '',
    time: '',
    notes: '',
  });

  const openChat = () => setIsOpen(true);
  const onCloseChatModal = () => setIsOpen(false);

  const addMessage = (message: ChatMessage) =>
    setMessages(prev => [...prev, message]);

  const addBotMessage = (step: ChatStep, customText?: string) => {
    setIsTyping(true);

    const botMessages: Record<ChatStep, string> = {
      greeting: '👋 Olá! Sou sua assistente. Vamos agendar uma consulta?',
      doctor: 'Qual médico ou especialista você gostaria de consultar?',
      date: 'Perfeito! Qual data funciona melhor para você?',
      time: 'Qual horário prefere?',
      notes: 'Quer adicionar alguma observação? (opcional)',
      confirmation: 'Aqui está o resumo da consulta. Confirma o agendamento?',
      success: '✅ Consulta confirmada! Você receberá um e-mail em breve.',
    };

    const text = customText || botMessages[step];

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { id: String(Date.now()), sender: 'bot', text },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const clearMessages = () => setMessages([]);

  const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollTo({
      top: ref.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  const onSkipNotes = () => {
    setStep('confirmation');
    addBotMessage('confirmation');
  };

  const onSubmitCurrentStep = <T extends ChatStep>(
    step: T,
    values?: ChatStepDataMap[T]
  ) => {
    switch (step) {
      case 'doctor': {
        const { doctorId, doctorName } = (values ??
          {}) as ChatStepDataMap['doctor'];
        setAppointment(prev => ({ ...prev, doctorId, doctorName }));
        setStep('date');
        addBotMessage('date');
        break;
      }

      case 'date': {
        const { date } = (values ?? {}) as ChatStepDataMap['date'];
        setAppointment(prev => ({ ...prev, date }));
        setStep('time');
        addBotMessage('time');
        break;
      }

      case 'time': {
        const { time } = (values ?? {}) as ChatStepDataMap['time'];
        setAppointment(prev => ({ ...prev, time }));
        setStep('notes');
        addBotMessage('notes');
        break;
      }

      case 'notes': {
        const { notes } = (values ?? {}) as ChatStepDataMap['notes'];
        setAppointment(prev => ({ ...prev, notes }));
        setStep('confirmation');
        addBotMessage('confirmation');
        break;
      }

      case 'confirmation':
        setStep('success');
        addBotMessage('success');
        break;

      default:
        break;
    }
  };

  const value = useMemo<ChatAssistantContextType>(
    () => ({
      isOpen,
      openChat,
      onCloseChatModal,
      currentStep: step,
      setStep,
      messages,
      addMessage,
      addBotMessage,
      clearMessages,
      isTyping,
      setIsTyping,
      appointment,
      setAppointment,
      scrollToBottom,
      onSkipNotes,
      onSubmitCurrentStep,
    }),
    [isOpen, step, messages, isTyping, appointment]
  );

  return (
    <ChatAssistantContext.Provider value={value}>
      {children}
    </ChatAssistantContext.Provider>
  );
}

export function useChatAssistant() {
  const context = useContext(ChatAssistantContext);
  if (!context) {
    throw new Error(
      'useChatAssistant deve ser usado dentro de <ChatAssistantProvider />'
    );
  }
  return context;
}
