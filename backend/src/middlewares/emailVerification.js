import { User } from "../models/usersModel.js";
import { verifyToken } from "../utils/jwtUtils.js";

export const verifyUserMiddleware = async (req, res, next) => {
  const { token } = req.params;
  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: "User is already verified" });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Email successfully verified!" });
  } catch (error) {
    res.status(400).json({ message: "Invalid or expired verification link" });
    next(error);
  }
};
