import express from "express";
import { gedFeedPosts, getUserPosts, likePost } from "../controllers/posts";
import { verifyToken } from "../middlewares/auth";

const router = express.Router();

/* READ */
router.get("/", verifyToken, gedFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

export default router;
