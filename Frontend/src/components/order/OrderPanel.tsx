

export const OrderPanel = () => {

    const orderCart = localStorage.getItem('orderCart')
    


    {console.log(orderCart)}
    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-51">

            <div className="my-10 p-8 max-h-150 w-[60%] mx-auto shadow-lg bg-blue-100 space-y-3 rounded-2xl scroll-y-auto">
                <h2 className="text-center my-2 text-2xl text-slate-500 font-bold">Crea tu Orden</h2>
                <p className="text-center" >Aquí se mostrarán los productos agregados a la orden.</p>

                <button className="  my-3 p-2 w-full bg-blue-500 text-white text-xl font-black 
                    hover:cursor-pointer rounded-2xl"
                    >Solicitar Cotización
                </button>

            </div>

        </div>
    )
}
