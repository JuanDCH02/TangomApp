import { useQuery } from "@tanstack/react-query"
import { getAllProducts } from "../services/product.service"
import { DashboardProductCard } from "../components/cards/DashboardProductCard"
import type { Order, Product } from "../types"
import { useEffect, useState } from "react"



export const HomePage = () => {
    

    
    const {data, isLoading} = useQuery({
        queryKey:['productos'],
        queryFn:getAllProducts
    })

    const [order, setOrder] = useState<Order>({
        items: [],
        total: 0
    })
    
    const orderCart = useEffect(()=> {
        localStorage.setItem('orderCart', JSON.stringify(order))
    }, [order])

    const addToOrder = (product: Product) => {
    setOrder(prev => {
        const existing = prev.items.find(i => i.productId === product.id)

        let newItems

        if (existing) {
            newItems = prev.items.map(i => i.productId === product.id? {...i, quantity: i.quantity+1 }: i
            )
        } else {
            newItems = [
                ...prev.items,
                {
                    productId: product.id,
                    quantity: 1,
                    price: product.price
                }
            ]
        }

        const newTotal = newItems.reduce(
            (acc, item) => acc + item.quantity * item.price,
            0
        )

        return {
            ...prev,
            items: newItems,
            total: newTotal
        }
    })
}


    if(data)return (
        
        <>
            {isLoading && (
                <h4 className="text-4xl text-slate-600 font-semibold">Cargando</h4>
            )}


            <div className="w-4/5 mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
                {data.map((p) => (
                    <DashboardProductCard key={p.id} producto={p} agregarOrden={addToOrder} />

                ))}

            </div>

        
        </>
    )
}
