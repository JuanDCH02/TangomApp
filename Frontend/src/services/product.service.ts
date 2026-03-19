
import { isAxiosError } from "axios";
import { api } from "../lib";
import { ProductListSchema, ProductSchema } from "../schemas/product.schema";
import type { ProductFormData } from "../types";



export const getAllProducts = async()=> {
    try {
        const {data} = await api('/products')
        const res = ProductListSchema.safeParse(data)
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

export const getProductById = async(id: number)=> {
    try {
        const {data} = await api(`/products/${id}`)
        const res = ProductSchema.safeParse(data)
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

export const createProduct= async(formData : ProductFormData) => {
    try {
        const {data} = await api.post<string>('/products', formData)
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export const editProduct= async({formData, id}:{formData: ProductFormData,id: number}) => {
    try {
        const {data} = await api.put<string>(`/products/${id}`, formData)
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}