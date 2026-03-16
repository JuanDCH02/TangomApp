import { isAxiosError } from "axios";
import { api } from "../lib";
import { CategoriesSchema } from "../schemas/product.schema";




export const getCategories = async()=> {
    try {
        const {data} = await api('/category')
        const res = CategoriesSchema.safeParse(data)
        if(!res.success){
            console.error(res.error); 
            throw new Error("Error de validación de datos");   
        } 
        return res.data


    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}