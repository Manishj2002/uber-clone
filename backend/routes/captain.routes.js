const express = require('express');
const { body } = require('express-validator');
const { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain } = require('../controllers/captain.controller');
const { authCaptain } = require('../middlewares/auth.middleware');
const router = express.Router();

// Register route with validation
router.post('/register', [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('fullname.firstName').isLength({ min: 3 }).withMessage('firstname must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehical.color').isLength({ min: 3 }).withMessage('Vehicle color must be at least 3 characters long'),
    body('vehical.plate').isLength({ min: 3 }).withMessage('Vehicle plate must be at least 3 characters long'),
    body('vehical.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
    body('vehical.vehicalType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type')
], registerCaptain);
router.post('/login',[
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],loginCaptain)

router.get('/profile',authCaptain,getCaptainProfile);

router.get('/logout',authCaptain,logoutCaptain);



module.exports = router;
