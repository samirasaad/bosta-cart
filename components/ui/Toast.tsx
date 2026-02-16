"use client";

import { useEffect } from "react";
import { useToastStore } from "@/lib/stores/toastStore";

const DURATION_MS = 2500;

export function Toast() {
  const message = useToastStore((s) => s.message);
  const hide = useToastStore((s) => s.hide);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(hide, DURATION_MS);
    return () => clearTimeout(t);
  }, [message, hide]);

  if (!message) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-lg border border-border bg-foreground px-4 py-2.5 text-sm font-medium text-background shadow-lg animate-[fade-in_0.2s_ease-out] max-w-[min(90vw,480px)] break-words"
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
