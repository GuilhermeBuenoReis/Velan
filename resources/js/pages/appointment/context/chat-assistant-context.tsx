import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
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
  addMessage: (msg: ChatMessage) => void;
  appointment: AppointmentData;
  setAppointment: Dispatch<SetStateAction<AppointmentData>>;
  isTyping: boolean;
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
  const [currentStep, setStep] = useState<ChatStep>('greeting');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const [appointment, setAppointment] = useState<AppointmentData>({
    doctorId: '',
    doctorName: '',
    date: '',
    time: '',
    notes: '',
  });

  const botText: Record<ChatStep, string> = {
    greeting: '👋 Olá! Vamos agendar sua consulta.',
    doctor: 'Certo! Vou te recomendar alguns especialistas...',
    date: 'Qual data funciona melhor para você?',
    time: 'Qual horário prefere?',
    notes: 'Quer adicionar alguma observação? (opcional)',
    confirmation: 'Revise e confirme os dados da sua consulta.',
    success: '✅ Consulta confirmada com sucesso.',
  };

  const addMessage = (msg: ChatMessage) => {
    setMessages(prev => [...prev, msg]);
  };

  const sendBotMessage = (s: ChatStep) => {
    setIsTyping(true);
    setTimeout(() => {
      addMessage({
        id: Date.now().toString(),
        sender: 'bot',
        text: botText[s],
      });
      setIsTyping(false);
    }, 300);
  };

  const openChat = () => {
    setMessages([]);
    setAppointment({
      doctorId: '',
      doctorName: '',
      date: '',
      time: '',
      notes: '',
    });
    setStep('greeting');
    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      sendBotMessage('greeting');
    }
  }, [isOpen]);

  const onCloseChatModal = () => {
    setIsOpen(false);
  };

  const onSubmitCurrentStep = <T extends ChatStep>(
    step: T,
    values?: ChatStepDataMap[T]
  ) => {
    switch (step) {
      case 'doctor': {
        const { doctorId, doctorName } = values as ChatStepDataMap['doctor'];
        setAppointment(prev => ({ ...prev, doctorId, doctorName }));
        setStep('date');
        sendBotMessage('doctor');
        break;
      }

      case 'date': {
        const { date } = values as ChatStepDataMap['date'];
        setAppointment(prev => ({ ...prev, date }));
        setStep('time');
        sendBotMessage('time');
        break;
      }

      case 'time': {
        const { time } = values as ChatStepDataMap['time'];
        setAppointment(prev => ({ ...prev, time }));
        setStep('notes');
        sendBotMessage('notes');
        break;
      }

      case 'notes': {
        const { notes } = values as ChatStepDataMap['notes'];
        setAppointment(prev => ({ ...prev, notes }));
        setStep('confirmation');
        sendBotMessage('confirmation');
        break;
      }

      case 'confirmation':
        setStep('success');
        sendBotMessage('success');
        break;
    }
  };

  const value = useMemo(
    () => ({
      isOpen,
      openChat,
      onCloseChatModal,
      currentStep,
      setStep,
      messages,
      addMessage,
      appointment,
      setAppointment,
      isTyping,
      onSubmitCurrentStep,
    }),
    [isOpen, currentStep, messages, appointment, isTyping]
  );

  return (
    <ChatAssistantContext.Provider value={value}>
      {children}
    </ChatAssistantContext.Provider>
  );
}

export function useChatAssistant() {
  const ctx = useContext(ChatAssistantContext);
  if (!ctx)
    throw new Error('useChatAssistant deve ser usado dentro do provider');
  return ctx;
}
