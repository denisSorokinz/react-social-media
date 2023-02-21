import Post from "../models/Post";
import User from "../models/User";
import { Request, Response } from "express";

/* READ */
export const gedFeedPosts = async (req: Request, res: Response) => {
  console.log(req);
  
  try {
    const posts = await Post.find();

    res.status(200).json({ posts });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const posts = await Post.find({ userId });

    if (!posts) return res.status(404).send("Posts not found");

    res.status(200).json({ posts });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

/* CREATE */
export const createPost = async (req: Request, res: Response) => {
  try {
    const { userId, description, picturePath } = req.body;

    const user = await User.findById(userId);

    if (!user) return res.status(404).send("User not found");

    const post = new Post({
      userId,
      description,
      picturePath,
      firstName: user.firstName,
      lastName: user.lastName,
      userPicturePath: user.picturePath,
      location: user.location,
      likes: {},
      comments: {},
    });
    const newPost = post.save();

    res.status(201).json({ newPost });
  } catch (err: any) {
    res.status(409).json({ error: err.message });
  }
};

/* UPDATE */
export const likePost = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      params: { id },
      user: { id: userId },
    } = req as Request & { user: { id: string, iat: number } };

    const post = await Post.findById(id);

    if (!post) return res.status(404).send("Post not found");

    const isLiked = post.likes.get(userId);
    if(isLiked) post.likes.delete(userId);
    else post.likes.set(userId, true);

    const newPost = await post.save();

    res.status(200).json({ newPost });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
