import { useMutation, useQuery } from "@tanstack/react-query"
import { changeStatusOrder, getOrderById } from "../../services/order.service"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { useState } from "react"


export const OrderDetail = () => {

    const {id} = useParams()

    const [status, setStatus] = useState<string>('')

    const { data, isLoading } = useQuery({
        queryKey: ['DetalleOrden', Number(id)],
        queryFn:()=> getOrderById(Number(id))
    })

    const {mutate} = useMutation({
        mutationFn: changeStatusOrder,
        onError(error){
            toast.error(error.message)
        },
        onSuccess(data){
            toast.success(data)
        }
    })

    

    if (isLoading) return <div className="flex items-center justify-center min-h-screen">Cargando...</div>
    if (!data) return null

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-51">
            <div className="my-10 p-8 w-[60%] mx-auto shadow-lg bg-blue-100 space-y-3 rounded-2xl">

                <h2 className="text-center text-2xl text-slate-500 font-bold"> Detalle de la Orden </h2>
                <section>
                    <p className="text-center italic"
                        >Items de la orden: {data.items.length} - estado: {data.status} 
                    </p>
                    <ul className="space-y-2 my-2 max-h-70 overflow-y-scroll">
                        {data.items.map((item) => (
                            <li key={item.id} className="text-slate-600 text-lg text-center font-semibold">
                                {item.product.name} - Cantidad: {item.quantity} - Precio: ${item.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <p className="text-center ">Total Estimado: ${data.total.toFixed(2)}</p>
                    <select
                    onChange={(e)=> mutate( {id: Number(id), status: e.target.value} )}
                        className="mx-auto bg-white p-4 border border-slate-300 shadow-md rounded-lg text-xl font-semibold">
                        <option value="PENDING">pendiente</option>
                        <option value="WAITING_PAYMENT">espera de pago</option>
                        <option value="PAID">pagado</option>
                        <option value="COMPLETED">completado</option>D
                        <option value="CANCELLED">cancelado</option>
                    </select>
                </section>

            </div>

        </div>
    )
}
