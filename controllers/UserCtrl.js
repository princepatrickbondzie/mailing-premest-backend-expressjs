const User = require("../models/User");

const getUser = async (req, res) => {
  try {
    const username = req.params;
    const user = await User.findOne(username).populate("inbox");
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getUser };
