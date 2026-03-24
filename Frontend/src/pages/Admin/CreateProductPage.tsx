import { useMutation } from "@tanstack/react-query"
import { ProductForm } from "../../components/forms/ProductForm"
import { createProduct } from "../../services/product.service"
import type { ProductFormData } from "../../types"


export const CreateProductPage = () => {


    const { mutate } = useMutation({
        mutationFn: createProduct,
        onError(error){
            console.log(error)
        },
        onSuccess(data){
            console.log(data)
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
