const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendOtp = async (email, otp) => {
  const msg = {
    to: email,
    from: process.env.FROM_EMAIL, // Ensure FROM_EMAIL is a verified sender
    subject: 'FixMyRide OTP Verification',
    html: `<p>Your OTP code is <strong>${otp}</strong>. It will expire in 2 minutes.</p>`,
  };

  console.log('Sending OTP email:', msg); // Log the message details

  try {
    await sgMail.send(msg); // Send the email
    console.log('OTP email sent successfully');
  } catch (err) {
    console.error('Error sending email:', err); // Log email sending error
    throw err; // Re-throw to propagate the error
  }
};

module.exports = sendOtp;