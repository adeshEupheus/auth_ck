import express from "express";
import { sendOTP } from "../controller/Auth";

const router = express.Router();

router.post("/sendOTP", sendOTP);

export default router;
