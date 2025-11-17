import User from "../models/user.js";

//Get /user
export const getUsers = async  (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createUsers = async (req, res) => {
    const {email, password} = req.body;
    try {
        const newUser = new User({email, password});
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
         res.status(400).json({ error: error.message });
    }
}