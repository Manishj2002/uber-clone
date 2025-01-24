const { validationResult } = require('express-validator');
const captainService = require('../services/captain.service');
const captainModel = require('../models/captain.model.js');
module.exports.registerCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, fullname, password, vehical } = req.body;


        // Check if captain already exists
        const hashPassword = await captainModel.hashPassword(password);
        const captainExists = await captainModel.findOne({email});
        if (captainExists) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Create new captain using service
        const captain = await captainService.createCaptain({
            firstName: fullname.firstName,
            lastName: fullname.lastName,
            email,
            password,
                color:vehical.color,
                plate:vehical.plate,
                capacity:vehical.capacity,
                vehicalType:vehical.vehicalType
            
        });

        // Generate JWT token
        const token = captain.generateAuthToken();

        res.status(201).json({
            message: 'Captain registered successfully',
            token,
            captain
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Server error' });
    }
};


