const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  // Basic validation
  if (!userName || !email || !password) {
    return res.status(400).json({
      message: "Please provide all required fields (userName, email, password)",
      success: false,
    });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ userName, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully!",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating a new user",
      success: false,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({
        success: false,
        message: "User does not exist. Please register to login.",
      });
    }

    const validatePassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!validatePassword) {
      return res.json({
        success: false,
        message: "Incorrect password, Please try again.",
      });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        role: existingUser.role,
        email: existingUser.email,
        userName: existingUser.userName,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
      })
      .json({
        success: true,
        message: "Logged in successfully!",
        user: {
          email: existingUser.email,
          role: existingUser.role,
          id: existingUser._id,
          userName: existingUser.userName,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error while loggin in. Please try again",
      success: false,
    });
  }
};

const logout = async (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "You have logged out successfully",
  });
};

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: true,
      message: "Unauthorized user",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: true,
      message: "Unauthorized user",
    });
  }
};

module.exports = { registerUser, loginUser, logout, authMiddleware };
