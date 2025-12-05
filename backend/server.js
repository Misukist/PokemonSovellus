import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/ConnectDB.js";
import userRoutes from "./routes/userRoutes.js";
import pokemonRoutes from "./routes/pokemonRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cardsRoutes from "./routes/cardsRoutes.js";
import cookieParser from 'cookie-parser';
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use("/api/collection", cardsRoutes);
app.use("/api/cards", pokemonRoutes);
app.use("/api/auth" , authRoutes)

// React build
app.use(express.static(path.join(__dirname, "../Frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});

app.listen(port, () => console.log(`Server running on port ${port}`));