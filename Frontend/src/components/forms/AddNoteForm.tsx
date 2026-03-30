import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { createOrderNote } from "../../services/order.service"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import type { OrderNoteFormData } from "../../types"
import { LuNotepadText } from "react-icons/lu";


export const AddNoteForm = () => {

    const {id} = useParams()
    const queryClient = useQueryClient()

    const {register, reset, handleSubmit, formState:{errors}} = useForm<OrderNoteFormData>()
    const {mutate} = useMutation({
        mutationFn: createOrderNote,
        onError(error){
            toast.error(error.message, {icon: <LuNotepadText className="text-lg text-red-500"/>})
        },
        onSuccess(data){
            toast.success(data, {icon: <LuNotepadText className="text-lg text-green-500"/>})
            reset()
            queryClient.invalidateQueries({queryKey: ['OrderNotes', Number(id)]})
        }
    })
    const onSubmit = (data : OrderNoteFormData) => {
        mutate({id: Number(id), content: data.content})
    }

    return (
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="content">Agrega una nota:</label>
            <input type="text" className="my-2 bg-white p-2 border rounded-lg w-full"
                placeholder="Esperando confirmación..."
                {...register ('content', {required:true})}
            />
            {errors.content && <p className="text-red-400 font-semibold italic">El contenido es requerido</p>}

            <input type="submit" value={'Enviar'}
                className=" bg-blue-800 py-1.5 px-3 rounded-3xl mt-2 text-white font-semibold hover:cursor-pointer"    
            />

        </form>
    )
}
