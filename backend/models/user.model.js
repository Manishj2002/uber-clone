const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullname: {
        firstName: {
            type: String,
            required: true,
            minlength: 3
        },
        lastName: {
            type: String,
            required: false
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String,
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
};

userSchema.statics.comparePassword = async function (candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
};


userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};


const User = mongoose.model('User', userSchema);

module.exports = User;