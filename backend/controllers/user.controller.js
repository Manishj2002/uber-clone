const { validationResult } = require('express-validator');
const UserService = require('../services/user.service');
const UserModel = require('../models/user.model');
const BlacklistTokenModel = require('../models/blacklistToken.model.js');
module.exports.registerUser = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { fullname, email, password } = req.body;
    const isAlreadyRegistered = await UserModel.findOne({ email });
    if (isAlreadyRegistered) {
        return res.status(400).json({ error: 'Email already exists' });
    }

    try {
        // Hash the password
        const hashedPassword = await UserModel.hashPassword(password);


        // Create a new user
        const user = await UserService.createUser({
            firstName: fullname.firstname, // Correct field name
            lastName: fullname.lastname || '', // Optional field
            email,
            password: hashedPassword,
        });

        // Generate a token
        const token = user.generateAuthToken();

        res.status(201).json({ user, token });
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error
            res.status(400).json({ error: 'Email already exists' });
        } else {
            console.error('Error:', error.message);
            res.status(500).json({ error: 'Server error' });
        }
    }
};

module.exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    
    try {
        const user = await UserModel.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const isPasswordMatch = await UserModel.comparePassword(password, user.password);
        
        if (!isPasswordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = user.generateAuthToken();
        res.cookie("token",token)
        
        res.status(200).json({ user, token });
        
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};


module.exports.getUserProfile = async (req, res) => {

    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res) => {
        res.clearCookie("token");
        const token =
            req.cookies?.token || req.headers.authorization?.split(' ')[1];

        // Save the token to the blacklist
        await BlacklistTokenModel.create({ token });

        res.status(200).json({ message: "Logged out successfully" });
    }


