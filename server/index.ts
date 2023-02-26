import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./src/routes/auth";
import userRoutes from "./src/routes/users";
import postRoutes from "./src/routes/posts";
import { register } from "./src/controllers/auth";
import { createPost } from "./src/controllers/posts";
import { verifyToken } from "./src/middlewares/auth";

import User from "./src/models/User";
import Post from "./src/models/Post";
import { users, posts } from "./src/data";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "/public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/assets");
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
try {
  const connection = await mongoose.connect(process.env.MONGO_URL as string);
  app.listen(PORT, () => console.log(`listening on port: ${PORT}`));

  // await User.deleteMany(() => true);
  // await Post.deleteMany(() => true);
  // await User.insertMany(users);
  // await Post.insertMany(posts);
} catch (err) {
  console.log(`connection error: ${err}`);
}
