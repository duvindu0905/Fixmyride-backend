const User = require('../models/user');
const Profile = require('../models/Profile');
const { sendOtpEmail } = require('../utils/sesMailer');

exports.sendOtp = async (req, res) => {
  console.log("✅ /api/send-otp route hit");

  const { email } = req.body;

  console.log("Parsed email:", email);

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    await User.findOneAndUpdate(
      { email },
      {
        email,
        otp,
        isVerified: false,
        otpExpiry: new Date(Date.now() + 5 * 60 * 1000) 
      },
      { upsert: true, new: true }
    );

    await sendOtpEmail(email, otp);
    console.log("✅ OTP sent to:", email);
    res.json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error('❌ OTP Error:', err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

exports.verifyOtp = async (req, res) => {
  console.log("✅ /api/verify-otp route hit");

  const { email } = req.query;
  const { otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  console.log("Verifying OTP for:", email, "Code:", otp);

  try {
    const user = await User.findOne({ email, otp });

    if (!user) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

  
    if (user.otpExpiry && user.otpExpiry < new Date()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const existingProfile = await Profile.findOne({ email });
    if (!existingProfile) {
      await Profile.create({
        email,
        memberSince: new Date().toLocaleDateString()
      });
    }

    console.log("✅ OTP verified and profile handled for:", email);
    res.json({ message: 'OTP verified and profile created' });
  } catch (err) {
    console.error('❌ Verify OTP error:', err);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
};
