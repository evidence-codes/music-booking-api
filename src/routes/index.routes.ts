import express from "express";

import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import artistRouter from "./artist.routes";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/artist", artistRouter);

export default router;
