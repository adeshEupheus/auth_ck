import mongoose from "mongoose";
const { Schema } = mongoose;

const OTPSchema = new Schema({
  email: String,
  otp: String,
  PhoneNum: String,
});

export default mongoose.model("otps", OTPSchema);
