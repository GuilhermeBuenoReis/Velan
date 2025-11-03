import { AnimatePresence } from 'motion/react';
import chatIcon from '@/assets/chat-icon.png';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatAssistant } from '../context/chat-assistant-context';
import { DOCTORS, TIME_SLOTS } from '../data/index';
import { AppointmentSummary } from './appointment-summary';
import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';
import { DoctorOption } from './doctor-option';
import { TimeOption } from './time-option';
import { TypingIndicator } from './typing-indicator';

export function ChatAssistantModal() {
  const { isOpen, onCloseChatModal, isTyping, currentStep, setStep } =
    useChatAssistant();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={open => {
        if (!open) onCloseChatModal();
      }}
    >
      <DialogContent className="sm:max-w-[550px] p-0 gap-0 overflow-hidden">
        <DialogHeader
          className="
          w-full flex justify-center gap-3 px-4 py-3 border-b border-white/10 bg-gradient-to-r from-[#1E1B4B]/90 via-[#312E81]/80 to-[#0F172A]/90
          backdrop-blur-xl"
        >
          <DialogTitle className="flex items-center gap-3 m-0 p-0">
            <Avatar className="h-12 w-12 border-2 border-white/30 shadow-sm">
              <AvatarImage src={chatIcon} alt="Imagem do chat icon" />
            </Avatar>

            <div className="flex flex-col">
              <span className="text-lg font-semibold text-white">
                Assistente de Agendamento
              </span>
              <span className="text-sm text-white">
                Vamos agendar sua próxima consulta passo a passo
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea
          className="h-[450px] bg-[var(--color-surface-muted)] px-4 py-3 space-y-4"
          aria-live="polite"
        >
          <AnimatePresence>
            <ChatMessage />
          </AnimatePresence>

          <TypingIndicator />

          {currentStep === 'greeting' && !isTyping && (
            <div className="flex justify-center pt-2">
              <Button
                type="button"
                onClick={() => setStep('doctor')}
                className="text-white"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, var(--color-secondary), var(--color-primary))',
                }}
              >
                Vamos começar
              </Button>
            </div>
          )}
        </ScrollArea>

        {currentStep === 'date' || currentStep === 'notes' ? (
          <ChatInput />
        ) : null}

        {currentStep === 'doctor' && (
          <div className="mt-3 space-y-2 p-4">
            {DOCTORS.map(doc => (
              <DoctorOption key={doc.id} doctor={doc} />
            ))}
          </div>
        )}

        {currentStep === 'time' && (
          <div className="mt-3 grid grid-cols-3 gap-2 p-4">
            {TIME_SLOTS.map(slot => (
              <TimeOption key={slot} timeLabel={slot} />
            ))}
          </div>
        )}

        {currentStep === 'confirmation' && <AppointmentSummary />}
      </DialogContent>
    </Dialog>
  );
}
