
import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validate";
import { OrderController } from "../controllers/order.controller";
import OrderNoteController from "../controllers/orderNote.controller";

const orderRouter = Router();

orderRouter.post( "/",
    body('email').notEmpty().isEmail().withMessage('El email es obligatorio'),
    body("items").isArray({ min: 1 }).withMessage("items must be a nonempty array"),
    body("items.*.quantity").isInt({ min: 1 }).withMessage("cantidad de productos debe ser al menos 1"),
    handleInputErrors,
    OrderController.createOrder
);

orderRouter.get('/', OrderController.getAllOrders);

orderRouter.get('/:id', 
    param("id").isInt().withMessage("ID de orden debe ser un número entero"),
    handleInputErrors,
    OrderController.getOrderById
);

orderRouter.get('/:id/notes', 
    param("id").isInt().withMessage("ID de orden debe ser un número entero"),
    handleInputErrors,
    OrderNoteController.getOrderNotes
);

orderRouter.patch( "/:id/status",
    param("id").isInt().withMessage("id es necesario"),
    body("status").isIn(["PENDING", "WAITING_PAYMENT", "PAID", "COMPLETED", "CANCELLED"]).withMessage("Estado no válido"),
    handleInputErrors,
    OrderController.changeStatusOrder
);


orderRouter.post('/:id/notes',
    param("id").isInt().withMessage("ID de orden debe ser un número entero"),
    body('content')
            .trim().notEmpty().withMessage('La nota no puede ir vacia'),
        handleInputErrors,
    OrderNoteController.createNote

);

orderRouter.delete('/:orderId/notes/:id',
    param("orderId").isInt().withMessage("ID de orden debe ser un número entero"),
    param("id").isInt().withMessage("ID de nota debe ser un número entero"),
    handleInputErrors,
    OrderNoteController.deleteNote
);


export default orderRouter;
