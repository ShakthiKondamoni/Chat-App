import express from "express";
import {signup,Login,Logout,onboard,profile} from "../Controllers/auth.controllers.js";
import { protectRoute } from "../Middleware/auth.middleware.js";
const router = express.Router();

router.post("/signup",signup);

router.post("/login",Login);

router.post("/logout",Logout);

router.post("/onboard",protectRoute,onboard);

// forgot password

router.get("/me",protectRoute,profile);

export default router;