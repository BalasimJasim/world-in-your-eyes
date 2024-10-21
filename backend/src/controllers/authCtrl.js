import { User } from "../models/usersModel.js";
import sendEmail from "../utils/sendEmail.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/jwtUtils.js";

export const singup = async (req, res, next) => {
  try {
    console.log('Received signup request:', req.body);
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "email already exists!" });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    console.log("New user email:", newUser.email);

    const token = generateToken(newUser._id);
    const link = `${process.env.SERVER_DOMAIN}/auth/verify/${token}`;
    console.log("LINK :", link);

    const htmlTemplate = `
        <div>
          <p>Click on the link below to verify your email</p>
          <a href="${link}">Verify</a>
        </div>`;
    await sendEmail(newUser.email, "Verify Your Email", htmlTemplate);

    //**RESPOND TO THE USER  */

    res.status(201).json({
      message: "We sent to you an email, please verify your email address",
    });
  } catch (error) {
    console.error("Error during signup:", error);

    next(error);
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    if (!user.isVerified) {
      return res
        .status(401)
        .json({ message: "Please verify your email first" });
    }
    const isMatch = comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = generateToken(user._id);
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
