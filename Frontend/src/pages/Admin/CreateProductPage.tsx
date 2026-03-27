import { useMutation } from "@tanstack/react-query"
import { ProductForm } from "../../components/forms/ProductForm"
import { createProduct } from "../../services/product.service"
import type { ProductFormData } from "../../types"
import { toast } from "sonner"


export const CreateProductPage = () => {


    const { mutate } = useMutation({
        mutationFn: createProduct,
        onError(error){
            toast.error(error.message)
        },
        onSuccess(data){
            toast.success(data)
            window.history.back()
        }
    }) 

    const onSubmit = (data : ProductFormData) => {
        mutate(data)
    }


    return (
        <>
        
            <ProductForm onSubmit={onSubmit} text="Crea un producto Nuevo" />
        </>
    )
}
