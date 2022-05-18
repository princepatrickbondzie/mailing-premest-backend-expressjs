const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username && !password) {
      res.status(400).json({ message: "All fields required!!" });
    }
    const usernameExist = await User.findOne({ username });
    if (usernameExist) {
      res.status(400).json({ message: "Username is not available!!" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ username, password: hashedPassword });

    res.status(201).json({ user });
    console.log({ user });
  } catch (error) {
    console.error(error);
    // const errObj = handlErrors(error);
    // res.status(400).json(errObj);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    let user = await User.findOne({ username })
      .populate("inbox")
      .populate("sent");
    if (!user) next(new Error("User does not exist!"));
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new Error("Invalid Credentials"));
    const accessToken = jwt.sign({ id: user._id }, "123456789", {
      expiresIn: "1h",
    });

    await User.findByIdAndUpdate(user._id, { accessToken });

    res.status(200).json({
      user,
      accessToken,
    });
  } catch (error) {
    console.error(error);
    // const errMsg = handlErrors(error);
    // console.log(errMsg);
    // res.status(400).json(errMsg);
  }
};

const handlErrors = (err) => {
  let errors = { username: "", password: "", msg: "" };

  if (err.message === "incorrect username") {
    errors.username = err.message;
  }

  if (err.message === "incorrect password") {
    errors.password = err.message;
  }

  if (err.code === 11000) {
    errors.username = "the username is not available";
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports = { signup, login };
