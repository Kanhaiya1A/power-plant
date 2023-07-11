const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let employeeSchema = new Schema(
  {
    emp_id: {
      type: 'string',
      primaryKey: true,
      required: true,
      unique: true,
    },
    emp_name: {
      type: 'string',
      required: true,
    },
    emp_username: {
      type: 'string',
      required: true,
    },
    emp_password: {
      type: 'string',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
