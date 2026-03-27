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



    if(data)return (
        
        <>
            {isLoading && (
                <h4 className="text-4xl text-slate-600 font-semibold">Cargando</h4>
            )}


            <div className="w-4/5 mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
                {data.map((p) => (
                    <DashboardProductCard key={p.id} producto={p} />

                ))}

            </div>

        
        </>
    )
}
