// utils/jwt.js
import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );

  res.cookie("jwt", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // vain HTTPS tuotannossa
    sameSite: "lax",
    maxAge: 15 * 60 * 1000 // 15 min
  });
};
