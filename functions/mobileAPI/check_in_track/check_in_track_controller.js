const Employee = require('./../employee/employee_model');
const CheckInTask = require('./../check_in_task/check_in_task_model');
const CheckInTrack = require('./check_in_track_model');

const CreateCheckInTrack = async (req, res) => {
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
    if (!emp_id && !task_id) {
      return res.json({
        status: false,
        message: 'Emp_id and task_id are required',
      });
    }
    let saveData = await CheckInTrack.create({
      emp_id: emp_id,
      task_id: task_id,
      remarks: remarks,
      status: status,
      hand_over: hand_over,
      hand_over_emp_id: hand_over_emp_id,
      hand_over_emp_name: hand_over_emp_name,
      latitude: latitude,
      longitude: longitude,
    });
    if (saveData) {
      // add create checkInassign
      // console.log('hand_over', hand_over);
      if (hand_over == 'true') {
        // console.log('save*****************************8');
        // console.log(typeof task_id);

        let fetchTaskTable = await CheckInTask.findOne({ task_id });
        let employee = await Employee.findOne({ emp_id });
        console.log('fetchTaskTable', fetchTaskTable);
        if (!fetchTaskTable) {
          return res.json({
            status: false,
            message: 'failure',
          });
        }
        const { shift_id, task_name } = fetchTaskTable;
        let saveData = await CheckInTask.create({
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

module.exports = { CreateCheckInTrack };
