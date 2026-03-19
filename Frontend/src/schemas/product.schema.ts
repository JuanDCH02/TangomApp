
import { z } from "zod";


export const ProductSchema = z.object({
    id: z.number(),
    name: z.string().min(3),
    stock: z.number().int().nonnegative(),
    price: z.number().positive(),
    imageUrl: z.string().optional(),
    categoryId: z.int(),
    updatedAt: z.string(),
})

export const ProductFormSchema = ProductSchema.pick({
    name: true, 
    price: true, 
    stock: true, 
    imageUrl: true, 
    categoryId: true 
})

export const ProductListSchema = z.array(ProductSchema)

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
})

export const CategoriesSchema = z.array(CategorySchema)
