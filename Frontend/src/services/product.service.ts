import { isAxiosError } from "axios";
import { api } from "../lib";
import { DashboardProductSchema } from "../schemas/product.schema";
import type { CreateProductInput } from "../types";



export const getAllProducts = async()=> {
    try {
        const {data} = await api('/products')
        const res = DashboardProductSchema.safeParse(data)
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


export const createProduct= async(formData : CreateProductInput) => {
    try {
        const {data} = await api.post<string>('/products', formData)
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}