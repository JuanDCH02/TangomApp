import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '../../services/product.service'
import { AdminProductCard } from '../cards/AdminProductCard'

export const ProductsTable = () => {
    const {data, isLoading} = useQuery({
        queryKey:['productos'],
        queryFn:getAllProducts
    })
    return (
        <>
            {isLoading && (
                <p className='text-center text-2xl text-slate-400 font-black'>Cargando productos...</p>
            )} 
            <div className="space-y-3 ">
                {data?.map((p) => ( <AdminProductCard key={p.id} producto={p}/> ))}
            </div>
        
        </>
    )
}
