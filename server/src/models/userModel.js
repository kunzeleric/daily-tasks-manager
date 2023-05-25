const mongoose = require('mongoose');
const validator = require('validator');

const schema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: 'required field!',
        },
        email: {
            type: String,
            unique: true,
            required: 'required field!',
            lowercase: true,
            index: true,
            validate: {
                validator: (typedValue) => { return validator.isEmail(typedValue)},
                message: 'invalid email address'
            }
        },
        password: {
            type: String,
            required: 'required field!',
            select: false,
        },
    },
    {
        timestamps: true
    }
);

const UserSchema = mongoose.model('User', schema);
module.exports = UserSchema;