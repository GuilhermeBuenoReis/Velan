import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChatAssistant } from '../context/chat-assistant-context';
import { DOCTORS, TIME_SLOTS } from '../data/index';
import { AppointmentSummary } from './appointment-summary';
import { ChatHeader } from './chat-header';
import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';
import { DoctorOption } from './doctor-option';
import { TimeOption } from './time-option';
import { TypingIndicator } from './typing-indicator';

export function ChatAssistantModal() {
  const {
    isOpen,
    onCloseChatModal,
    messages,
    isTyping,
    currentStep,
    setStep,
    addBotMessage,
    clearMessages,
  } = useChatAssistant();

  useEffect(() => {
    if (!isOpen) return;
    clearMessages();
    setStep('greeting');
    const timer = window.setTimeout(() => addBotMessage('greeting'), 400);

    return () => window.clearTimeout(timer);
  }, [addBotMessage, clearMessages, isOpen, setStep]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={isOpen => {
        if (!isOpen) onCloseChatModal();
      }}
    >
      <DialogContent className="sm:max-w-[550px] p-0 gap-0 overflow-hidden">
        <ChatHeader />

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
                Yes, let’s get started!
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
