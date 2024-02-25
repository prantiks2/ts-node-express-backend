import express from 'express';
import { joiValidationMiddleware } from '../middlewares/joi-validate-request.middleware';
import { productListSchema } from '../joi-validation-schemas/products.joi';
import { fetchAllProducts } from '../controllers/product.controller';
export const productRouter = express.Router();

productRouter.get('/list', joiValidationMiddleware(productListSchema, 'params'), fetchAllProducts);
