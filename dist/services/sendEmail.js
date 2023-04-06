"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const SES_CONFIG = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-south-1",
};
const AWS_SES = new aws_sdk_1.default.SES(SES_CONFIG);
let sendEmail = (recipientEmail, otp) => {
    let params = {
        Source: "otp@eupheusapp.com",
        Destination: {
            ToAddresses: [recipientEmail],
        },
        ReplyToAddresses: [],
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `<h2>Your One Time Password Classklap login is ${otp}</h2>`,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: `Hello, ${recipientEmail}!`,
            },
        },
    };
    return AWS_SES.sendEmail(params).promise();
    // return {awsResponse: }
};
exports.default = sendEmail;
