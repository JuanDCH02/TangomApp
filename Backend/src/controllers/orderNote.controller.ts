import { prisma } from "../lib/prisma";
import { Request, Response } from "express";



export default class OrderNoteController {

    static createNote = async (req: Request, res: Response) => {
        try {
            const { content } = req.body;
            if (!content) {
                return res.status(400).json({ error: 'El contenido de la nota es requerido' });
            }

            const note = await prisma.orderNote.create({
                data: {
                    content,
                    orderId: Number(req.params.id)
                }
            });

            return res.status(201).json(note);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'No se pudo crear la nota' });
        }
    };

    static deleteNote = async (req: Request, res: Response) => {
        try {
            const orderId = Number(req.params.orderId);
            const noteId = Number(req.params.id);

            const note = await prisma.orderNote.findUnique({
                where: { id: noteId }
            });

            if (!note) {
                return res.status(404).json({ message: 'Nota no encontrada' });
            }

            // Validar que la nota pertenece a la orden especificada
            if (note.orderId !== orderId) {
                return res.status(403).json({ message: 'La nota no pertenece a esta orden' });
            }

            await prisma.orderNote.delete({ where: { id: noteId } });

            return res.json({ message: 'Nota eliminada correctamente' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'No se pudo eliminar la nota' });
        }
    };
}