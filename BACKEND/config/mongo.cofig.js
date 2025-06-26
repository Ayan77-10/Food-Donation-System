import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);  
    console.log(`Mongoose connected : ${conn.connection.host}`); //conn.connection.host gives host conected to
  } catch {
    console.error(Error);
    process.exit(1);
  }
};
