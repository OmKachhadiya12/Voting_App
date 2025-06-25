const mongoose = require('mongoose');
const { type } = require('os');
const { boolean } = require('webidl-conversions');
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    email:{
        type: String
    },
    phone:{
        type: String
    },
    aadharNumber:{
        type: Number,
        required: true,
        unique: true
    },
    addres:{
        type: String
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['voter','admin'],
        default: 'voter'
    },
    isVoted:{
        type: Boolean,
        default: false
    }

});

const User = mongoose.model('User',userSchema);

module.exports = User;