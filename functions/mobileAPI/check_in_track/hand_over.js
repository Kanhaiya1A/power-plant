const mongoose = require('mongoose');

const handOverSchema = mongoose.Schema(
  {
    task_id: {
      type: String,
    },
    task_name: {
      type: String,
    },
    shift_id: {
      type: String,
    },
    department: {
      type: String,
    },
    assign_by_id: {
      type: String,
    },
    assign_by_name: {
      type: String,
    },
    remarks: {
      type: String,
    },
    assign_to_id: {
      type: String,
    },
    assign_to_name: {
      type: String,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const HandOver = mongoose.model('HandOver', handOverSchema);
module.exports = HandOver;
