import express from "express";
import { protectRoute } from "../Middleware/auth.middleware.js";
import {
  GetRecommendedUsers,
  GetMyFriends,
  SendFriendRequest,
  GetFriendRequest,
  acceptFriendRequest,
  OutGoingRequest,
} from "../Controllers/user.controllers.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", GetRecommendedUsers);
router.get("/friends", GetMyFriends);

router.post("/Friend-requests/:id", SendFriendRequest);
router.put("/Friend-requests/:id/accept", acceptFriendRequest);

router.get("/Friend-requests", GetFriendRequest);
router.get("/outgoing-friend-requests", OutGoingRequest);

export default router;