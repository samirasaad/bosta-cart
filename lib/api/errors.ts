import type { ApiError } from "@/lib/types";

/**
 * Returns a user-facing message from an unknown error (ApiError, Error, Axios, etc.).
 */
export function getErrorMessage(error: unknown): string {
  if (error == null) return "Something went wrong";
  if (typeof error === "string") return error;
  const err = error as Record<string, unknown>;
  if (typeof err?.message === "string" && err.message) return err.message;
  if (error instanceof Error && error.message) return error.message;
  return "Something went wrong. Please try again.";
}

/**
 * Type guard for API errors with status.
 */
export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error != null &&
    "message" in error &&
    typeof (error as ApiError).message === "string"
  );
}
