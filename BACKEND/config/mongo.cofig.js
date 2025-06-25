import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://localhost:27017/food-donation"
    );
    console.log(`Mongoose connected : ${conn.connection.host}`); //conn.connection.host gives host conected to
  } catch {
    console.error(Error);
    process.exit(1);
  }
};
