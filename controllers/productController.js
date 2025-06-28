import Product from '../models/product.js';
import { isAdmin } from './userController.js';

export async function getProducts(req, res) {
    try{
        if(isAdmin(req)){
            const products = await Product.find()
            res.json(products)
        }
        else{
            const products = await Product.find({isAvailable: true})
            res.json(products)
        }
        
    }catch(err){
        res.json({
            message: "Error fetching products",
            error: err
        })
    }
}

export function saveProduct(req, res) {

    if(!isAdmin(req)){
        res.status(403).json({
            message: "You are not authorized to add products"
        })
        return
    }
    const product = new Product(
        req.body
    )
    product.save()
    .then(()=>
        {
            // console.log(product);
            res.json({
                message: "Product added successfully",
            })
        }
    )
    .catch(()=>
        {
            res.json({
                message: "Error adding product",
            })
        }
    )
}

export async function deleteProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message: "You are not authorized to delete products"
        })
        return
    }
    try{
        await Product.deleteOne({productId : req.params.productId})

        res.json({
            message: "Product deleted successfully"
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json(
            {
            message: "Error deleting product",
            error: err.message,
            
        })
    }
    
}