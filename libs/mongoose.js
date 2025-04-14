import mongoose from "mongoose";
import user from "@/models/User";
import board from "@/models/Board";

const connectMongo = () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log("MongoDB connection error:", error.message);
  }
};

export default connectMongo;
