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
        <h2 className="mb-2 text-2xl text-[#EAEAEA]">Crie sua conta</h2>
        <p className="text-sm text-[#A0A0B0]">
          Simplifique sua rotina médica e evolua com a Velan.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleRegisterSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-[#EAEAEA]">
            Nome completo
          </Label>
          <Input
            type="text"
            autoComplete="name"
            placeholder="Seu nome completo"
            className="h-12 rounded-xl border-white/10 bg-[#0F0F17]/50 text-[#EAEAEA] placeholder:text-[#A0A0B0]/50 transition-all focus:border-[#00C6AE] focus:ring-2 focus:ring-[#00C6AE]/20"
            {...register('name')}
          />
          {errors.name && (
            <p className="text-xs text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#EAEAEA]">
            E-mail
          </Label>
          <Input
            type="email"
            autoComplete="email"
            placeholder="seu@email.com"
            className="h-12 rounded-xl border-white/10 bg-[#0F0F17]/50 text-[#EAEAEA] placeholder:text-[#A0A0B0]/50 transition-all focus:border-[#00C6AE] focus:ring-2 focus:ring-[#00C6AE]/20"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-[#EAEAEA]">
            Senha
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Mínimo 8 caracteres"
              className="h-12 rounded-xl border-white/10 bg-[#0F0F17]/50 pr-12 text-[#EAEAEA] placeholder:text-[#A0A0B0]/50 transition-all focus:border-[#00C6AE] focus:ring-2 focus:ring-[#00C6AE]/20"
              {...register('password')}
            />
            <button
              type="button"
              onClick={handleTogglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0A0B0] transition-colors hover:text-[#00C6AE]"
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

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-[#EAEAEA]">
            Confirmar senha
          </Label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Digite a senha novamente"
              className="h-12 rounded-xl border-white/10 bg-[#0F0F17]/50 pr-12 text-[#EAEAEA] placeholder:text-[#A0A0B0]/50 transition-all focus:border-[#00C6AE] focus:ring-2 focus:ring-[#00C6AE]/20"
              {...register('confirmPassword')}
            />
            <button
              type="button"
              onClick={handleToggleConfirmPasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A0A0B0] transition-colors hover:text-[#00C6AE]"
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
                className="mt-1 border-white/20 data-[state=checked]:border-[#6C63FF] data-[state=checked]:bg-[#6C63FF]"
              />
            )}
          />
          <Label
            htmlFor="terms"
            className="cursor-pointer text-sm leading-relaxed text-[#A0A0B0]"
          >
            Aceito os{' '}
            <a
              href="#"
              className="text-[#00C6AE] transition-colors hover:text-[#00C6AE]/80"
            >
              termos de uso
            </a>{' '}
            e{' '}
            <a
              href="#"
              className="text-[#00C6AE] transition-colors hover:text-[#00C6AE]/80"
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
            className="relative h-12 w-full overflow-hidden rounded-xl border-0 bg-gradient-to-r from-[#6C63FF] to-[#00C6AE] text-white shadow-lg shadow-[#6C63FF]/30 transition-all hover:from-[#5B52EE] hover:to-[#00B59D] disabled:cursor-not-allowed disabled:opacity-50"
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
          <p className="text-sm text-[#A0A0B0]">
            Já tem uma conta?{' '}
            {onSwitchToLogin ? (
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-[#00C6AE] underline-offset-4 transition-colors hover:text-[#00C6AE]/80 hover:underline"
              >
                Entre agora
              </button>
            ) : (
              <a
                href={loginRoute()}
                className="text-[#00C6AE] transition-colors hover:text-[#00C6AE]/80"
              >
                Entre agora
              </a>
            )}
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
