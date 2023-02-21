import User from "../models/User";
import { Request, Response } from "express";

/* READ */
export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserFriends = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = (await User.findById(id));

    if(!user) return res.status(404).send("User not found");

    const friends = await Promise.all(
      user.friends.map((id: number) => User.findById(id))
    );

    res.status(200).json(friends);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req: Request, res: Response) => {
  try {
    const { id, friendId } = req.params;
    const user = (await User.findById(id));
    const friend = (await User.findById(friendId));

    if(!user) return res.status(404).send("User not found");
    if(!friend) return res.status(404).send("Friend not found");

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id: number) => id !== +friendId);
      friend.friends = friend.friends.filter((id: number) => id !== +id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id: number) => User.findById(id))
    );

    res.status(200).json(friends);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
