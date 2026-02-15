import { RedirectIfAuthenticated } from "@/components/layout/RedirectIfAuthenticated";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RedirectIfAuthenticated redirectTo="/products">
      {children}
    </RedirectIfAuthenticated>
  );
}
