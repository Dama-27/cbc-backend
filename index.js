import express from 'express';
import bodyparser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from 'jsonwebtoken';
import orderRouter from './routes/orderRouter.js';
import cors from 'cors';
const app = express();
dotenv.config();
import dotenv from 'dotenv';

app.use(cors())
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

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{console.log("Connected to MongoDB")})
.catch((err)=>{console.log("Error connecting to MongoDB", err)});

function sucessfullyStarted(){
    console.log("Server is running on port 3000");
}

app.use("/products", productRouter)
app.use("/users", userRouter)
app.use("/orders", orderRouter)

app.delete("/",()=>{
    console.log("This is a delete request");
})

app.listen(3000, ()=> {
    console.log("Server is running on port 3000");
}
)