import { RequestHandler } from "express";
import db from "../db/connect";
import sendEmail from "../services/sendEmail";
import otpGenerator from "otp-generator";

export const sendOTP: RequestHandler = async (req, res) => {
  const { email } = req.body;
  try {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    const emailData = await sendEmail(email, otp);
    if (emailData.MessageId) {
      const coll = db.collection("OTP");
      // check if otp already exist in db
      const remove = await coll.deleteOne({
        email: email,
      });
      // insert new otp
      const data = await coll.insertOne({
        email: email,
        otp: otp,
      });

      console.log(data);
      res.status(200).json({ message: "OTP has been sent", success: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error", success: false });
  }
};
