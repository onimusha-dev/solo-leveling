import mongoose from "mongoose";
import { env } from "./env";
import { DB_NAME } from "../constant";


const connectDB = async () => {
    try {
      const connectionString = `${env.mongoURI}/${DB_NAME}`

      const conn = await mongoose.connect(connectionString);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log("failed to connect to database!")
  }
}

export default connectDB;