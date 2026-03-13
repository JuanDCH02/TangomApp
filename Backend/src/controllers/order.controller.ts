
import { prisma } from "../lib/prisma";
import { Request, Response } from "express";


export class OrderController {

    static createOrder = async (req: Request, res: Response) => {
        try {
            const { items } = req.body;

            if (!Array.isArray(items) || items.length === 0) {
                return res.status(400).json({ error: 'la orden no puede estar vacia' });
            }

            // me traigo todos los productos de la db
            const productIds = items.map((i: { productId: number }) => Number(i.productId));
            const products = await prisma.product.findMany({ where:{ id: { in: productIds } }});
            if (products.length !== productIds.length) {
                return res.status(400).json({ error: 'uno o más productos no encontrados' });
            }

            // tomo el total y preparo los datos para crear los order items
            let total = 0;
            const orderItemsData = items.map((i: { productId: number; quantity: number }) => {
                const product = products.find(p => p.id === Number(i.productId))!;
                const quantity = Number(i.quantity);
                const price = product.price;
                total += price * quantity;
                return {
                    productId: product.id,
                    quantity,
                    price,
                };
            });

            const order = await prisma.order.create({
                data: {
                    total,
                    items: {
                        create: orderItemsData,
                    },
                },
                include: {
                    items: true,
                },
            });

            return res.status(201).json(order);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'No se puedo crear la órden' });
        }
    };
    
    static changeStatusOrder = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const { status } = req.body;
            if (!status) {
                return res.status(400).json({ error: 'El estado es necesario' });
            }
            const order = await prisma.order.update({
                where: { id },
                data: { status },
            });
            return res.json(order);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'No se puedo actualizar el estado' });
        }
    };

    static getAllOrders = async (req: Request, res: Response) => {
        try {
            const orders = await prisma.order.findMany({
                include: {
                    items: true,
                },
            });
            return res.json(orders);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'No se pudieron obtener las órdenes' });
        }
    };

    static getOrderById = async (req: Request, res: Response) => {
        try {
            const order = await prisma.order.findUnique({
                where: { id: Number(req.params.id) },
                include: { 
                    items: { include: { product: true } },
                    notes: true 
                }
            });

            if (!order) {
                return res.status(404).json({ error: 'Orden no encontrada' });
            }
            
            return res.json(order);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'No se pudo obtener la orden' });
        }
    }

}