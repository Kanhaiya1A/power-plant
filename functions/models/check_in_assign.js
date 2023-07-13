const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkInAssign = new Schema(
  {
    task_id: {
      type: 'string',
      required: true,
      unique: true,
    },
    task_name: {
      type: 'string',
      required: true,
    },
    shift_id: {
      type: 'string',
      required: true,
    },
    emp_id: {
      type: 'string',
      required: true,
    },
    // checkInTrack: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'CheckInTrack',
    //   },
    // ],
  },
  { timestamps: true }
);

const CheckInAssign = mongoose.model('CheckInAssign', checkInAssign);
module.exports = CheckInAssign;