const User = require('../models/User');  
const bcrypt = require('bcrypt');       


exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
       
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);

       
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        
        await newUser.save();

        res.status(201).json({
            message: "Signup successful",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
      
        res.status(500).json({ message: error.message });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
       
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid email" });

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid password" });

        
        res.json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        
        res.status(500).json({ message: error.message });
    }
};
