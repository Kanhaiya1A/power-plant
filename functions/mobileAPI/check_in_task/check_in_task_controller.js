const Employee = require('./../employee/employee_model');
// const CheckInAssign = require('./../models/check_in_assign');
const CheckInTask = require('./check_in_task_model')

const getCheckInTask = async (req, res) => {
  try {
    const { emp_id } = req.body;
    if (!emp_id) {
      return res.json({
        status: false,
        message: 'Emp_id is compulsory',
        taskList: '',
      });
    }
    let checkInAssignRecord = await CheckInTask.aggregate([
      {
        $lookup: {
          from: 'checkintracks',
          let: { field1Value: '$task_id', field2Value: '$emp_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$task_id', '$$field1Value'] },
                    { $eq: ['$emp_id', '$$field2Value'] },
                  ],
                },
              },
            },
            // Add any additional pipeline stages if needed
          ],
          as: 'checkintracks',
        },
      },
      {
        $match: {
          emp_id: emp_id,
        },
      },
      {
        $project: {
          _id: 0,
          task_id: 1,
          task_name: 1,
          shift_id: 1,
          emp_id: 1,
          is_repeat: 1,
          description: 1,
          is_remarks_mandatory: 1,
          is_photo_mandatory: 1,
          remarks: { $slice: ['$checkintracks.remarks', -1] }, //'$checkintracks.remarks',
          status: { $slice: ['$checkintracks.status', -1] }, //'$checkintracks.status',
          hand_over: { $slice: ['$checkintracks.hand_over', -1] }, //'$checkintracks.hand_over',
          task_icon: 1,
        },
      },
    ]);
    checkInAssignRecord.sort((a, b) => a.task_name.localeCompare(b.task_name));

    // console.log('checkInAssignRecord', checkInAssignRecord);

    if (checkInAssignRecord) {
      //&& checkInAssignRecord.length) {
      return res.json({
        status: true,
        message: 'success',
        taskList: checkInAssignRecord,
      });
    } else {
      return res.json({
        status: false,
        message: 'Invalid employee id or task is empty',
        taskList: '',
      });
    }
  } catch (error) {
    return res.json({
      status: false,
      message: error.message,
      taskList: '',
    });
  }
};

module.exports = { getCheckInTask };
