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
exports.sendSMS = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sendSMS = (otp, no) => __awaiter(void 0, void 0, void 0, function* () {
    var phone = no;
    let key = process.env.TEXTLOCAL_KEY;
    let sender = process.env.TEXTLOCAL_ID;
    let sms = `Your One Time Password is ${otp}. Please do not share your One Time Password with anyone. - Eupheus Learning`;
    var url = "https://api.textlocal.in/send/?apikey=" +
        key +
        "&numbers=" +
        phone +
        "&sender=" +
        sender +
        "&message=" +
        encodeURIComponent(sms);
    let send = yield axios_1.default.get(url);
    return { status: send.data.status };
});
exports.sendSMS = sendSMS;
