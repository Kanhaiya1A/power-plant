const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let checkOutTask = new Schema(
    {
        task_id: {
            type: 'string',
            required: true,
            unique: true,
            // primaryKey: true,
        },
        shift_id: {
            type: 'string',
            required: true,
        },
        task_name: {
            type: 'string',
            required: true,
        },
    }, {
        timestamps: true,
    }
);

const CheckOutTask = mongoose.model('CheckOutTask', checkOutTask);
module.exports = CheckOutTask;