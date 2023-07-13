const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let checkInTask = new Schema(
  {
    task_id: {
      type: 'string',
      required: true,
      // unique: true,
    },
    shift_id: {
      type: 'string',
      required: true,
    },
    task_name: {
      type: 'string',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CheckInTask = mongoose.model('CheckInTask', checkInTask);
module.exports = CheckInTask;
