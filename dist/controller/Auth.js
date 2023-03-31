"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = void 0;
const connect_1 = __importDefault(require("../db/connect"));
const sendEmail_1 = __importDefault(require("../services/sendEmail"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const sendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const otp = otp_generator_1.default.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
        });
        const emailData = yield (0, sendEmail_1.default)(email, otp);
        if (emailData.MessageId) {
            const coll = connect_1.default.collection("OTP");
            // check if otp already exist in db
            const remove = yield coll.deleteOne({
                email: email,
            });
            // insert new otp
            const data = yield coll.insertOne({
                email: email,
                otp: otp,
            });
            console.log(data);
            res.status(200).json({ message: "OTP has been sent", success: true });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error", success: false });
    }
});
exports.sendOTP = sendOTP;
