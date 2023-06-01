const mongoose = require('mongoose');
const validator = require('validator');

const schema = new mongoose.Schema(
    {
        position:{
            type: Number,
            required: 'required field!',
        },
        title: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            required: 'required field!'
        },
        deliveryDate: {
            type: Date,
            default: null,
        },
        userCreator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: 'required field!'
        }
    },
    {
        timestamps: true
    }
);

const TaskSchema = mongoose.model('Task', schema);
module.exports = TaskSchema;