import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ProductForm } from "../../components/forms/ProductForm"
import { useNavigate, useParams } from "react-router-dom"
import { editProduct, getProductById } from "../../services/product.service"
import type { ProductFormData } from "../../types"
import { toast } from "sonner"


export const EditProductPage = () => {

    const {id} = useParams()
    const queryClient = useQueryClient()
    const nav = useNavigate()

    const { data } = useQuery({
        queryKey: ['ProductoEdit', id],
        queryFn:()=> getProductById(Number(id))
    })  
    const { mutate } = useMutation({
        mutationFn: editProduct,
        onError(error){
            toast.error(error.message)
        },
        onSuccess(data){
            toast.success(data)
            window.history.back()
            nav('/admin/')
            queryClient.invalidateQueries({queryKey:['productos']})
            queryClient.invalidateQueries({queryKey:['ProductoEdit', id]})
        }   
    })

    const onSubmit = (formData : ProductFormData) => {
        mutate({ formData: { ...formData }, id: Number(id) })
    }



    return (
        <>
            
            <ProductForm defaultValues={data} onSubmit={onSubmit} text="Edita un producto" />
        
        </>
    )
}
