import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (userId, res) => {
    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})

    res.cookie("jwt", accessToken, {
        httpOnly: true,           // JS ei voi lukea selaimessa
        secure: true,             // vain HTTPS
        sameSite: "strict",       // estää CSRF hyökkäyksiä
        maxAge: 3600000           // 1 tunti
    });

};