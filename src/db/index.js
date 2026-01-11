import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectionString = process.env.MONGO_URI;
if (!connectionString) {
  throw new Error("MongoDB connection string missing!");
}
const initDB = async () => {
  try {
    const connection = await mongoose.connect(connectionString);
    console.log("MongoDB connected successfully");
    return;
  } catch (error) {
    console.error("There was an error connecting to database");
    process.exit(1);
  }
};

export default initDB;
