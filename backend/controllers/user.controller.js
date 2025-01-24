const { validationResult } = require('express-validator');
const UserService = require('../services/user.service');
const UserModel = require('../models/user.model');

module.exports.registerUser = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    const { fullname, email, password } = req.body;

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