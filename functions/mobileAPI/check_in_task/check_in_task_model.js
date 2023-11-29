const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let checkInTask = new Schema(
  {
    task_id: {
      type: 'string',
      required: true,
      unique: true,
    },
    shift_id: {
      type: 'string',
      required: true,
    },
    task_name: {
      type: 'string',
      required: true,
    },
    is_repeat: {
      type: Boolean,
      default: false,
    },
    task_icon: {
      type: String,
    },
    description: {
      type: String, // actual task name
    },
    emp_id: {
      type: 'string',
      required: true,
    },
    is_remarks_mandatory: {
      type: Boolean,
      default: true,
    },
    is_photo_mandatory: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const CheckInTask = mongoose.model('CheckInTask', checkInTask);
module.exports = CheckInTask;
