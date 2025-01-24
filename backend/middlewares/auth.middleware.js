const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }

    const isBlacklisted = await userModel.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).send({ error: 'unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
       return next();
    } catch (err) {
        res.status(401).send({ error: 'Invalid token' });
    }
};

