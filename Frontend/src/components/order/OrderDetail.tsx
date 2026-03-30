import { useQuery } from "@tanstack/react-query"
import { getOrderById } from "../../services/order.service"
import { useParams } from "react-router-dom"


export const OrderDetail = () => {

    const {id} = useParams()

    const { data, isLoading } = useQuery({
        queryKey: ['DetalleOrden', Number(id)],
        queryFn:()=> getOrderById(Number(id))
    })

    if (isLoading) return <div className="flex items-center justify-center min-h-screen">Cargando...</div>
    if (!data) return null

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-51">
            <div className="my-10 p-8 w-[60%] mx-auto shadow-lg bg-blue-100 space-y-3 rounded-2xl">

                <h2 className="text-center text-2xl text-slate-500 font-bold"> Detalle de la Orden </h2>
                <section>
                    <p className="text-center italic">Items de la orden: {data.items.length}</p>
                    <ul className="space-y-2 my-2 max-h-70 overflow-y-scroll">
                        {data.items.map((item) => (
                            <li key={item.id} className="text-slate-600 text-lg text-center font-semibold">
                                {item.product.name} - Cantidad: {item.quantity} - Precio: ${item.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <p className="text-center ">Total Estimado: ${data.total.toFixed(2)}</p>
                </section>

            </div>

        </div>
    )
}
