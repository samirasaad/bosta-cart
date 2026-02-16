import type { FieldErrors, Resolver } from "react-hook-form";
import type { z } from "zod";

/**
 * Resolver that validates with Zod. Use instead of @hookform/resolvers/zod
 * to avoid subpath resolution issues (e.g. "Can't resolve '@hookform/resolvers/zod'").
 */
export function zodResolver<T extends z.ZodTypeAny>(
  schema: T
): Resolver<z.infer<T>> {
  return async (values, _context, _options) => {
    const result = await schema.safeParseAsync(values);
    if (result.success) {
      // Cast to FieldErrors to satisfy react-hook-form's ResolverResult type.
      return {
        values: result.data as z.infer<T>,
        errors: {} as FieldErrors<z.infer<T>>,
      };
    }
    const errors: Record<string, { type: string; message: string }> = {};
    for (const issue of result.error.issues) {
      const path = issue.path.join(".");
      if (!errors[path]) {
        errors[path] = { type: issue.code, message: issue.message };
      }
    }
    return {
      values: {} as z.infer<T>,
      errors: errors as unknown as FieldErrors<z.infer<T>>,
    };
  };
}
