"use client";

import { useIsFetching } from "@tanstack/react-query";

export function GlobalFetchingIndicator() {
  const isFetching = useIsFetching();

  if (isFetching === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-100 h-0.5 bg-foreground/15 overflow-hidden"
      role="progressbar"
      aria-hidden="true"
    >
      <div className="h-full w-1/3 bg-foreground global-loading-bar" />
    </div>
  );
}
