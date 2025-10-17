import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUrlState } from '@/hooks/use-url-state';
import { AuthLayout } from '@/layouts/auth-layout';
import { register as registerRoute } from '@/routes';
import { store as loginStore } from '@/routes/login';
import { request as requestPassword } from '@/routes/password';

const loginSchema = z.object({
  email: z
    .string({ required_error: 'Informe seu e-mail.' })
    .nonempty('Informe seu e-mail.')
    .email('Digite um e-mail válido.'),
  password: z
    .string({ required_error: 'Informe sua senha.' })
    .nonempty('Informe sua senha.'),
  remember: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
  onSwitchToRegister?: () => void;
}

export function Login({
  status,
  canResetPassword,
  onSwitchToRegister,
}: LoginProps) {
  const [showPassword, setShowPassword] = useUrlState(
    'login_show_password',
    false
  );

  const {
    control,
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  function handleTogglePasswordVisibility() {
    setShowPassword(prev => !prev);
  }

  function handleRememberChange(onChange: (value: boolean) => void) {
    return (checked: boolean | 'indeterminate') => {
      onChange(Boolean(checked));
    };
  }

  function handleLoginSubmit(data: LoginFormData) {
    clearErrors('root');

    return new Promise<void>(resolve => {
      router.post(
        loginStore.url(),
        {
          email: data.email,
          password: data.password,
          remember: data.remember ? 'on' : '',
        },
        {
          onError: serverErrors => {
            let fallback: string | null = null;

            Object.entries(serverErrors).forEach(([field, message]) => {
              const mensagem = Array.isArray(message)
                ? message.join(', ')
                : message;

              if (field === 'email' || field === 'password') {
                setError(field as keyof LoginFormData, {
                  type: 'server',
                  message: mensagem,
                });
              } else {
                fallback = mensagem;
              }
            });

            if (fallback) {
              setError('root', {
                type: 'server',
                message: fallback,
              });
            }
          },
          onSuccess: () => {
            reset({ email: '', password: '', remember: false });
          },
          onFinish: () => {
            resolve();
          },
        }
      );
    });
  }

  return (
    <AuthLayout>
      <Head title="Entrar" />

      {status && (
        <div className="mb-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-200">
          {status}
        </div>
      )}

      <div className="mb-8">
        <h2 className="mb-2 text-2xl text-foreground">Bem-vindo de volta</h2>
        <p className="text-sm text-[color:var(--text-secondary)]">
          Entre para continuar cuidando da sua saúde.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleLoginSubmit)} className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="email" className="block text-foreground">
            E-mail
          </Label>
          <Input
            type="email"
            placeholder="seu@email.com"
            autoComplete="email"
            className="h-12 rounded-sm border-[color:var(--border)] bg-[color:var(--surface)]/85 text-foreground placeholder:text-[color:var(--text-secondary)]/70 transition-all focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary)]/25"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="password" className="block text-foreground">
            Senha
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="current-password"
              className="h-12 rounded-sm border-[color:var(--border)] bg-[color:var(--surface)]/85 pr-12 text-foreground placeholder:text-[color:var(--text-secondary)]/70 transition-all focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary)]/25"
              {...register('password')}
            />
            <button
              type="button"
              onClick={handleTogglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--text-secondary)] transition-colors hover:text-[color:var(--accent)]"
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-red-400">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Controller
              name="remember"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  checked={value}
                  onCheckedChange={handleRememberChange(onChange)}
                  className="border-[color:var(--border)] data-[state=checked]:border-[color:var(--primary)] data-[state=checked]:bg-[color:var(--primary)]"
                />
              )}
            />
            <Label
              htmlFor="lembrar"
              className="cursor-pointer text-sm text-[color:var(--text-secondary)]"
            >
              Lembrar de mim
            </Label>
          </div>

          {canResetPassword && (
            <a
              href={requestPassword.url()}
              className="text-sm text-[color:var(--accent)] transition-colors hover:text-[color:var(--accent)]/80"
            >
              Esqueci minha senha
            </a>
          )}
        </div>

        {errors.root?.message && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {errors.root.message}
          </div>
        )}

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-xl border-0 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white shadow-lg shadow-[rgba(107,95,209,0.28)] transition-all hover:from-[var(--primary-hover)] hover:to-[color:var(--accent)]/90"
          >
            {isSubmitting && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            Entrar
          </Button>
        </motion.div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-sidebar-border/70" />
          </div>
          <div className="relative flex items-center justify-center text-sm">
            <span className="rounded-2xl bg-gradient-to-r from-[color:var(--surface-muted)]/90 to-[color:var(--surface)]/90 px-4 text-[color:var(--text-secondary)]">
              ou
            </span>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="button"
            variant="outline"
            className="h-12 w-full rounded-xl border-2 border-[color:var(--border)] bg-[color:var(--surface)] text-foreground transition-all hover:border-[color:var(--accent)]/60 hover:bg-[color:var(--accent)]/10"
          >
            <svg
              className="mr-2 h-5 w-5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Entrar com Google
          </Button>
        </motion.div>

        <div className="pt-4 text-center">
          <p className="text-sm text-[color:var(--text-secondary)]">
            Não tem uma conta?{' '}
            {onSwitchToRegister ? (
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-[color:var(--accent)] underline-offset-4 transition-colors hover:text-[color:var(--accent)]/80 hover:underline"
              >
                Crie agora
              </button>
            ) : (
              <a
                href={registerRoute.url()}
                className="text-[color:var(--accent)] transition-colors hover:text-[color:var(--accent)]/80"
              >
                Crie agora
              </a>
            )}
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
