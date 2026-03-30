import { useQuery } from '@tanstack/react-query'
import { getAllOrders } from '../../services/order.service'
import { AdminOrderCard } from '../cards/AdminOrderCard'

export const OrdersTable = () => {
    const {data, isLoading} = useQuery({
        queryKey:['ordenes'],
        queryFn:getAllOrders
    })
    if(data)return (
        <>
            {isLoading && (
                <p className='text-center text-2xl text-slate-400 font-black'>Cargando ordenes...</p>
            )} 
            <div className="space-y-3 ">
                { data.map((p) => ( <AdminOrderCard key={p.id} order={p}/> ))}
            </div>
        
        </>
    )
}
