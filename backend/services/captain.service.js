const CaptainModel = require('../models/captain.model');

module.exports.createCaptain = async ({ firstName, lastName, email, password, color,plate,capacity,vehicalType }) => {
    if (!firstName || !email || !password || !color || !plate || !capacity || !vehicalType) {
        throw new Error('All fields are required');
    }

    // Hash password before creating captain
    const hashedPassword = await CaptainModel.hashPassword(password);

    const newCaptain = await CaptainModel.create({
        fullname: {
            firstName,
            lastName,
        },
        email,
        password: hashedPassword,
        vehical:{
            color,
            plate,
            capacity,
            vehicalType
        }
    });

    return newCaptain;
};


