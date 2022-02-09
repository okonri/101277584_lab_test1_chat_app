const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({


    username: {
        type: String,
        required: [true, 'type a username'],
        trim: true,
        lowercase: true

    },

    firstname: {
        type: String,
        required: [true, 'type your first name'],
        trim: true,
        lowercase: true

    },
    lastname: {
        type: String,
        required: [true, 'type your last name'],
        trim: true,
        lowercase: true

    },
    password: {
        type: String,
        required: [true, 'type a password'],
        trim: true,
        lowercase: true

    },

    createon: {
        type: Date,
        default: Date.now,

    }

});


const User = mongoose.model("User", UserSchema);
module.exports = User;