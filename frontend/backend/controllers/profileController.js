const User = require('../models/User');

const uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: 'No file uploaded' });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePic: `/uploads/profile-pics/${req.file.filename}` },
      { new: true }
    );

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Upload failed' });
  }
};

const updateProfile = async (req, res) => {
  const { name, email, description } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, description },
      { new: true }
    );

    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Update failed' });
  }
};

// ✅ Export all the functions properly
module.exports = {
  uploadProfilePic,
  updateProfile,
  createProfile: (req, res) => {
    res.send("Profile created");
  }
};
