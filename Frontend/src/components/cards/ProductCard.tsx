import type { DashboardProduct } from "../../types"



interface ProductCard {
    producto : DashboardProduct
}

export const ProductCard = ({producto} : ProductCard) => {
    return (
        <div className="flex justify-between p-3 border border-slate-200 rounded-lg">
            
            <div>
                <h3 className="font-semibold text-xl capitalize"> {producto.name} </h3>
                <div className="flex gap-5">
                    <p> precio: ${`${producto.price}`} </p>
                    <p> stock: {producto.stock} </p>
                    <p> categoria: {producto.categoryId} </p>
                </div>

            </div>

            <div className="flex gap-5">
                <button>editar</button>
                <button>eliminar</button>
            </div>
        </div>
    )
}
