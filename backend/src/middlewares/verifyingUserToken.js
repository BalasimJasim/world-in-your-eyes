import { verifyToken } from "../utils/jwtUtils.js";

const verifyingUserToken = (req, res, next) => {
  try {
    // Get token from headers
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Verify token
    const decoded = verifyToken(token);
    req.user = decoded; 

    next(); 
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

export default verifyingUserToken;
