import { prisma } from "../lib/prisma";
import { Request, Response } from "express";

export default class CategoryController {

    static createCategory = async (req: Request, res: Response) => {
        try {
          const { name } = req.body;
          const cat = await prisma.category.create({ data: { name } });
          return res.json(cat);
        } catch (err) {
          console.error(err);
          return res.status(500).json({ error: "No se puedo crear la categoria" });
        }
    };
    
    static getAllCategory = async(req: Request, res:Response) => {
        const cats = await prisma.category.findMany();
        return res.json(cats);
    };
    
    static deleteCategory = async(req: Request, res:Response) => {
        const { id } = req.params;
        await prisma.category.delete({where: { id: Number(id) }})
        return res.status(204).send('Categoria eliminada');
    };
    
}