"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@/lib/zodResolver";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAuthStore } from "@/lib/stores/authStore";
import { login } from "@/lib/api/auth";
import { loginSchema, type LoginFormValues } from "@/lib/schemas/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { getErrorMessage } from "@/lib/api/errors";

const iconClass = "w-5 h-5 shrink-0";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setAuth = useAuthStore((s) => s.setAuth);
  const redirectTo = searchParams.get("redirect") ?? "/products";

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const { token } = await login({
        username: data.username,
        password: data.password,
      });
      setAuth(token, { username: data.username });
      router.push(redirectTo);
    } catch (err) {
      const rawMessage = getErrorMessage(err);
      const message =
        rawMessage === "Something went wrong" ||
        rawMessage === "Something went wrong. Please try again."
          ? "Login failed. Please check your credentials and try again."
          : rawMessage;
      setError("root", { message });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {errors.root && (
        <ErrorMessage message={errors.root.message ?? ""} title="Login failed" />
      )}
      <Input
        label="Username"
        type="text"
        placeholder="Username"
        autoComplete="username"
        required
        disabled={isSubmitting}
        {...register("username")}
        error={errors.username?.message}
      />
      <Input
        label="Password"
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        required
        disabled={isSubmitting}
        {...register("password")}
        error={errors.password?.message}
      />
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isSubmitting}
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2"
      >
        <ArrowRightEndOnRectangleIcon className={iconClass} aria-hidden />
        Log in
      </Button>
    </form>
  );
}
