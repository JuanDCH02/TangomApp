
import type { Product, Order } from "../../types"



interface ProductCard {
    producto : Product
    agregarOrden: (product: Product) => void
}

export const DashboardProductCard = ( {producto, agregarOrden} : ProductCard ) => {

    return (
        <div className="h-100 w-75 mx-auto items-center p-3 border space-y-3 bg-blue-100 border-slate-300 rounded-lg hover:shadow-md
            hover:cursor-pointer">
            
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

            <button onClick={() => agregarOrden( producto )}
                className="text-blue-500 font-bold border rounded p-2 hover:text-blue-700">
                Agregar a orden
            </button>

        </div>
)}
