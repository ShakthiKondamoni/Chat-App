import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authroutes from "./Routes/auth.route.js";
import userroutes from "./Routes/user.route.js";
import chatroutes from "./Routes/chat.route.js";
import videoRoutes from "./Routes/video.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authroutes);
app.use("/api/users", userroutes);
app.use("/api/chat", chatroutes);
app.use("/api/video", videoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});