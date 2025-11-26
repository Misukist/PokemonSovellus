import jwt from 'jsonwebtoken';   // <--- tämä puuttuu


export const protectroute = (req, res, next) => {
    const token = req.cookies?.jwt;


    if (!token) {
        return res.status(401).json({ error: "Token missing" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid token" });
        }

        req.user = user; // payload, esim. { userId: ... }
        next();           // välitä pyyntö controllerille
    });
};
