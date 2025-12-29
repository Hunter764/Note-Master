import mongoose from "mongoose";
import { ca } from "zod/v4/locales";


const MONGODB_URI = process.env.MONGODB_URL;

let isConnected = false;

async function connectDB() {

    if(isConnected){
        console.log("MongoDB is already connected");
        return; 
    }

    try{
        const db = await mongoose.connect(MONGODB_URI)
        isConnected = db.connections[0].readyState === 1;  // 1 means connected or connection is alive
        console.log("MongoDB connected to ", db);

    }
    catch(error){
        console.log("MongoDB connection error: ", error);
        throw error;
    }
}

export default connectDB;