import { OrderStore } from "../../store/OrderStore"
import type { OrderItem } from "../../types"


export const OrderItemCard = (item : OrderItem) => {

    const { increaseQuantity, decreaseQuantity } = OrderStore()


    return (
        <div className="flex justify-around bg-white p-1.5 rounded w-full">
            <p className="font-semibold"> Producto: {item.name}  </p>
            <p className="font-black text-lg bg-blue-300 rounded-4xl px-2 hover:cursor-pointer" onClick={()=> increaseQuantity(item.productId)}
                >+
            </p>
            <p className="font-semibold">Cantidad: {item.quantity}</p>
            <p className="font-black text-lg bg-blue-300 rounded-4xl px-2 hover:cursor-pointer" onClick={()=> decreaseQuantity(item.productId)}
                >-
            </p>
        </div>
    )
}
