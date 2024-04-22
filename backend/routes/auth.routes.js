import express from "express";
import { logIn, logOut, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", logIn);
router.post("/logout", logOut);

export default router;