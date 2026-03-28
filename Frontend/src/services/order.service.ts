
import { isAxiosError } from "axios";
import { api } from "../lib";
import { OrderSchema } from "../schemas/order.schema";
import type { OrderItem } from "../types";





export const getOrder = async()=> {
    try {
        const {data} = await api('/products')
        const res = OrderSchema.safeParse(data)
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

export const createOrder = async ({items, email} : { items: OrderItem[], email: string }) => {
    
     try {
        const {data} = await api.post<string>('/orders', {items, email})
        return data 
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}