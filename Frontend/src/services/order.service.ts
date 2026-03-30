
import { isAxiosError } from "axios";
import { api } from "../lib";
import { OrderListSchema, OrderSchema } from "../schemas/order.schema";
import type { OrderItem } from "../types";





export const getAllOrders = async()=> {
    try {
        const {data} = await api('/orders')
        const res = OrderListSchema.safeParse(data)
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

export const getOrderById = async(id: number)=> {
    try {
        const {data} = await api(`/orders/${id}`)
        console.log('Data from API:', data)
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
        throw new Error("Error inesperado al obtener la orden")
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