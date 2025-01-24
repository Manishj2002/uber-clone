const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstName: {
            type: String,
            required: true,
            minlength: [3,'firstname must be at least 3 characters long']
        },
        lastName: {
            type: String,
            minlength: [3,'firstname must be at least 3 characters long']
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
        enum:['active','inactive'],
        default: 'inactive'
    },
    vehical:{
        color:{
            type:String,
            required:true,
            minlength: [3,'Color must be at least 3 characters long']
        },
        plate:{
            type:String,
            required:true,
            minlength: [3,'Plate must be at least 3 characters long']
        },
        capacity:{
            type:Number,
            required:true,
            min:1
        },
        vehicalType:{
            type:String,
            required:true,
            enum:['car','motorcycle','auto']
        }

    },
    location:{
        lat:{
            type:Number,
        
        },
        lan:{
            type:Number,
        }
    }
});

captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{expiresIn:'24h'});
    return token;
};

captainSchema.statics.comparePassword = async function (candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
};


captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};


const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;