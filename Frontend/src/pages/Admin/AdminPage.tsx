
import { Link, useSearchParams } from "react-router-dom"
import { ProductsTable } from "../../components/admin/ProductsTable"
import { OrdersTable } from "../../components/admin/OrdersTable"
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../../services/category.service"
import { useState } from "react"


export const AdminPage = () => {

    const {data} = useQuery({
        queryKey: ['categorias'],
        queryFn: getCategories
    })

    const [searchParams, setSearchParams] = useSearchParams()
    const [status, setStatus] = useState<string>('')
    const [category, setCategory] = useState<string | ''>('')

    const view = searchParams.get('view') || 'productos'

    const toggleView = () => setSearchParams({ view: view === 'productos' ? 'ordenes' : 'productos' })
    

    return (
             
        <>

            <section className="flex justify-center gap-10 my-10 mx-auto ">
                <Link to={'/admin/crear-producto'}
                    className="p-4 border border-slate-300 shadow-md rounded-lg text-xl font-semibold
                    hover:bg-blue-300 transition-all transition-duration-900 "
                    >Agregar Producto
                </Link>
                
                {  view === 'productos' ? 
                    <select className="p-4 border border-slate-300 shadow-md rounded-lg text-xl font-semibold"
                        value={category} onChange={(e)=> setCategory(e.target.value)} >
                        <option  
                        value="" defaultChecked>Categorias</option>
                        {data?.map((category) => 
                            <option 
                                value={category.id} 
                                className="p-2 border border-slate-300 rounded font-medium">
                                {category.name}
                            </option> 
                        )}
                    </select> 
                    : 
                    <select className="p-4 border border-slate-300 shadow-md rounded-lg text-xl font-semibold"
                        value={status} onChange={(e)=> setStatus(e.target.value)}>
                        <option defaultChecked value="PENDING">pendiente</option>
                        <option value="WAITING_PAYMENT">espera de pago</option>
                        <option value="PAID">pagado</option>
                        <option value="COMPLETED">completado</option>
                        <option value="CANCELLED">cancelado</option>
                    </select>
                }
                
                <button onClick={toggleView}
                    className="p-4 border border-slate-300 shadow-md rounded-lg text-xl font-semibold
                    hover:bg-blue-300 transition-all transition-duration-900 hover:cursor-pointer"
                    >{  view === 'productos' ? 'Ver Ordenes' : 'Ver Productos'}
                </button>
                
            </section>

            {view === 'productos' ? <ProductsTable categoryId={Number(category)} /> : <OrdersTable status={status} />}

        
        </>
    )
}
