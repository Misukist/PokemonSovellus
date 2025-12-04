import express from "express";
import { getCards, getMegaEvolutionSet, getPhantasmalFlamesSet, getBlackBoltWhiteFlaresSet} from "../controllers/pokemonController.js";



const router = express.Router();

router.get("/", getCards);             //Tämä on pokemon apille   // Poista kortti kokoelmasta
router.get("/mega-evolution", getMegaEvolutionSet);
router.get("/phantasmal-flames", getPhantasmalFlamesSet);
router.get("/black-bolt-white-flares", getBlackBoltWhiteFlaresSet);


export default router;

