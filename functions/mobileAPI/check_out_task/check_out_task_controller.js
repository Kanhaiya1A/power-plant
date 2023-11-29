const Employee = require('./../employee/employee_model');
const CheckOutTask = require('./check_out_task_model');

const getCheckOutTask = async (req, res) => {
  try {
    const { emp_id } = req.body;
    if (!emp_id) {
      return res.json({
        status: false,
        message: 'Emp_id is compulsory',
        taskList: '',
      });
    }
    let checkOutAssignRecord = await CheckOutTask.aggregate([
      {
        $lookup: {
          from: 'checkouttracks',
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
          as: 'checkouttracks',
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
          description: 1,
          is_repeat: 1,
          is_remarks_mandatory: 1,
          is_photo_mandatory: 1,
          remarks: { $slice: ['$checkouttracks.remarks', -1] }, //'$checkintracks.remarks',
          status: { $slice: ['$checkouttracks.status', -1] }, //'$checkintracks.status',
          hand_over: { $slice: ['$checkouttracks.hand_over', -1] }, //'$checkintracks.hand_over',
          task_icon: 1,
        },
      },
    ]);
    checkOutAssignRecord.sort((a, b) => a.task_name.localeCompare(b.task_name));

    if (checkOutAssignRecord) {
      return res.json({
        status: true,
        message: 'success',
        taskList: checkOutAssignRecord,
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



module.exports = {
  getCheckOutTask,
};
