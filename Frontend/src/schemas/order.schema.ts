import { z } from "zod";

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
    items: z.array(OrderItemSchema),
    notes: z.array(OrderNoteSchema),
    createdAt: z.string(),
    updatedAt: z.string(),
})