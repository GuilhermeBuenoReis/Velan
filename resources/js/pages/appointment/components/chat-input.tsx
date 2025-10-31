import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useChatAssistant } from '../context/chat-assistant-context';

const dateFormSchema = z.object({
  date: z
    .string({ required_error: 'Por favor, insira uma data válida' })
    .min(1, 'Por favor, insira uma data válida'),
});

const notesFormSchema = z.object({
  notes: z
    .string()
    .max(500, 'A nota não pode ter mais de 500 caracteres')
    .optional()
    .or(z.literal('')),
});

type DateFormData = z.infer<typeof dateFormSchema>;
type NotesFormData = z.infer<typeof notesFormSchema>;

export function ChatInput() {
  const { currentStep, onSkipNotes, onSubmitCurrentStep } = useChatAssistant();

  const isNotesStep = currentStep === 'notes';
  const isDateStep = currentStep === 'date';

  const schemaStep = isDateStep ? dateFormSchema : notesFormSchema;

  const form = useForm<DateFormData | NotesFormData>({
    resolver: zodResolver(schemaStep),
    defaultValues: { date: '', notes: '' },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const dateValue = watch('date');

  const minDate = useMemo(
    () => (isDateStep ? new Date().toISOString().split('T')[0] : undefined),
    [isDateStep]
  );

  function handleSubmitNewMessage(values: DateFormData | NotesFormData) {
    onSubmitCurrentStep(currentStep, values);
  }

  const dateError =
    isDateStep && 'date' in errors ? errors.date?.message : undefined;

  return (
    <div className="border-t border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <form
        onSubmit={handleSubmit(handleSubmitNewMessage)}
        className="flex gap-2 items-start"
      >
        <div className="flex flex-1 flex-col">
          <Input
            type={isDateStep ? 'date' : 'text'}
            placeholder={
              isNotesStep
                ? 'Adicione observações ou pule…'
                : isDateStep
                  ? 'Selecione uma data preferencial'
                  : 'Digite sua resposta…'
            }
            min={minDate}
            {...(isDateStep ? register('date') : register('notes'))}
            className="flex-1"
          />

          {isDateStep && dateError && (
            <span className="mt-1 text-xs text-red-500">{dateError}</span>
          )}
        </div>

        {isNotesStep && (
          <Button
            type="button"
            variant="outline"
            onClick={onSkipNotes}
            className="whitespace-nowrap"
          >
            Pular
          </Button>
        )}

        <Button
          type="submit"
          className="text-white"
          style={{
            backgroundImage:
              'linear-gradient(135deg, var(--color-secondary), var(--color-primary))',
          }}
          disabled={isDateStep && !dateValue}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
