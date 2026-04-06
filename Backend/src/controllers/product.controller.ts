

import { prisma } from "../lib/prisma";
import { Request, Response } from "express";





export default class ProductController {

    static createProduct = async(req: Request, res:Response) => {
        try {
            const { name, price, stock, imageUrl, categoryId } = req.body;
            await prisma.product.create({
                data:{ name, price, stock, imageUrl, categoryId }
            })
            return res.status(201).send('Producto creado');
            
        } catch (error) {
            return res.status(400).json({ error: 'No se pudo crear el producto' });
        }
    };

    static editProduct = async(req: Request, res:Response) => {
        
        try {
            const { name, price, stock, imageUrl, categoryId } = req.body;

            await prisma.product.update({
                where:{ id: Number(req.params.id) },
                data: { name, price, stock, imageUrl, categoryId }
            })
            return res.json({ message: 'Producto actualizado' });

        } catch (error) {
            return res.status(400).json({ error: 'No se pudo actualizar el producto' });
        }
    }

    static getAllProducts = async (req: Request, res: Response) => {

        const { categoryId } = req.query

        const products = await prisma.product.findMany({
            where: categoryId ? { categoryId: Number(categoryId) } : undefined,
            include: { category: true }
        })

        return res.json(products)
    }   ;

    static getProductById = async(req: Request, res: Response) => {
        const product = await prisma.product.findUnique({
            where: { id: Number(req.params.id)}
        })
        if(!product) return res.status(404).json({ message: 'Producto no encontrado' });
        return res.json(product)
    };
    
    static deleteProduct = async (req: Request, res: Response) => {
        const product = await prisma.product.findUnique({
            where: { id: Number(req.params.id)}
        })
        if(!product) return res.status(404).json({ message: 'Producto no encontrado' })

        await prisma.product.delete({where: { id: Number(req.params.id) }})
        return res.json({ message: 'Producto eliminado' });
    };
}