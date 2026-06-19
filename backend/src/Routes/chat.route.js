import express from "express";
import  { protectRoute } from "../Middleware/auth.middleware.js";
import { GenerateStreamToken } from "../lib/Stream.js";
import { getStreamToken} from "../Controllers/chat.controllers.js"

const router = express.Router();

router.get("/token",protectRoute, getStreamToken );
export default  router;

