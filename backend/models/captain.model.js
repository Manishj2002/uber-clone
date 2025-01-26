const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'firstname must be at least 3 characters long']
        },
        lastName: {
            type: String,
            minlength: [3, 'lastname must be at least 3 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicleDetails: {  // Changed from 'vehical' to 'vehicleDetails'
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least 3 characters long']
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, 'Plate must be at least 3 characters long']
        },
        capacity: {
            type: Number,
            required: true,
            min: 1
        },
        vehicleType: {  // Changed from 'vehicalType' to 'vehicleType'
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto']
        }
    },
    location: {
        lat: {
            type: Number,
        },
        lng: { // Corrected field name
            type: Number,
        }
    }
}, { timestamps: true });

// Instance Methods
captainSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

captainSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Static Methods
captainSchema.statics.hashPassword = async function(password) {
    return bcrypt.hash(password, 10);
};

const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;
