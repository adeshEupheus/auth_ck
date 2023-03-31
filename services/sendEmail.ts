import AWS from "aws-sdk";

const SES_CONFIG = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1",
};

const AWS_SES = new AWS.SES(SES_CONFIG);

let sendEmail = (recipientEmail: string, otp: string) => {
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
          Data: `<h2>Your One Time Password is ${otp}</h2>`,
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

export default sendEmail;
