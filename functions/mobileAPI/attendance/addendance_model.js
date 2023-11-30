const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema(
  {
    emp_id: {
      type: String,
    },
    emp_name: {
      type: String,
    },
    role: {
      type: String,
    },
    department: {
      type: String,
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    type: {
      type: String,
    },
    check_in_time: {
      type: String,
    },
    check_out_time: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;