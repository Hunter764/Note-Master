import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URL;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URL environment variable inside .env file'
  );
}

let isConnected = false;

async function connectDB() {

    if(isConnected){
        console.log("MongoDB is already connected");
        return; 
    }

    try{
        const db = await mongoose.connect(MONGODB_URI)
        isConnected = db.connections[0].readyState === 1;  // 1 means connected or connection is alive
        console.log("MongoDB connected successfully");

    }
    catch(error){
        console.error("MongoDB connection error: ", error.message);
        throw error;
    }
}

export default connectDB;