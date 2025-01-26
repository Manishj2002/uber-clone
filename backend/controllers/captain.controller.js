const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken'); // Add this import
const captainService = require('../services/captain.service');
const captainModel = require('../models/captain.model');
const BlacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res) => {
    try {
        console.log('Received registration data:', req.body); // Debug log

        const { email, password, fullname, vehicleDetails } = req.body;

        // Explicit field validation
        if (!email || !password || !fullname.firstName || !fullname.lastName || 
            !vehicleDetails.color || !vehicleDetails.plate || 
            !vehicleDetails.capacity || !vehicleDetails.vehicleType) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Hash the password
        const hashedPassword = await captainModel.hashPassword(password);

        // Create new captain
        const newCaptain = new captainModel({
            email,
            password: hashedPassword, // Use hashed password
            fullname,
            vehicleDetails
        });

        // Save captain
        const savedCaptain = await newCaptain.save();
        
        // Generate token
        const token = jwt.sign(
            { id: savedCaptain._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Remove password from response
        savedCaptain.password = undefined;

        res.status(201).json({
            captain: savedCaptain,
            token
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        res.status(500).json({ 
            message: 'Registration failed', 
            error: error.message 
        });
    }
};

module.exports.loginCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Check if captain exists
        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check if password is correct
        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = captain.generateAuthToken();
        res.cookie('token', token);
        res.status(200).json({ token, captain });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
};

module.exports.getCaptainProfile = async (req, res) => {
    res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await BlacklistTokenModel.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
};
