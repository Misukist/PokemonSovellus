import express from "express";
import {addCard,getUserCards,deleteCard} from "../controllers/cardsController.js";
import { protectroute } from "../middleware/protectroute.js";

const router = express.Router();

router.post("/save", protectroute, addCard);
router.get("/my-cards", protectroute, getUserCards);           // Lisää kortti kokoelmaan
router.delete("/:id", protectroute, deleteCard);    // Poista kortti kokoelmasta

export default router;
