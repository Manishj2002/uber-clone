const { validationResult } = require('express-validator');
const captainService = require('../services/captain.service');
const captainModel = require('../models/captain.model');
const BlacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, fullname, password, vehical } = req.body;

        // Check if captain already exists
        const captainExists = await captainModel.findOne({ email });
        if (captainExists) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Create new captain using service
        const captain = await captainService.createCaptain({
            firstName: fullname.firstName,
            lastName: fullname.lastName,
            email,
            password,
            color: vehical.color,
            plate: vehical.plate,
            capacity: vehical.capacity,
            vehicalType: vehical.vehicalType,
        });

        // Generate JWT token
        const token = captain.generateAuthToken();

        res.status(201).json({
            message: 'Captain registered successfully',
            token,
            captain,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Server error' });
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
        console.error(error);
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
