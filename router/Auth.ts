import express from "express";
import { sendOTP, verifyOTP } from "../controller/Auth";

const router = express.Router();

router.post("/sendOTP", sendOTP);
router.post("/verifyOTP", verifyOTP);

export default router;
