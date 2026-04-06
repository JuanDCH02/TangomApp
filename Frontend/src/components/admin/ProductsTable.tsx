import { useQuery } from '@tanstack/react-query'
import { getAllProducts } from '../../services/product.service'
import { AdminProductCard } from '../cards/AdminProductCard'

export const ProductsTable = ({ categoryId }: { categoryId: number }) => {
    const {data, isLoading} = useQuery({
        queryKey:['productos', categoryId],
        queryFn:()=> getAllProducts(categoryId)
    })
    
    return (
        <>
        
            {isLoading && (
                <p className='text-center text-2xl text-slate-400 font-black'>Cargando productos...</p>
            )} 
            <div className="space-y-3 ">
                {data?.map((p) => ( <AdminProductCard key={p.id} producto={p}/> ))}
            </div>

            {data?.length===0 && (
                <p className='text-center text-2xl text-slate-400 font-black'>
                    No hay productos para mostrar...
                </p>
            )}
        
        </>
    )
}
