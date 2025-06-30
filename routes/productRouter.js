import express from 'express';
import { deleteProduct, getProductById, getProducts, saveProduct, updateProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get("/",  getProducts)
productRouter.get("/:productId",getProductById)
productRouter.post("/", saveProduct)
productRouter.delete("/:productId", deleteProduct)
productRouter.put("/:productId",updateProduct)
export default productRouter;