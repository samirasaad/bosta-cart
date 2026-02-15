import Link from "next/link";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { SignupForm } from "@/components/features/auth/SignupForm";

const linkClass =
  "text-foreground font-medium underline underline-offset-4 hover:no-underline focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:rounded transition-colors";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Store your credentials locally to try the demo."
    >
      <div className="space-y-6">
        <SignupForm />
        <div className="pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link href="/auth/login" className={linkClass}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
