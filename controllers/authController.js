const User = require('../models/user');
const sendOtp = require('../utils/sendOtp');
const { generateToken } = require('../utils/jwt');

const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

exports.sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = generateOtp();
  const expiry = new Date(Date.now() + 2 * 60 * 1000);

  try {
    await User.findOneAndUpdate(
      { email },
      { email, otp, otpExpiry: expiry },
      { upsert: true, new: true }
    );
    await sendOtp(email, otp);
    res.json({ message: 'OTP sent to email' });
  } catch (err) {
    res.status(500).json({ error: 'OTP send failed' });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || new Date() > user.otpExpiry) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Clear OTP
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = generateToken(user._id);
    res.json({ message: 'OTP verified', token });
  } catch (err) {
    res.status(500).json({ error: 'OTP verification failed' });
  }
};
