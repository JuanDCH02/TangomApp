import {z} from 'zod'
import type {  OrderItemSchema, OrderListSchema, OrderNoteSchema, OrderSchema } from "../schemas/order.schema"
import type { CategoriesSchema, CategorySchema, DashboardProductSchema, ProductFormSchema, ProductListSchema, ProductSchema } from '../schemas/product.schema'



export type OrderNote = z.infer<typeof OrderNoteSchema>
export type OrderItem = z.infer<typeof OrderItemSchema>
export type Order = z.infer<typeof OrderSchema>
export type OrderList = z.infer<typeof OrderListSchema>

export type Product = z.infer<typeof ProductSchema>;
export type ProductList = z.infer<typeof ProductListSchema>;
export type DashboardProduct = z.infer<typeof DashboardProductSchema>;


export type ProductFormData = z.infer<typeof ProductFormSchema>
export type OrderNoteFormData = {
    id:string,
    content:string
}

export type Category = z.infer<typeof CategorySchema>;
export type Categories = z.infer<typeof CategoriesSchema>;
