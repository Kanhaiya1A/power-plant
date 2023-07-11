const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkInTrack = new Schema(
    {
        emp_id: {
            type: 'string',
            required: true,
        },
        task_id:{
            type: 'string',
            required: true,
        },
        remarks: {
            type: 'string',
            // required: true,
        },
        status: {
            type: 'boolean',
            // required: true,
        }
    }, {
        timestamps: true,
    }
);

const CheckInTrack = mongoose.model('CheckInTrack', checkInTrack);
module.exports = CheckInTrack;