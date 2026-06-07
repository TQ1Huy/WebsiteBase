import mongoose from "mongoose";

export async function connectDB() {
  try {
    console.log("ENV:", process.env.MONGO_URL);

    await mongoose.connect(process.env.MONGO_URL!);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}