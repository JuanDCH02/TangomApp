import { OrderStore } from "../../store/OrderStore"
import { OrderItemCard } from "./OrderItemCard"


export const OrderPanel = () => {

    const {order, total} = OrderStore()


    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-51">

            <div className="my-10 p-8 max-h-150 w-[60%] mx-auto shadow-lg bg-blue-100 space-y-3 rounded-2xl scroll-y-auto">
                <h2 className="text-center my-2 text-2xl text-slate-500 font-bold">Crea tu Orden</h2>
                <p className="text-center" >Aquí se mostrarán los productos agregados a la orden.</p>
                <div className="space-y-1 ">
                    {order.map(item => (
                        <OrderItemCard key={item.productId} {...item} />
                    ))}

                    <p className="italic font-medium mt-2">Total: {total.toFixed(2)}</p>
                </div>

                <button className=" my-3 p-2 w-full bg-blue-500 text-white text-xl font-black 
                    hover:cursor-pointer rounded-2xl"
                    >Solicitar Cotización
                </button>

            </div>

        </div>
    )
}
