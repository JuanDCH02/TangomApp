import { useQuery } from "@tanstack/react-query"
import { getAllProducts } from "../services/product.service"
import { ProductCard } from "../components/cards/ProductCard"


export const HomePage = () => {

    const {data, isLoading, error} = useQuery({
        queryKey:['productos'],
        queryFn:getAllProducts
    })


    if(data)return (
        
        <>
            {isLoading && (
                <h4 className="text-4xl text-slate-600 font-semibold">Cargando</h4>
            )}

            <div className="space-y-3">
                {data.map((p) => (
                    <ProductCard key={p.id} producto={p}/>

                ))}

            </div>

        
        </>
    )
}
