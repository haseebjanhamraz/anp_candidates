// middleware/checkUserStatus.js
const User = require('../models/User'); // Update the path accordingly

const checkUserStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (user.status !== 'active') {
      return res.status(401).json({ message: 'User is inactive' });
    }

    // User is active, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = checkUserStatus;
