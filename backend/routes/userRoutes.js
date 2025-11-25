import express from "express";
import {getUsers, getUserProfile} from "../controllers/userController.js"

const router = express.Router();

router.get("/users", getUsers);
router.get("/profile/:id", getUserProfile);


export default router;