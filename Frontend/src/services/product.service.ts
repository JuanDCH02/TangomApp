import { isAxiosError } from "axios";
import { api } from "../lib";
import { DashboardProductSchema, ProductSchema } from "../schemas/product.schema";



export const getAllProducts = async()=> {
    try {
        const {data} = await api('products')
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