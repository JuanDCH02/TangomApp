import { Link, useNavigate } from "react-router-dom"
import type { DashboardProduct, Product } from "../../types"
import { formatDate } from "../../utils"



interface ProductCard {
    producto : Product
}

export const ProductCard = ({producto} : ProductCard) => {

    const nav = useNavigate()

    const GoEditPage = ()=> {
        nav(`/products/${producto.id}`)
    }

    return (
        <div className="flex justify-between items-center p-3 border border-slate-300 rounded-lg hover:shadow-md hover:bg-slate-100
            hover:cursor-pointer">
            
            <div>
                <h3 className="font-semibold text-xl capitalize hover:underline hover:font-bold" onClick={GoEditPage}
                    > {producto.name} 
                </h3>
                <div className="flex gap-5">
                    <p> precio: ${`${producto.price}`} </p>
                    <p> stock: {producto.stock} </p>
                    <p> categoria: {producto.categoryId} </p>
                    <p> actualizado: { formatDate(producto.updatedAt) } </p>
                </div>

            </div>

            <div className=" flex gap-5 font-semibold">
                <Link className="border border-blue-500 p-2 rounded-xl bg-blue-200" to={`/editar-producto/${producto.id}`}
                    >editar
                </Link>
                <Link className="border border-red-500 p-2 rounded-xl bg-red-200" to={`/editar-producto/${producto.id}`}
                    >eliminar
                </Link>
            </div>
        </div>
    )
}
