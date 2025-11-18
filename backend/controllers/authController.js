import User from "../models/user.js";


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
        const  isPasswordCorrect = await User.findOne({password}); //myöhemmin bcrypt
        
        if (!user || !isPasswordCorrect) {
            return res.status(400).json({error: "Invalid username or password"});
        };

       // generateTokenAndSetCookie(user.id, res);

        res.status(200).json({message:"Login succesfully"});

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error: "Internal Server Error"});

    }
};