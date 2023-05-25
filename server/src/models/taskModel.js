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
        creatorUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: 'required field!'
        }
    },
    {
        timestamps: true
    }
);

const TaskSchema = mongoose.models.Task || mongoose.models('Task', schema);
module.exports = TaskSchema;