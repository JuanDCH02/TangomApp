
import { isAxiosError } from "axios";
import { api } from "../lib";
import { OrderListSchema, OrderSchema, OrderNoteSchema, OrderNoteListSchema } from "../schemas/order.schema";
import type { OrderItem } from "../types";



export const getAllOrders = async(status: string)=> {
    try {
        const url = status ? `/orders?status=${status}` : `/orders`
        const {data} = await api(url)
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

export const getOrderNotes = async(id: number)=> {
    try {
        const {data} = await api(`/orders/${id}/notes`)
        const res = OrderNoteListSchema.safeParse(data)
        if(!res.success){
            console.error(res.error); 
            throw new Error("Error de validación de datos");   
        } 
        return res.data


    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
        throw new Error("Error inesperado al obtener las notas")
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

export const createOrderNote = async ({id, content} : { id: number, content: string }) => {
    
    try {
        const {data} = await api.post<string>(`/orders/${id}/notes`, {content})
        return data 
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export const changeStatusOrder = async ({id, status} : { id: number, status: string }) => {
    try {
            const {data} = await api.patch<string>(`/orders/${id}/status`, {status})
            return data 

        } catch (error) {
            if(isAxiosError(error) && error.response){
                throw new Error(error.response.data.error)
            }
    }
}