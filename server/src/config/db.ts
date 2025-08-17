import mongoose from "mongoose";
import { env } from "./env.js";
import { DB_NAME } from "../constant.js";


const connectDB = async () => {
    try {
      const connectionString = env.environment === "production" ? `${env.mongoURI}/${DB_NAME}` : `mongodb://127.0.0.1:27017/solo-leveling`

      const conn = await mongoose.connect(connectionString);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log("failed to connect to database!")
  }
}

export default connectDB;