const User = require('../models/user');
const Profile = require('../models/Profile');
const { sendOtpEmail } = require('../utils/sesMailer');


exports.sendOtp = async (req, res) => {
  console.log("✅ /api/send-otp route hit");

  let email;
  try {
    const parsed = JSON.parse(req.rawBody || '{}'); 
    email = parsed.email;
  } catch (err) {
    console.error("❌ JSON parsing failed:", err);
    return res.status(400).json({ message: 'Invalid JSON body' });
  }

  console.log("Parsed email:", email);

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  try {
    await User.findOneAndUpdate(
      { email },
      { email, otp, isVerified: false },
      { upsert: true, new: true }
    );

    await sendOtpEmail(email, otp);
    console.log("✅ OTP sent to:", email);
    res.json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error('OTP Error:', err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

exports.verifyOtp = async (req, res) => {
    console.log("✅ /api/verify-otp route hit");
  
    const email = req.query.email;
    let otp;
  
    try {
      const parsed = JSON.parse(req.rawBody || '{}');
      otp = parsed.otp;
    } catch (err) {
      console.error("JSON parse error:", err);
      return res.status(400).json({ message: 'Invalid JSON format' });
    }
  
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }
  
    console.log("Verifying OTP for:", email, "Code:", otp);
  
    try {
      const user = await User.findOne({ email, otp });
      if (!user) return res.status(400).json({ message: 'Invalid OTP' });
  
      user.isVerified = true;
      user.otp = null;
      await user.save();
  
      const exists = await Profile.findOne({ email });
      if (!exists) {
        await Profile.create({
          email,
          memberSince: new Date().toLocaleDateString()
        });
      }
  
      console.log("✅ OTP verified and profile handled for:", email);
      res.json({ message: 'OTP verified and profile created' });
    } catch (err) {
      console.error('Verify OTP error:', err);
      res.status(500).json({ message: 'Failed to verify OTP' });
    }
  };



