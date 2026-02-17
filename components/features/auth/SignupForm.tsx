"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@/lib/zodResolver";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { signupSchema, type SignupFormValues } from "@/lib/schemas/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { getErrorMessage } from "@/lib/api/errors";

const iconClass = "w-5 h-5 shrink-0";
const SIGNUP_STORAGE_KEY = "signup_credentials";

export function SignupForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          SIGNUP_STORAGE_KEY,
          JSON.stringify({ username: data.username, password: data.password })
        );
      }
      router.push("/auth/login?from=signup");
    } catch (err) {
      setError("root", { message: getErrorMessage(err) });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {errors.root && (
        <ErrorMessage
          message={errors.root.message ?? ""}
          title="Sign up failed"
        />
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
        autoComplete="new-password"
        required
        disabled={isSubmitting}
        {...register("password")}
        error={errors.password?.message}
      />
      <Input
        label="Confirm password"
        type="password"
        placeholder="Confirm password"
        autoComplete="new-password"
        required
        disabled={isSubmitting}
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />
      <p className="text-xs text-muted-foreground">
        The Fake Store API does not support real signup. Your credentials are
        stored locally; use them to log in (API may accept test credentials
        only).
      </p>
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isSubmitting}
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2"
      >
        <UserPlusIcon className={iconClass} aria-hidden />
        Sign up
      </Button>
    </form>
  );
}
