import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/ConnectDB.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config()
connectDB();

// Middleware body dataa varten
app.use(express.json());            // JSON
app.use(express.urlencoded({ extended: true })); // form-data

//Reitit
app.use("/users", userRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));