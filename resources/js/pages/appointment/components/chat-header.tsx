import { User, X } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useChatAssistant } from '../context/chat-assistant-context';

export function ChatHeader() {
  const { onCloseChatModal } = useChatAssistant();

  return (
    <div
      className="relative px-6 py-5 text-white"
      style={{
        backgroundImage:
          'linear-gradient(135deg, var(--color-secondary), var(--color-primary))',
      }}
    >
      {/* Botão de fechar */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onCloseChatModal}
        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
      >
        <X className="h-5 w-5" />
      </Button>

      {/* Avatar + título */}
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12 border-2 border-white/30 shadow-sm">
          <AvatarFallback className="bg-white/15 text-white backdrop-blur-sm">
            <User className="h-6 w-6" />
          </AvatarFallback>
        </Avatar>

        <div>
          <h2 className="text-lg font-semibold">Assistente de Agendamento</h2>
          <p className="text-xs text-white/90 leading-snug">
            Vamos agendar sua próxima consulta passo a passo
          </p>
        </div>
      </div>
    </div>
  );
}
