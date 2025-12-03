// middleware/protectRoute.js
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const protectroute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user; // koko käyttäjäobjekti
    next();

  } catch (err) {
    console.error("Protect route error:", err.message);
    return res.status(403).json({ error: "Invalid token" });
  }
};
