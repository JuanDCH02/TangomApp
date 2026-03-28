import { useMutation } from "@tanstack/react-query"
import { OrderStore } from "../../store/OrderStore"
import { OrderItemCard } from "./OrderItemCard"
import { createOrder } from "../../services/order.service"
import { toast } from "sonner"
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { HiOutlineDocumentMinus } from "react-icons/hi2";


export const OrderPanel = () => {

    const {order, total, clearOrder} = OrderStore()

    const {mutate} = useMutation({
        mutationFn: createOrder,
        onError(error){
            toast.error(error.message, {
                icon:<HiOutlineDocumentMinus className='text-lg text-red-700' />
            })
        },
        onSuccess(data){
            toast.success(data, {
                icon:<HiOutlineDocumentPlus className='text-lg text-green-700' />
            })
            clearOrder()
            window.history.back()
        }
    })

    const handleSubmit = ()=> {
        const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement
        const email = emailInput.value.trim()
        mutate({items: order, email})
    }

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-51">

            <div className="my-10 p-8 max-h-150 w-[60%] mx-auto shadow-lg bg-blue-100 space-y-3 rounded-2xl scroll-y-auto">
                <h2 className="text-center my-2 text-2xl text-slate-500 font-bold">Crea tu Orden</h2>
                <p className="text-center" >Aquí se mostrarán los productos agregados a la orden.</p>
                <div className="space-y-1 ">
                    {order.map(item => (
                        <OrderItemCard key={item.productId} {...item} />
                    ))}

                    <p className="italic font-medium mt-2">Subtotal: {total.toFixed(2)}</p>
                </div>

                <input type="email" placeholder="Email al cual contactarte" required name="email"
                    className="p-1.5 rounded w-full bg-white focus:outline-blue-500"
                />

                <button className=" my-3 p-2 w-full bg-blue-500 text-white text-xl font-black 
                    hover:cursor-pointer rounded-2xl" disabled={order.length === 0}
                    onClick={() => handleSubmit()}
                    >Solicitar Cotización
                </button>

            </div>

        </div>
    )
}
