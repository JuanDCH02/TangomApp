
import { Link, useSearchParams } from "react-router-dom"
import { ProductsTable } from "../../components/admin/ProductsTable"
import { OrdersTable } from "../../components/admin/OrdersTable"


export const AdminPage = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const view = searchParams.get('view') || 'productos'

    const toggleView = () => {
      setSearchParams({ view: view === 'productos' ? 'ordenes' : 'productos' })
    }

    return (
             
        <>

            <section className="flex justify-center gap-10 my-10 mx-auto ">
                <Link to={'/admin/crear-producto'}
                    className="p-4 border border-slate-300 shadow-md rounded-lg text-xl font-semibold
                    hover:bg-blue-300 transition-all transition-duration-900 "
                    >Agregar Producto
                </Link>
                <button onClick={toggleView}
                    className="p-4 border border-slate-300 shadow-md rounded-lg text-xl font-semibold
                    hover:bg-blue-300 transition-all transition-duration-900 hover:cursor-pointer"
                    >{  view === 'productos' ? 'Ver Ordenes' : 'Ver Productos'}
                </button>
            </section>

            {view === 'productos' ? <ProductsTable /> : <OrdersTable />}

        
        </>
    )
}
