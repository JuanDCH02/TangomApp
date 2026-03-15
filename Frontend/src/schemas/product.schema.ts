
import { z } from "zod";


export const ProductSchema = z.object({
    id: z.number(),
    name: z.string().min(3),
    stock: z.number().int().nonnegative(),
    price: z.number().positive(),
    imageUrl: z.string().optional(),
    categoryId: z.int(),
    updateAt: z.string(),
})

export const DashboardProductSchema = z.array(
    ProductSchema.pick({
        id: true,
        name: true,
        stock: true,
        price: true,
        categoryId: true,
    })
)

export const CategorySchema = z.object({
    id: z.number(),
    name: z.string(),
    products: z.array(ProductSchema)
})
