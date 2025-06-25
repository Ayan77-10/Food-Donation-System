// Importing
import express from "express";
import { connectDB } from "./config/mongo.cofig.js";
import dotenv from "dotenv";
import auth from "./routes/auth.routes.js";
import donation from "./routes/donation.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();
// instance of app
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));




// auth route
app.use("/api/auth", auth);
app.use("/api/", donation);

app.listen(5000, () => {
  connectDB();
  console.log("Server running on 5000");
});
