const Employee = require('./../employee/employee_model');
const CheckOutTask = require('./../check_out_task/check_out_task_model');
const CheckOutTrack = require('./check_out_track_model');

const CreateCheckOutTrack = async (req, res) => {
  try {
    const {
      emp_id,
      task_id,
      remarks,
      status,
      hand_over,
      hand_over_emp_id,
      hand_over_emp_name,
      latitude,
      longitude,
    } = req.body;
    console.log(req.body);
    if (!emp_id && !task_id) {
      return res.json({
        status: false,
        message: 'Emp_id and task_id are required',
      });
    }
    let saveData = await CheckOutTrack.create({
      emp_id: emp_id,
      task_id: task_id,
      remarks: remarks,
      status: status,
      hand_over: hand_over,
      hand_over_emp_id: hand_over_emp_id,
      hand_over_emp_name: hand_over_emp_name,
      current_day: new Date().getDay(),
      latitude: latitude,
      longitude: longitude,
    });
    console.log('save', saveData);
    if (saveData) {
      if (hand_over == 'true') {
        let fetchTaskTable = await CheckOutTask.findOne({ task_id });
        let employee = await Employee.findOne({ emp_id });
        if (!fetchTaskTable) {
          return res.json({
            status: false,
            message: 'failure',
          });
        }
        const { shift_id, task_name } = fetchTaskTable;
        let saveData = await CheckOutAssign.create({
          task_id: task_id,
          task_name:
            task_name +
            ' assign by ' +
            employee.emp_name +
            ' With remarks: ' +
            remarks,
          shift_id: shift_id,
          emp_id: hand_over_emp_id,
        });
        if (saveData) {
          return res.json({
            status: true,
            message: 'successfully assign the task!',
          });
        }
      }

      return res.json({
        status: true,
        message: 'saved successfully',
      });
    } else {
      return res.json({
        status: false,
        message: 'Not saved successfully',
      });
    }
  } catch (error) {
    return res.json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  CreateCheckOutTrack,
};
