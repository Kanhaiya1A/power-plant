const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkOutAssign = new Schema(
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

const CheckOutAssign = mongoose.model('CheckOutAssign', checkOutAssign);
module.exports = CheckOutAssign;
