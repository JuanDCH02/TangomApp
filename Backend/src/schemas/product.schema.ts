import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(3),
    price: z.number().positive(),
    stock: z.number().int().nonnegative(),
    imageUrl: z.string().optional(),
    categoryId: z.number().int()
})

export type CreateProductInput = z.infer<typeof createProductSchema>;