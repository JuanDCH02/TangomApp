
import { prisma } from "../lib/prisma";
import { Request, Response } from "express";





export default class ProductController {

    static createProduct = async(req: Request, res:Response) => {
        const { name, price, stock, imageUrl, categoryId } = req.body;
            const newProduct = await prisma.product.create({
                data:{
                    name,
                    price,
                    stock,
                    imageUrl,
                    categoryId
                }
            })
        return res.json(newProduct);
    };

    static getAllProducts = async(req: Request, res: Response) => {
        const products = await prisma.product.findMany({
            include:{ category: true }
        })
        return res.json(products)
    };

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