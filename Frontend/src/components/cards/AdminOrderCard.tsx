
import { Link } from "react-router-dom"
import type { Order } from "../../types"
import { formatDate } from "../../utils"



interface OrderCard {
    order : Order
}

export const AdminOrderCard = ({order} : OrderCard) => {

    return (
        <div className="flex justify-between w-2/3 mx-auto items-center p-3 border border-slate-300 rounded-lg hover:shadow-md hover:bg-slate-100
            hover:cursor-pointer">
            
            <div>

                <h3 className="font-semibold text-xl capitalize hover:underline hover:font-bold" 
                    >Orden de: {order.email} 
                </h3>
                <div className="flex gap-5">
                    <p> #{order.id} </p>
                    <p> precio: ${`${order.total.toFixed(2)}`} </p>
                    <p> creada el: { formatDate(order.createdAt) } </p>
                </div>

            </div>

            <div className=" flex gap-5 font-semibold">
                <Link className="border border-blue-500 p-2 rounded-xl bg-blue-200" to={`/admin/orden/${order.id}`}
                    >Ver Detalle
                </Link>
                <Link className="border border-green-700 p-2 rounded-xl bg-green-200" to={`/admin/orden/${order.id}/notas`}
                    >Ver Notas
                </Link>
                
            </div>
        </div>
    )
}
