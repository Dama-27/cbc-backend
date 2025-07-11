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

export async function updateProduct(req,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message: "You are not authorized to update products"
        })
        return
    }

    const productId = req.params.productId
    const updatingData = req.body
    try{
        await Product.updateOne(
            {productId: productId},
            updatingData
        )

        res.json(
            {
                message : "Product updated sucessfully"
            }
        )
    }
    catch(err){
        res.status(500).json({
            message: "Internal server error",
            error: err
        })
    }
}

export async function getProductById(req, res) {
    const productId = req.params.productId;

    try{
        const product = await Product.findOne(
            {productId: productId}
        )

        if(product == null){
            res.status(404).json({
                message: "Product not found"
            })
            return
        }
        if(product.isAvailable){
            res.json(product)
        }
        else{
            if(!isAdmin(req)){
                res.status(404).json({
                    message: "Product not found"
                })
                return
            }
            else{
                res.json(product)
            }
        }
        

    }
    catch(err){

    }
}