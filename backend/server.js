import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/ConnectDB.js";
import userRoutes from "./routes/userRoutes.js";
import pokemonRoutes from "./routes/pokemonRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cardsRoutes from "./routes/cardsRoutes.js";
import cookieParser from 'cookie-parser';
import path from "path";

const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.resolve();

dotenv.config();
connectDB();
app.use(cookieParser());

// Middleware body dataa varten
app.use(express.json());            // JSON
app.use(express.urlencoded({ extended: true })); // form-data

// API-reitit
app.use("/api", userRoutes);
app.use("/api/collection", cardsRoutes);
app.use("/api/cards", pokemonRoutes);
app.use("/api/auth", authRoutes);

// Production: palvele frontend build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  // Kaikki muut kuin /api -reitit menevät Reactille
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(port, () => console.log(`Server running on port ${port}`));
