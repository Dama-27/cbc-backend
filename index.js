import express from 'express';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';
const app = express();

app.use(bodyparser.json());

app.use((req,res,next)=> {
    const tokenString = req.header("Authorization");
    if(tokenString != null){
        const token = tokenString.replace("Bearer ", "");
        jwt.verify(token,"cbc-batch-five#@2025", (err,decoded)=>{
            if (decoded != null){
                req.user=decoded
                console.log(decoded)
                next()
            } else {
                console.log("Invalid token");
                res.status(403).json({
                    message : "Invalid token"
                })
            }
        })
    }
    else{
        next()
    }
})

mongoose.connect("mongodb+srv://admin:123@cluster0.0fpn8wc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{console.log("Connected to MongoDB")})
.catch((err)=>{console.log("Error connecting to MongoDB", err)});

// mongodb+srv://admin:123@cluster0.0fpn8wc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

function sucessfullyStarted(){
    console.log("Server is running on port 3000");
}

app.use("/products", productRouter);

app.use("/users", userRouter)

app.delete("/",()=>{
    console.log("This is a delete request");
})

app.listen(3000, ()=> {
    console.log("Server is running on port 3000");
}
)