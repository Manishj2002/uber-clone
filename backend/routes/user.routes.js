const express = require('express');
const { body } = require('express-validator');
const { registerUser, loginUser, getUserProfile, logoutUser } = require('../controllers/user.controller');
const { authUser } = require('../middlewares/auth.middleware');

const router = express.Router();

// Register route
router.post('/register', [
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('firstname must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],registerUser);
router.post('/login',[
    body('email').isEmail().withMessage('Enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],loginUser);

router.get('/profile',authUser,getUserProfile);
router.get('/logout',authUser,logoutUser);
module.exports = router;