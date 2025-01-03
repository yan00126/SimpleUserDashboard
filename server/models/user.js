const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true ,'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim:true,
        validate: {
            validator: function (v) {
              return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Regex for email format
            },
            message: props => `${props.value} is not a valid email format!`
        }
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlenth:[6,'password must be at least 6 characters long']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    age: {
        type: Number,
        default: 18,
        min: [0, 'Age must be a positive number'],
        validate: {
            validator: Number.isInteger,
            message: 'Age must be integer',
        },
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
