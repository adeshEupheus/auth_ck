"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const OTPSchema = new Schema({
    email: String,
    otp: String,
    PhoneNum: String,
});
exports.default = mongoose_1.default.model("otps", OTPSchema);
