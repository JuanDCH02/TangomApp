import { useQuery } from '@tanstack/react-query'
import { getAllOrders } from '../../services/order.service'
import { AdminOrderCard } from '../cards/AdminOrderCard'

export const OrdersTable = ({ status }: {status  : string} ) => {
    const {data, isLoading} = useQuery({
        queryKey:['ordenes', status],
        queryFn:()=> getAllOrders(status)
    })
    if(data)return (
        <>
            {isLoading && (
                <p className='text-center text-2xl text-slate-400 font-black'>Cargando ordenes...</p>
            )} 
            <div className="space-y-3 ">
                { data.map((p) => ( <AdminOrderCard key={p.id} order={p}/> ))}
            </div>

            {data?.length===0 && (
                <p className='text-center text-2xl text-slate-400 font-black'>
                    No hay ordenes para mostrar...
                </p>
            )}
        
        </>
    )
}
