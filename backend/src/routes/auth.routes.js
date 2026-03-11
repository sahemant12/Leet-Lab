import express from "express";
import { register, logIn, logOut, getMe } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const authRoutes = express.Router();

authRoutes
    .post("/register", register)
    .post("/log-in", logIn)
    .post("/log-out", authMiddleware, logOut)
    .get("/me", authMiddleware, getMe)

export default authRoutes;