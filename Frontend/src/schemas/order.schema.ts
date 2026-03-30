
import { z } from "zod";
import { ProductSchema } from './product.schema';

export const OrderNoteSchema = z.object({
    id: z.number(),
    orderId: z.number(),
    content: z.string(),
    createdAt: z.string(),
})

export const OrderItemSchema = z.object({
    name: z.string(),
    productId: z.int(),
    quantity: z.int(),
    price: z.number(),
})

export const DashboardOrderSchema = z.object({
    id: z.number().optional(),
    total: z.number(),
    items: z.array(OrderItemSchema)
})

export const OrderSchema = z.object({
    id: z.number(),
    status: z.string(),
    total: z.number(),
    email: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    items: z.array(
        z.object({
            id: z.number(),
            orderId: z.number(),
            productId: z.number(),
            quantity: z.number(),
            price: z.number(),
            product: ProductSchema
        })
    ),
    notes: z.array(OrderNoteSchema).optional(),
})

export const OrderListSchema = z.array(
    OrderSchema.pick({
        id:true,
        total:true,
        email:true,
        status:true,
        createdAt:true,
        updatedAt:true,
    })
)