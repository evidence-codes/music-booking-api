import express, { Router } from "express";

import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import artistRouter from "./artist.routes";
import eventRouter from "./event.routes";
import bookingRouter from "./booking.routes";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/artist", artistRouter);
router.use("/events", eventRouter);
router.use("/bookings", bookingRouter);

export default router;
