

import { Router } from "express";
import { handleInputErrors } from "../middleware/validate";
import ProductController from "../controllers/product.controller";
import { body, param } from "express-validator";




const productRouter = Router();

productRouter.post('/', 
    body('name')
        .trim().notEmpty().withMessage('El nombre no puede ir vacio'),
    body('price')
        .isFloat({min: 1}).withMessage('El precio debe ser un número positivo'),
    body('stock')
        .isInt({ min: 0 }).withMessage('El stock debe ser un número entero no negativo'),
    body('categoryId')
        .notEmpty().withMessage('El ID de categoría es requerido'),
    handleInputErrors,
    ProductController.createProduct
);

productRouter.get('/', ProductController.getAllProducts);

productRouter.get('/:id', ProductController.getProductById);

productRouter.delete('/:id', ProductController.deleteProduct);



export default productRouter;