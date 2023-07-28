import mongoose from "mongoose"
import { config } from "dotenv";
config();

const connectDb = async(req, res) => {
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("succesfully connected to database");
    }catch(err){
        console.log("oops! not connected to databse", err);
    }
}

connectDb();