import jwt from "jsonwebtoken";
import crypto from "crypto";

export const generateToken = (userId) => {
  return jwt.sign(
    { userId, token: crypto.randomBytes(32).toString("hex") },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
