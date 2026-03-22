import { useQuery } from "@tanstack/react-query"
import { getAllProducts } from "../services/product.service"
import { AdminProductCard } from "../components/cards/AdminProductCard"


export const AdminPage = () => {

    const {data, isLoading, error} = useQuery({
        queryKey:['productos'],
        queryFn:getAllProducts
    })


    if(data)return (
        
        <>
            {isLoading && (
                <h4 className="text-4xl text-slate-600 font-semibold">Cargando</h4>
            )}

            <div className="space-y-3 ">
                {data.map((p) => (
                    <AdminProductCard key={p.id} producto={p}/>

                ))}

            </div>

        
        </>
    )
}
