
import { Router } from "express";
import { handleInputErrors } from "../middleware/validate";
import { body } from "express-validator";
import CategoryController from '../controllers/category.controller';


const categoryRouter = Router();

categoryRouter.post('/', 
    body('name')
    .trim().notEmpty().withMessage('El nombre no puede ir vacio'),
    handleInputErrors,
    CategoryController.createCategory
)
categoryRouter.get('/', CategoryController.getAllCategory)


export default categoryRouter;