import express from "express";
import { createUsers, deleteUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup",  createUsers);
router.delete("/profile/:id", deleteUser);

export default router;