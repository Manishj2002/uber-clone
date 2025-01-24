const express = require('express');
const { body } = require('express-validator');
const { registerUser } = require('../controllers/user.controller');

const router = express.Router();

// Register route
router.post('/register', [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('firstname must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],registerUser);

module.exports = router;