import express from "express";
import { createUsers, deleteUser, login, cards, logout, getMe} from "../controllers/authController.js";
import { protectroute } from "../middleware/protectroute.js";

const router = express.Router();

router.post("/signup", createUsers);
router.delete("/profile/:id", protectroute, deleteUser);
router.post("/login", login)
router.post("/logout", logout)
router.get("/cards", cards)
router.get("/me", protectroute, getMe)
export default router;