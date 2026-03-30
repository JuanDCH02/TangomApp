import { useQuery } from "@tanstack/react-query"
import { getOrderNotes } from "../../services/order.service"
import { useParams } from "react-router-dom"
import { AddNoteForm } from "../forms/AddNoteForm"
import { formatDate } from "../../utils"


export const OrderNotes = () => {

    const {id} = useParams()

    const { data, isLoading, error } = useQuery({
        queryKey: ['OrderNotes', Number(id)],
        queryFn:()=> getOrderNotes(Number(id))
    })

    if (isLoading) return <div className="flex items-center justify-center min-h-screen">Cargando...</div>
    if (error) return <div className="flex items-center justify-center min-h-screen">Error: {error.message}</div>
    if (!data) return <div className="flex items-center justify-center min-h-screen">No hay notas</div>

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-51">
            <div className="my-10 p-8 w-[60%] mx-auto shadow-lg bg-blue-100 space-y-3 rounded-2xl">

                <h2 className="text-center text-2xl text-slate-500 font-bold"> Notas de la Orden #{id} </h2>
                <section>
                    {data.length === 0 ? (
                        <p className="text-center italic">No hay notas para esta orden</p>
                    ) : (
                        <ul className="space-y-2 my-2 max-h-70 overflow-y-scroll">
                            {data.map((note) => (
                                <li key={note.id} className="bg-white p-2 rounded-lg shadow-sm">
                                    <p className="text-slate-700">{note.content}</p>
                                    <p className="text-sm text-slate-400 mt-2">Creado: {formatDate(note.createdAt)}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
                <AddNoteForm/>

            </div>

        </div>
    )
}
