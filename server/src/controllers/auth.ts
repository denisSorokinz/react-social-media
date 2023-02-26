import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { Request, Response } from "express";

/* REGISTER USER */
export const register = async (req: Request, res: Response) => {
  console.log("post");

  try {
    console.log(1);

    const salt = await bcrypt.genSalt();
    console.log(2, req.body);

    const passwordHash = await bcrypt.hash(req.body.password, salt);
    console.log(3);

    const newUser = new User({
      ...req.body,
      password: passwordHash,
      friends: [],
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  console.log("login");

  try {
    console.log("1");

    const { email, password } = req.body;

    console.log("2", email, password);

    const user = await User.findOne({ email });
    console.log("[user]", user);

    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
    delete (user as any).password;

    res.status(200).json({ token, user });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
