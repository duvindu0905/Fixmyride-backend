const Profile = require('../models/Profile');

exports.getProfileByEmail = async (req, res) => {
  const email = req.query.email;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const profile = await Profile.findOne({ email });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    res.json(profile);
  } catch (err) {
    console.error("Get Profile Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.updateProfile = async (req, res) => {
  const { email, firstName, lastName, phoneNumber } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const updated = await Profile.findOneAndUpdate(
      { email },
      { firstName, lastName, phoneNumber }, 
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Profile not found' });

    res.json({ message: 'Profile updated successfully', profile: updated });
  } catch (err) {
    console.error('Update Profile Error:', err);
    res.status(500).json({ message: 'Server error updating profile' });
  }
};
