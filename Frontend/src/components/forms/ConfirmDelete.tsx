import { useMutation } from "@tanstack/react-query"
import { deleteProduct } from "../../services/product.service"
import { useParams } from "react-router-dom"





export const ConfirmDelete = () => {

    const {id} = useParams()
    
    const { mutate } = useMutation({
            mutationFn: deleteProduct,
            onError(error){
                console.log(error)
            },
            onSuccess(data){
                console.log(data)
                window.history.back()
            }
    
        })
    
    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-51">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Confirmar Eliminación</h3>
                <p>¿Estás seguro de que quieres eliminar este producto?</p>
                <div className="flex justify-end gap-4 mt-6">
                    <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400
                    hover:cursor-pointer"
                    onClick={()=> window.history.back()}
                        >Cancelar
                    </button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600
                    hover:cursor-pointer"
                    onClick={()=> mutate(Number(id))}
                        >Eliminar
                    </button>
                </div>
            </div>
        </div>
    )
}
