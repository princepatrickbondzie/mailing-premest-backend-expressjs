const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username && !password) {
      res.status(400).json({ message: "All fie;lds required!!" });
    }
    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      res.status(400).json({ message: "Username is not available!!" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) next(new Error("User does not exist!"));
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new Error("Invalid Credentials"));

    const accessToken = jwt.sign({ id: user._id }, "123456789", {
      expiresIn: "1h",
    });
    await User.findByIdAndUpdate(user._id, { accessToken });
    res.status(200).json({
      data: { username: user.username },
      accessToken,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { signup, login };
