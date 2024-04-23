import express from "express";
const router = express.Router();
import { protectRoute } from "../middleware/protectRoute.js";
import { getUserById, getUsersForSidebar } from "../controllers/users.controller.js";

router.get("/",protectRoute, getUsersForSidebar);

router.get("/:id",protectRoute, getUserById);

export default router;