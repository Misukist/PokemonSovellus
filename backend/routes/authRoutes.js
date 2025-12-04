import express from "express";
import { createUsers, deleteUser, login, logout, getMe, updateSettings} from "../controllers/authController.js";
import { protectroute } from "../middleware/protectroute.js";

const router = express.Router();

router.post("/signup", createUsers);
router.delete("/profile/:id", protectroute, deleteUser);
router.post("/login", login)
router.post("/logout", logout)
router.get("/me", protectroute, getMe)
router.post("/settings", protectroute, updateSettings);
export default router;