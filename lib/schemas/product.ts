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
  price: z
    .string()
    .min(1, "Price is required.")
    .refine((v) => !Number.isNaN(Number(v)), "Price must be a number.")
    .refine((v) => Number(v) > 0, "Price must be greater than 0.")
    .transform((v) => Number(v)),
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
