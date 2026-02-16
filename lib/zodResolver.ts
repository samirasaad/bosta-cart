import type { Resolver } from "react-hook-form";
import type { z } from "zod";

/**
 * Resolver that validates with Zod. Use instead of @hookform/resolvers/zod
 * to avoid subpath resolution issues (e.g. "Can't resolve '@hookform/resolvers/zod'").
 */
export function zodResolver<T extends z.ZodType>(
  schema: T
): Resolver<z.infer<T>> {
  return async (values, _context, _options) => {
    const result = await schema.safeParseAsync(values);
    if (result.success) {
      return { values: result.data as z.infer<T>, errors: {} };
    }
    const errors: Record<string, { type: string; message: string }> = {};
    for (const issue of result.error.issues) {
      const path = issue.path.join(".");
      if (!errors[path]) {
        errors[path] = { type: issue.code, message: issue.message };
      }
    }
    return { values: {}, errors };
  };
}
