
import { Link, Outlet } from 'react-router-dom'

export const AppLayout = () => {
    return (
        <>
        <div className='p-10 flex flex-col md:flex-row justify-evenly items-center bg-blue-700 '>
            <Link to={''} className='text-5xl text-white font-bold'>TangomApp</Link>
            <nav className=' flex gap-4 mt-3 md:mt-1 '>
                <Link to={'/contacto'} 
                    className='text-white font-medium ' 
                    >Contacto
                </Link>
                <Link to={'/sobre-nosotros'} 
                    className='text-white font-medium ' 
                    >Sobre nosotros
                </Link>
                <Link to={'/donde-estamos'} 
                    className='text-white font-medium ' 
                    >Donde estamos
                </Link>
            </nav>
        </div>

        <main className='p-10'>
            <Outlet></Outlet>

        </main>

        <footer className='p-5  flex w-full justify-evenly bg-blue-900 fixed bottom-0 text-white'>
            footer de la aplicacion
        </footer>

        </>
        
    )
}
