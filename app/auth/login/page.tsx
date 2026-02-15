import Link from "next/link";
import { Suspense } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { LoginForm } from "@/components/features/auth/LoginForm";
import { env } from "@/lib/env";

const linkClass =
  "text-foreground font-medium underline underline-offset-4 hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:rounded transition-colors";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle={`Sign in to continue to ${env.siteName}.`}
    >
      <div className="space-y-6">
        <Suspense fallback={<div className="text-muted-foreground">Loading...</div>}>
          <LoginForm />
        </Suspense>
        <div className="pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className={linkClass}>
              Sign up
            </Link>
          </p>
        </div>
        <div className="rounded-xl bg-muted/50 border border-border p-4">
          <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
            <InformationCircleIcon className="w-4 h-4 shrink-0" aria-hidden />
            Test credentials (Fake Store API)
          </p>
          <pre className="text-xs text-muted-foreground font-mono leading-relaxed bg-background/60 rounded-lg p-3 border border-border overflow-x-auto">
            {`username: mor_2314
password: 83r5^_`}
          </pre>
        </div>
      </div>
    </AuthLayout>
  );
}
