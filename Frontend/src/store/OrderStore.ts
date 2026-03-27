import { create } from "zustand";
import type { OrderItem, Product } from "../types";



interface Store {
    order: OrderItem[],
    increaseQuantity: (id: Product['id']) => void,
    decreaseQuantity: (id: Product['id']) => void,
    removeItem: (id: Product['id']) => void,
    clearorder: ()=> void
}


export const OrderStore = create<Store>((set, get) =>({
    order: [],

    increaseQuantity:(id)=> {
        set((state)=> ({
            order: state.order.map(item => item.productId === id?{
                ...item, 
                quantity: item.quantity + 1, 
                subtotal: item.price * (item.quantity + 1)
            }:item)
        }))
    },

    decreaseQuantity:(id)=> {
        set((state)=> ({
            order: state.order.map(item => item.productId === id?{
                ...item, 
                quantity: item.quantity - 1, 
                subtotal: item.price * (item.quantity - 1)
            }:item)
        }))
    },

    removeItem:(id)=> {
        set((state)=> ({
            order: state.order.filter(item => item.productId !== id)
        }))
    },

    clearorder:()=> { set(()=> ( {order: []} )) }

}))