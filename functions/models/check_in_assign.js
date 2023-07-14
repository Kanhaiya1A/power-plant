const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkInAssign = new Schema(
  {
    task_id: {
      type: 'string',
      required: true,
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
  },
  { timestamps: true }
);

const CheckInAssign = mongoose.model('CheckInAssign', checkInAssign);
module.exports = CheckInAssign;