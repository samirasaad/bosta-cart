import { z } from "zod";

export const createProductSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .transform((s) => s.trim()),
  description: z
    .string()
    .min(1, "Description is required.")
    .transform((s) => s.trim()),
  /**
   * Coerce the input into a number so the form can submit
   * string values from the `<input type="number" />` while
   * still giving us a strongly-typed numeric price.
   */
  price: z.coerce
    .number({
      invalid_type_error: "Price must be a number.",
    })
    // .min(1, "Price is required.")
    .max(1000, "Price must be less than 1,000.")
    .refine((v) => !Number.isNaN(v), "Price must be a number.")
    .refine((v) => v > 0, "Price must be a positive number."),
  category: z.string().min(1, "Category is required."),
  image: z
    .string()
    .min(1, "Image URL is required.")
    .transform((s) => s.trim())
    .refine((s) => s.startsWith("http://") || s.startsWith("https://"), {
      message: "Please enter a valid URL.",
    }),
});

export type CreateProductFormValues = z.infer<typeof createProductSchema>;
