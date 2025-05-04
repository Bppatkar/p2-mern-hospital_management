import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "hospital_management", // Change the database name to "hospital_management"
    });
    console.log("Database Connected Successfully");
    // console.log(`MongoDB URI: ${process.env.MONGO_URI}`); // Log the MongoDB URI for debugging
  } catch (error) {
    console.log("Error in Database Connection: ", error.message);
    process.exit(1);
  }
};

export default connectDB;
