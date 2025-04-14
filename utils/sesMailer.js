const AWS = require("aws-sdk");
const ses = new AWS.SES();

const sendOtpEmail = async (to, otp) => {
  const htmlBody = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>FixMyRide - OTP Verification</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="margin: 0; padding: 0; background-color: #f4f4f4;">
        <table width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px;">
                <tr>
                  <td align="center" style="padding: 30px; background-color: #007bff; color: #ffffff;">
                    <h1 style="margin: 0;">FixMyRide</h1>
                    <p>Your OTP Code</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px; font-family: Arial, sans-serif;">
                    <p>Use this OTP to verify your email:</p>
                    <div style="margin: 30px 0; text-align: center;">
                      <strong style="font-size: 24px;">${otp}</strong>
                    </div>
                    <p>This OTP is valid for 10 minutes.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const params = {
    Source: process.env.EMAIL_SOURCE,
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: "Your FixMyRide OTP Code",
      },
      Body: {
        Html: {
          Data: htmlBody,
        },
      },
    },
  };

  await ses.sendEmail(params).promise();
};

module.exports = { sendOtpEmail };
