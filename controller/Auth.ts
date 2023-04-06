import { RequestHandler } from "express";
import sendEmail from "../services/sendEmail";
import otpGenerator from "otp-generator";
import Otps from "../models/Otps";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { sendSMS } from "../services/sendSms";

export const sendOTP: RequestHandler = async (req, res) => {
  const { email, PhoneNum } = req.body;
  console.log(req.body);

  try {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
    if (email) {
      console.log("email");

      // look for user in db
      const user = await User.findOne({
        email,
      });

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found", success: false });
      }

      const emailData = await sendEmail(email, otp);
      if (emailData.MessageId) {
        const remove = await Otps.deleteMany({
          email: email,
        });
        const data = await Otps.create({
          email: email,
          otp: otp,
        });
        console.log(data);
      }
    } else if (PhoneNum) {
      const user = await User.findOne({
        phone: PhoneNum,
      });

      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found", success: false });
      }

      const remove = await Otps.deleteMany({
        PhoneNum: PhoneNum,
      });
      const status = sendSMS(otp, PhoneNum);
      console.log(status);
      const data = await Otps.create({
        PhoneNum: PhoneNum,
        otp: otp,
      });
      console.log(data);
    }
    return res
      .status(200)
      .json({ message: "OTP has been sent", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error", success: false });
  }
};

export const verifyOTP: RequestHandler = async (req, res) => {
  const { email, otp, PhoneNum } = req.body;

  try {
    let user: any;
    if (email) {
      user = await Otps.findOne({
        email: email,
      });
    }
    if (PhoneNum) {
      user = await Otps.findOne({
        PhoneNum: PhoneNum,
      });
    }

    if (user!.otp === otp) {
      // create new token and return
      const person = await User.findOne({
        email: email,
      });
      const token = jwt.sign(
        { sub: person?.email, app: "SchoolApp", personId: person?.id },
        `${process.env.JWT_SECRET}`,
        { expiresIn: process.env.JWT_LIFETIME }
      );

      // delete the document in coll
      const remove = await Otps.deleteOne({
        email: email,
      });

      res.status(200).json({
        status: "success",
        token,
      });
    } else {
      res.status(200).json({
        status: "failed",
        message: "Wrong Otp",
      });
    }

    // if(user.otp)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error", success: false });
  }
};
