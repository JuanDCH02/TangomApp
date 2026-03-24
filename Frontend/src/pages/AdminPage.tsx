import { useQuery } from "@tanstack/react-query"
import { getAllProducts } from "../services/product.service"
import { AdminProductCard } from "../components/cards/AdminProductCard"
import { Link } from "react-router-dom"


export const AdminPage = () => {

    const {data, isLoading} = useQuery({
        queryKey:['productos'],
        queryFn:getAllProducts
    })


    if(data)return (
        
        <>
            {isLoading && (
                <h4 className="text-4xl text-slate-600 font-semibold">Cargando</h4>
            )}

            <section className="flex justify-center gap-10 my-10 mx-auto ">
                <Link to={'/admin/crear-producto'}
                    className="p-4 border border-slate-300 shadow-md rounded-lg text-xl font-semibold
                    hover:bg-blue-300 transition-all transition-duration-900 "
                    >Agregar Producto
                </Link>
                <Link to={'/admin/ordenes'}
                    className="p-4 border border-slate-300 shadow-md rounded-lg text-xl font-semibold
                    hover:bg-blue-300 transition-all transition-duration-900 "
                    >Ver Ordenes
                </Link>
                <Link to={'/admin/crear-orden'}
                    className="p-4 border border-slate-300 shadow-md rounded-lg text-xl font-semibold
                    hover:bg-blue-300 transition-all transition-duration-900 "
                    >Nueva Orden
                </Link>
            </section>

            <div className="space-y-3 ">
                {data.map((p) => ( <AdminProductCard key={p.id} producto={p}/> ))}
            </div>

        
        </>
    )
}
