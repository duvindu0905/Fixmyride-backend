exports.getProfile = (req, res) => {
    const userId = req.params.userId;
    // Fetch user profile from the database based on the userId
    res.json({ message: `Profile of user with ID: ${userId}` });
  };
  