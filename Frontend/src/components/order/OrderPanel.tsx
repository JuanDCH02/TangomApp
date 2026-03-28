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
        }
    })

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string

        try {
            // Crear la orden primero
             mutate({items: order, email})

            // Si la orden se creó exitosamente, enviar email con Formspree
            const formspreeData = new FormData()
            formspreeData.append('email:', email)
            formspreeData.append('items de la orden:', JSON.stringify(order.map(item => `${item.name} x${item.quantity}`).join(', ')))
            
             const response = await fetch('https://formspree.io/f/xdkekwyy', {
                 method: 'POST',
                 body: formspreeData,
                 headers: {
                     'Accept': 'application/json'
                 }
             })

             if (response.ok) {
                toast.success('Cotización creada', {
                   description: 'Pronto nos contactaremos contigo para darte más detalles',
                   icon:<HiOutlineDocumentPlus className='text-lg text-green-700' />
                })
             } else {
                toast.error('Error al enviar la cotización', {
                    icon:<HiOutlineDocumentMinus className='text-lg text-red-700' />
                })
             }

            clearOrder()
            window.history.back()
        } catch (error) {
            // Error ya manejado por onError del mutation
        }
    }

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-51">

            <form onSubmit={handleSubmit} className="my-10 p-8 max-h-150 w-[60%] mx-auto shadow-lg bg-blue-100 space-y-3 rounded-2xl scroll-y-auto">
                <h2 className="text-center my-2 text-2xl text-slate-500 font-bold">Crea tu Orden</h2>
                <p className="text-center" >Aquí se mostrarán los productos agregados a la orden.</p>
                <div className="space-y-1 ">
                    {order.map(item => (
                        <OrderItemCard key={item.productId} {...item} />
                    ))}

                    <p className="italic font-medium mt-2">Subtotal Estimado: {total.toFixed(2)}</p>
                </div>

                <input type="email" name="email" placeholder="Email al cual contactarte" required
                    className="p-1.5 rounded w-full bg-white focus:outline-blue-500"
                />

                <button type="submit" className={`my-3 p-2 w-full text-xl font-black rounded-2xl ${
                    order.length === 0 
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                        : 'bg-blue-500 text-white hover:cursor-pointer hover:bg-blue-600'
                }`} disabled={order.length === 0}
                    >Solicitar Cotización
                </button>

            </form>

        </div>
    )
}
