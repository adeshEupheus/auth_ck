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
exports.verifyOTP = exports.sendOTP = void 0;
const sendEmail_1 = __importDefault(require("../services/sendEmail"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const Otps_1 = __importDefault(require("../models/Otps"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const sendSms_1 = require("../services/sendSms");
const sendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, PhoneNum } = req.body;
    console.log(req.body);
    try {
        const otp = otp_generator_1.default.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
        });
        if (email) {
            console.log("email");
            // look for user in db
            const user = yield User_1.default.findOne({
                email,
            });
            if (!user) {
                return res
                    .status(404)
                    .json({ message: "User not found", success: false });
            }
            const emailData = yield (0, sendEmail_1.default)(email, otp);
            if (emailData.MessageId) {
                const remove = yield Otps_1.default.deleteMany({
                    email: email,
                });
                const data = yield Otps_1.default.create({
                    email: email,
                    otp: otp,
                });
                console.log(data);
            }
        }
        else if (PhoneNum) {
            const user = yield User_1.default.findOne({
                phone: PhoneNum,
            });
            if (!user) {
                return res
                    .status(404)
                    .json({ message: "User not found", success: false });
            }
            const remove = yield Otps_1.default.deleteMany({
                PhoneNum: PhoneNum,
            });
            const status = (0, sendSms_1.sendSMS)(otp, PhoneNum);
            console.log(status);
            const data = yield Otps_1.default.create({
                PhoneNum: PhoneNum,
                otp: otp,
            });
            console.log(data);
        }
        return res
            .status(200)
            .json({ message: "OTP has been sent", success: true });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error", success: false });
    }
});
exports.sendOTP = sendOTP;
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp, PhoneNum } = req.body;
    try {
        let user;
        if (email) {
            user = yield Otps_1.default.findOne({
                email: email,
            });
        }
        if (PhoneNum) {
            user = yield Otps_1.default.findOne({
                PhoneNum: PhoneNum,
            });
        }
        if (user.otp === otp) {
            // create new token and return
            const person = yield User_1.default.findOne({
                email: email,
            });
            const token = jsonwebtoken_1.default.sign({ sub: person === null || person === void 0 ? void 0 : person.email, app: "SchoolApp", personId: person === null || person === void 0 ? void 0 : person.id }, `${process.env.JWT_SECRET}`, { expiresIn: process.env.JWT_LIFETIME });
            // delete the document in coll
            const remove = yield Otps_1.default.deleteOne({
                email: email,
            });
            res.status(200).json({
                status: "success",
                token,
            });
        }
        else {
            res.status(200).json({
                status: "failed",
                message: "Wrong Otp",
            });
        }
        // if(user.otp)
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "server error", success: false });
    }
});
exports.verifyOTP = verifyOTP;
