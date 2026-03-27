import { create } from "zustand";
import type { OrderItem, Product } from "../types";



interface Store {
    order: OrderItem[]
    addToOrder: (product: Product) => void
    total: number
    increaseQuantity: (id: Product['id']) => void
    decreaseQuantity: (id: Product['id']) => void
    removeItem: (id: Product['id']) => void
    clearorder: ()=> void
}


export const OrderStore = create<Store>((set, get) =>({
    order: [],
    total: 0,

    addToOrder: (product) => {
    set((state) => {
        const existing = state.order.find(i => i.productId === product.id)

        let newItems: OrderItem[]

        if (existing) {
            newItems = state.order.map(i => i.productId === product.id? { ...i, quantity: i.quantity + 1 }:i
            )
        } else {
            newItems = [
                ...state.order,
                { productId: product.id, name: product.name, quantity: 1, price: product.price }
            ]
        }

        const newTotal = newItems.reduce( (acc, item) => acc + item.quantity * item.price, 0 )

        return { order: newItems, total: newTotal }
    })},

    increaseQuantity:(id)=> {
        set((state)=> ({
            order: state.order.map(item => item.productId === id?{
                ...item, 
                quantity: item.quantity + 1, 
                total: item.price * (item.quantity + 1)
            }:item)
        }))
    },

    decreaseQuantity:(id)=> {
        set((state)=> ({
            order: state.order.map(item => item.productId === id?{
                ...item, 
                quantity: item.quantity - 1, 
                total: item.price * (item.quantity - 1)
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