import { zodResolver } from '@hookform/resolvers/zod';
import { Head, router } from '@inertiajs/react';
import { CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useUrlState } from '@/hooks/use-url-state';
import { AuthLayout } from '@/layouts/auth-layout';
import { login as loginRoute } from '@/routes';
import { store as registerStore } from '@/routes/register';

interface RegisterProps {
  onSwitchToLogin?: () => void;
}

const registerSchema = z
  .object({
    name: z
      .string({ required_error: 'Informe seu nome completo.' })
      .min(1, 'Informe seu nome completo.'),
    email: z
      .string({ required_error: 'Informe seu e-mail.' })
      .min(1, 'Informe seu e-mail.')
      .email('Digite um e-mail válido.'),
    phone: z
      .string({ required_error: 'Informe seu telefone.' })
      .min(1, 'Informe seu telefone.')
      .max(20, 'O telefone deve ter no máximo 20 caracteres.'),
    role: z.enum(['patient', 'doctor', 'clinic'], {
      required_error: 'Selecione o perfil de uso.',
      invalid_type_error: 'Selecione o perfil de uso.',
    }),
    password: z
      .string({ required_error: 'Informe uma senha.' })
      .min(8, 'A senha deve ter pelo menos 8 caracteres.'),
    confirmPassword: z
      .string({ required_error: 'Confirme a sua senha.' })
      .min(8, 'A senha deve ter pelo menos 8 caracteres.'),
    acceptTerms: z
      .boolean()
      .refine(value => value, { message: 'Você precisa aceitar os termos.' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas precisam coincidir.',
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function Register({ onSwitchToLogin }: RegisterProps = {}) {
  const [showPassword, setShowPassword] = useUrlState(
    'register_show_password',
    false
  );

  const [showConfirmPassword, setShowConfirmPassword] = useUrlState(
    'register_show_confirm_password',
    false
  );

  const [isSuccessVisible, setIsSuccessVisible] = useUrlState(
    'register_success',
    false
  );
  const handleLoginRedirect =
    onSwitchToLogin ?? (() => router.visit(loginRoute()));

  const successTimeoutRef = useRef<number | null>(null);

  const {
    control,
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: 'patient',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  useEffect(() => {
    return () => clearSuccessTimeout();
  }, []);

  function clearSuccessTimeout() {
    if (successTimeoutRef.current) {
      clearTimeout(successTimeoutRef.current);
      successTimeoutRef.current = null;
    }
  }

  function scheduleSuccessReset() {
    clearSuccessTimeout();
    successTimeoutRef.current = window.setTimeout(() => {
      setIsSuccessVisible(false);
      successTimeoutRef.current = null;
    }, 2000);
  }

  function handleTogglePasswordVisibility() {
    setShowPassword(previous => !previous);
  }

  function handleToggleConfirmPasswordVisibility() {
    setShowConfirmPassword(previous => !previous);
  }

  function handleTermsChange(onChange: (value: boolean) => void) {
    return (checked: boolean | 'indeterminate') => {
      onChange(Boolean(checked));
    };
  }

  function handleRegisterSubmit(data: RegisterFormData) {
    clearErrors('root');
    setIsSuccessVisible(false);
    clearSuccessTimeout();

    const registerFields: Array<keyof RegisterFormData> = [
      'name',
      'email',
      'phone',
      'role',
      'password',
      'confirmPassword',
      'acceptTerms',
    ];

    const resolveField = (field: string): keyof RegisterFormData | null => {
      if (registerFields.includes(field as keyof RegisterFormData)) {
        return field as keyof RegisterFormData;
      }

      return null;
    };

    return new Promise<void>(resolve => {
      router.post(
        registerStore.url(),
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: data.role,
          password: data.password,
          password_confirmation: data.confirmPassword,
          terms: data.acceptTerms ? 'on' : '',
        },
        {
          preserveScroll: true,
          onError: serverErrors => {
            const fieldAlias: Record<string, keyof RegisterFormData> = {
              password_confirmation: 'confirmPassword',
            };

            Object.entries(serverErrors).forEach(([field, message]) => {
              const errorMessage = Array.isArray(message)
                ? message.join(', ')
                : message;

              const mappedField = fieldAlias[field] ?? resolveField(field);

              if (mappedField) {
                setError(mappedField, {
                  type: 'server',
                  message: errorMessage,
                });
              } else {
                setError('root', {
                  type: 'server',
                  message: errorMessage,
                });
              }
            });
          },
          onSuccess: () => {
            setIsSuccessVisible(true);
            scheduleSuccessReset();
            reset(
              {
                name: '',
                email: '',
                phone: '',
                role: 'patient',
                password: '',
                confirmPassword: '',
                acceptTerms: false,
              },
              { keepErrors: false, keepDirty: false, keepTouched: false }
            );
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
      <Head title="Crie sua conta" />

      <div className="mb-8">
        <h2 className="mb-2 text-2xl text-foreground">Crie sua conta</h2>
        <p className="text-sm text-[color:var(--text-secondary)]">
          Simplifique sua rotina médica e evolua com a Velan.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleRegisterSubmit)} className="space-y-5">
        <div className="space-y-3">
          <Label htmlFor="name" className="text-foreground">
            Nome completo
          </Label>
          <Input
            type="text"
            autoComplete="name"
            placeholder="Seu nome completo"
            className="h-12 rounded-xl border-[color:var(--border)] bg-[color:var(--surface)]/85 text-foreground placeholder:text-[color:var(--text-secondary)]/70 transition-all focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary)]/25"
            {...register('name')}
          />
          {errors.name && (
            <p className="text-xs text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="email" className="text-foreground">
            E-mail
          </Label>
          <Input
            type="email"
            autoComplete="email"
            placeholder="seu@email.com"
            className="h-12 rounded-xl border-[color:var(--border)] bg-[color:var(--surface)]/85 text-foreground placeholder:text-[color:var(--text-secondary)]/70 transition-all focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary)]/25"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="phone" className="text-foreground">
            Telefone
          </Label>
          <Input
            type="tel"
            autoComplete="tel"
            placeholder="(00) 00000-0000"
            className="h-12 rounded-xl border-[color:var(--border)] bg-[color:var(--surface)]/85 text-foreground placeholder:text-[color:var(--text-secondary)]/70 transition-all focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary)]/25"
            {...register('phone')}
          />
          {errors.phone && (
            <p className="text-xs text-red-400">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="role" className="text-foreground">
            Perfil de uso
          </Label>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="h-12 rounded-xl border-[color:var(--border)] bg-[color:var(--surface)]/85 text-left text-foreground transition-all focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary)]/25">
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Paciente</SelectItem>
                  <SelectItem value="doctor">Médico</SelectItem>
                  <SelectItem value="clinic">Clínica</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.role && (
            <p className="text-xs text-red-400">{errors.role.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="password" className="text-foreground">
            Senha
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Mínimo 8 caracteres"
              className="h-12 rounded-xl border-[color:var(--border)] bg-[color:var(--surface)]/85 pr-12 text-foreground placeholder:text-[color:var(--text-secondary)]/70 transition-all focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary)]/25"
              {...register('password')}
            />
            <button
              type="button"
              onClick={handleTogglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--text-secondary)] transition-colors hover:text-[color:var(--accent)]"
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

        <div className="space-y-3">
          <Label htmlFor="confirmPassword" className="text-foreground">
            Confirmar senha
          </Label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Digite a senha novamente"
              className="h-12 rounded-xl border-[color:var(--border)] bg-[color:var(--surface)]/85 pr-12 text-foreground placeholder:text-[color:var(--text-secondary)]/70 transition-all focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary)]/25"
              {...register('confirmPassword')}
            />
            <button
              type="button"
              onClick={handleToggleConfirmPasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[color:var(--text-secondary)] transition-colors hover:text-[color:var(--accent)]"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex items-start gap-2">
          <Controller
            name="acceptTerms"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Checkbox
                checked={value}
                onCheckedChange={handleTermsChange(onChange)}
                className="mt-1 border-[color:var(--border)] data-[state=checked]:border-[color:var(--primary)] data-[state=checked]:bg-[color:var(--primary)]"
              />
            )}
          />
          <Label
            htmlFor="terms"
            className="cursor-pointer text-sm leading-relaxed text-[color:var(--text-secondary)]"
          >
            Aceito os{' '}
            <a
              href="#"
              className="text-[color:var(--accent)] transition-colors hover:text-[color:var(--accent)]/80"
            >
              termos de uso
            </a>{' '}
            e{' '}
            <a
              href="#"
              className="text-[color:var(--accent)] transition-colors hover:text-[color:var(--accent)]/80"
            >
              políticas de privacidade
            </a>
            .
          </Label>
        </div>
        {errors.acceptTerms && (
          <p className="text-xs text-red-400">{errors.acceptTerms.message}</p>
        )}

        {errors.root?.message && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {errors.root.message}
          </div>
        )}

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            disabled={isSubmitting || isSuccessVisible}
            className="relative h-12 w-full overflow-hidden rounded-xl border-0 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white shadow-lg shadow-[rgba(107,95,209,0.28)] transition-all hover:from-[var(--primary-hover)] hover:to-[color:var(--accent)]/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSuccessVisible ? (
              <motion.div
                className="flex items-center gap-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <CheckCircle2 className="h-5 w-5" />
                Conta criada!
              </motion.div>
            ) : isSubmitting ? (
              <div className="flex items-center gap-2">
                <motion.div
                  className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                Criando conta...
              </div>
            ) : (
              'Registrar-se'
            )}
          </Button>
        </motion.div>

        <div className="pt-4 text-center">
          <p className="text-sm text-[color:var(--text-secondary)]">
            Já tem uma conta?{' '}
            <button
              type="button"
              onClick={handleLoginRedirect}
              className="text-[color:var(--accent)] underline-offset-4 transition-colors hover:text-[color:var(--accent)]/80 hover:underline"
            >
              Entre agora
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
