import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ProductForm } from "../../components/forms/ProductForm"
import { useNavigate, useParams } from "react-router-dom"
import { editProduct, getProductById } from "../../services/product.service"
import type { ProductFormData } from "../../types"


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
            console.log(error)
        },
        onSuccess(data){
            console.log(data)
            nav('/admin/productos')
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
