import express from "express";
import { protectRoute } from "../Middleware/auth.middleware.js";
import { getVideoToken } from "../Controllers/video.controller.js";

const router = express.Router();

router.get("/token", protectRoute, getVideoToken);

export default router;