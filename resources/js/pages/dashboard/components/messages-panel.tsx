import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from 'lucide-react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import type { CSSProperties } from 'react';
import z from 'zod';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { createRandomId } from '@/utils/create-random-id';

const messages = [
  {
    id: createRandomId(),
    sender: 'Dr. Carlos Silva',
    avatar:
      'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop',
    message: 'Olá Guilherme! Seus últimos exames estão ótimos. Continue assim!',
    time: '10:30',
    unread: true,
  },
  {
    id: createRandomId(),
    sender: 'Dra. Ana Beatriz',
    avatar:
      'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&h=100&fit=crop',
    message:
      'Não esqueça de trazer seus exames anteriores na próxima consulta.',
    time: 'Ontem',
    unread: false,
  },
  {
    id: createRandomId(),
    sender: 'Velan Saúde',
    avatar: '',
    message: 'Sua consulta foi confirmada para amanhã às 14:30.',
    time: '2 dias',
    unread: false,
  },
];

const messagesPanelSchema = z.object({
  message: z.string().min(1).max(500),
});

type MessagesPanelFormData = z.infer<typeof messagesPanelSchema>;

const mixColor = (cssVar: string, percentage: number) =>
  `color-mix(in srgb, ${cssVar} ${percentage}%, transparent)`;

export function DashboardMessagesPanel() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<MessagesPanelFormData>({
    resolver: zodResolver(messagesPanelSchema),
    defaultValues: {
      message: '',
    },
  });

  function handleSendMessage({ message }: MessagesPanelFormData) {
    console.log(message);
  }

  return (
    <Card className="mt-4 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col h-[500px]">
      <div className="mb-4">
        <h2>Messagens</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          Converse com seus médicos
        </p>
      </div>

      <ScrollArea className="flex-1 -mx-2 px-2">
        <div className="space-y-2">
          {messages.map((msg, index) => {
            const accent = 'var(--color-accent)';
            const messageStyles: (CSSProperties & Record<string, string>) = {
              '--message-bg': msg.unread
                ? mixColor(accent, 10)
                : mixColor('var(--color-surface)', 5),
              '--message-bg-hover': msg.unread
                ? mixColor(accent, 15)
                : mixColor('var(--color-surface)', 10),
              '--message-border': msg.unread
                ? mixColor(accent, 30)
                : 'transparent',
              '--message-avatar-border': mixColor(accent, 30),
              '--message-avatar-gradient':
                'linear-gradient(135deg, var(--color-accent), var(--color-chart-4))',
            };

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group p-4 rounded-xl cursor-pointer transition-all border bg-[var(--message-bg)] hover:bg-[var(--message-bg-hover)] border-[color:var(--message-border)]"
                style={messageStyles}
              >
              <div className="flex items-start gap-3">
                <Avatar className="w-10 h-10 border-2 border-[color:var(--message-avatar-border)] shrink-0">
                  {msg.avatar ? (
                    <AvatarImage src={msg.avatar} />
                  ) : (
                    <AvatarFallback
                      className="text-white"
                      style={{
                        background: 'var(--message-avatar-gradient)',
                      }}
                    >
                      V
                    </AvatarFallback>
                  )}
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-sm truncate">{msg.sender}</h4>
                    <span className="text-xs text-[var(--color-text-secondary)] shrink-0">
                      {msg.time}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2">
                    {msg.message}
                  </p>
                  {msg.unread && (
                    <div className="w-2 h-2 rounded-full bg-[var(--color-chart-4)] shrink-0 mt-2" />
                  )}
                </div>
              </div>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>

      <div className="mt-4 pt-4 border-t border-white/10">
        <form className="flex gap-2" onSubmit={handleSubmit(handleSendMessage)}>
          <div className="w-full flex items-center justify-center">
            <Input
              placeholder="Digite sua mensagem"
              className="flex-1 h-10 bg-white/5 border-white/10 focus:border-[color:var(--color-chart-4)] focus:ring-2 focus:ring-[color:var(--color-chart-4)] focus:ring-opacity-20 rounded-sm"
              {...register('message')}
            />
            {errors.message && (
              <p className="text-xs text-red-500 mt-1">
                {errors.message.message}
              </p>
            )}
          </div>
          <Button size="icon" className="rounded-full" type="submit">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}
