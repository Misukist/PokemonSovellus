import express from "express";
import { getCards } from "../controllers/pokemonController.js";

const router = express.Router();

router.get("/", getCards);

export default router;

