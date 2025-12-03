import express from "express";
import { getCards } from "../controllers/pokemonController.js";



const router = express.Router();

router.get("/", getCards);             //Tämä on pokemon apille   // Poista kortti kokoelmasta


export default router;

