import express from "express";
import { createUsers, deleteUser, login} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup",  createUsers);
router.delete("/profile/:id", deleteUser);
router.post("/login", login)

export default router;