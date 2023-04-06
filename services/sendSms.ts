import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const sendSMS = async (otp: any, no: any) => {
  var phone = no;
  let key = process.env.TEXTLOCAL_KEY;
  let sender = process.env.TEXTLOCAL_ID;
  let sms = `Your One Time Password is ${otp}. Please do not share your One Time Password with anyone. - Eupheus Learning`;
  var url =
    "https://api.textlocal.in/send/?apikey=" +
    key +
    "&numbers=" +
    phone +
    "&sender=" +
    sender +
    "&message=" +
    encodeURIComponent(sms);
  let send = await axios.get(url);

  return { status: send.data.status };
};
