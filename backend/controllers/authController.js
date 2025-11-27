import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../models/user.js";
import bcrypt from 'bcryptjs';




export const createUsers = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({error: "Invalid email format"}); 
        }
        const existingEmail = await User.findOne({email:email}); 
        if (existingEmail) {
            return res.status(400).json({error: "Email is already taken"});
        }
        if(password.length < 6) {
            return res.status(400).json({error: "Password must be at least 6 character long"}); 
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({username:username, email: email, password: hashedPassword});
        if(newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();
            res.status(201).json(newUser);
        } else {
            res.status(400).json({ error: error.message });
        }
    } catch (error) {
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.findByIdAndDelete(id);

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error.message);
        res.status(500).json({ error: error.message });
    }
};


export const login = async (req ,res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const  isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid username or password"});
        };

       generateTokenAndSetCookie(user.id, res);

        return res.status(200).json({email: user.email});

        } catch (error) {
        console.log("Error in login controller", error.message);
        return res.status(500).json({error: "Internal Server Error"});

    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge:0});
        res.status(200).json({message: "Log out succesfully"})
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error: "Internal Server error"});
    }
};

export const cards = async (req, res) => {
    try {
        res.status(200).json({message: "Täällä ollaan"});

    } catch (error) {
        console.log("Error in cards controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
};


export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getMe controller", error.message); 
        res.status(500).json({error: "Internal Server Error"});
    }
};
