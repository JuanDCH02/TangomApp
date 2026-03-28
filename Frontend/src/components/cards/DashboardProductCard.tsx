
import { OrderStore } from "../../store/OrderStore"
import type { Product } from "../../types"



interface ProductCard {
    producto : Product
}

export const DashboardProductCard = ( {producto} : ProductCard ) => {

    const {addToOrder} = OrderStore()

    return (
        <div className="h-100 w-75 mx-auto items-center p-3 border space-y-3 bg-blue-100 border-slate-300 rounded-lg hover:shadow-md">
            
            <div>
                <img src="../../../public/poly v.webp" className="h-50 rounded" alt="producto-img" />

            </div>
            
            <div>

                <h3 className="font-semibold text-xl capitalize my-2" 
                    > {producto.name} 
                </h3>
                <ul>
                    <li> precio: ${`${producto.price}`} </li>
                    <li> stock: {producto.stock} </li>
                    <li> categoria: {producto.categoryId} </li>
                </ul>

            </div>

            <button onClick={() => addToOrder( producto )}
                className="p-2.5 text-blue-700 font-bold rounded hover:cursor-pointer hover:bg-blue-700 hover:text-white transition-all "
                >Agregar a orden
            </button>

        </div>
)}
