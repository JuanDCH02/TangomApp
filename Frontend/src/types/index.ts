import {z} from 'zod'
import type { OrderitemSchema, OrderNoteSchema, OrderSchema } from "../schemas/order.schema"
import type { CategorySchema, DashboardProductSchema, ProductSchema } from '../schemas/product.schema'



export type Ordernote = z.infer<typeof OrderNoteSchema>

export type Orderitem = z.infer<typeof OrderitemSchema>

export type Order = z.infer<typeof OrderSchema>

export type Product = z.infer<typeof ProductSchema>;

export type DashboardProduct = z.infer<typeof DashboardProductSchema>;


export type CreateProductInput = Pick<Product, 'name'|'price'|'stock'|'categoryId'|'imageUrl'>;

export type Category = z.infer<typeof CategorySchema>;
