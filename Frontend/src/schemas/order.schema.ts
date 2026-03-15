import { z } from "zod";

export const OrderNoteSchema = z.object({
    id: z.number(),
    orderId: z.number(),
    content: z.string(),
    createdAt: z.string(),
})

export const OrderitemSchema = z.object({
    id: z.number(),
    orderId: z.number(),
    productId: z.int(),
    quntity: z.int(),
    price: z.number(),
})

export const OrderSchema = z.object({
    id: z.number(),
    status: z.string(),
    total: z.number(),
    items: z.array(OrderitemSchema),
    notes: z.array(OrderNoteSchema),
    createdAt: z.string(),
    updatedAt: z.string(),
})