const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkInTrack = new Schema(
  {
    emp_id: {
      type: 'string',
      required: true,
    },
    task_id: {
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
    },
    hand_over: {
      type: 'boolean',
    },
    hand_over_approved: {
      type: 'boolean',
      default: false,
    },
    hand_over_emp_id: {
      type: 'string',
    },
    hand_over_emp_name: {
      type: 'string',
    },
    latitude: {
      type: 'string',
    },
    longitude: {
      type: 'string',
    },
    image: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const CheckInTrack = mongoose.model('CheckInTrack', checkInTrack);
module.exports = CheckInTrack;
