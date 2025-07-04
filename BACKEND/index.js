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
app.use(cors({ origin: "https://food-donationsystem.netlify.app", credentials: true }));


https://food-donationsystem.netlify.app/

// auth route
app.use("/api/auth", auth);
app.use("/api/", donation);

app.listen(process.env.PORT || 5000, () => {
  connectDB();
  console.log("Server running on 5000");
});
