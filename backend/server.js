import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/ConnectDB.js";
import userRoutes from "./routes/userRoutes.js";
import pokemonRoutes from "./routes/pokemonRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from 'cookie-parser';
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

dotenv.config()
connectDB();
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173", // tai "*" testauksessa
    credentials: true,               // jos lähetät cookies
}));

const API_KEY = process.env.POKEMON_TCG_KEY;

// Middleware body dataa varten
app.use(express.json());            // JSON
app.use(express.urlencoded({ extended: true })); // form-data

//Reitit
app.use("/api", userRoutes);
app.use("/api/cards", pokemonRoutes);
app.use("/api/auth" , authRoutes)

app.listen(port, () => console.log(`Server running on port ${port}`));