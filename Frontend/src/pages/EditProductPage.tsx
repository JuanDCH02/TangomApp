import { useMutation, useQuery } from "@tanstack/react-query"
import { ProductForm } from "../components/forms/ProductForm"
import { useParams } from "react-router-dom"
import { editProduct, getProductById } from "../services/product.service"
import type { ProductFormData } from "../types"


export const EditProductPage = () => {

    const {id} = useParams()
    
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
