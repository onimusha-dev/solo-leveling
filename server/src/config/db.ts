import mongoose from "mongoose";

const MONGO_URI:string = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const DB_NAME:string = process.env.DB_NAME || "solo-leveling";

export default async (): Promise<void> => {
  try {
    if(!MONGO_URI || !DB_NAME) {
        throw new Error("Error in env load in DB!")
    }
    const conn = await mongoose.connect(`${MONGO_URI}/${DB_NAME}`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

