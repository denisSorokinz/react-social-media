import { register, login } from './../controllers/auth';
import express from "express";

const router = express.Router();

/* READ */
router.post("/login", login);

/* CREATE */
router.post("/register", register)

export default router;
