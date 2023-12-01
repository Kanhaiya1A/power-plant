const Employee = require('./../employee/employee_model');
const CheckInTask = require('./../check_in_task/check_in_task_model');
const CheckInTrack = require('./check_in_track_model');
const HandOver = require('./hand_over');
const CheckOutTask = require('./../check_out_task/check_out_task_model');

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
      image,
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
      image: image,
    });
    if (saveData) {
      if (hand_over == 'true') {
        let fetchTaskTable = await CheckInTask.findOne({ task_id });
        let employee = await Employee.findOne({ emp_id });
        if (!fetchTaskTable) {
          return res.json({
            status: false,
            message: 'task not found',
          });
        }
        const { shift_id, task_name } = fetchTaskTable;
        let handOver = await HandOver.create({
          task_id: task_id,
          task_name: task_name,
          shift_id: shift_id,
          department: employee?.department,
          assign_to_id: hand_over_emp_id,
          assign_to_name: hand_over_emp_name,
          assign_by_id: emp_id,
          assign_by_name: employee?.emp_name,
          remarks: remarks,
          approved: false,
          type: 'checkintrack',
        });
        if (handOver) {
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

const getHandOverData = async (req, res) => {
  try {
    const emp_id = req.body.emp_id;
    const employee = await Employee.findOne({ emp_id: emp_id });
    if (!employee) {
      return res.status(404).json({
        status: false,
        message: 'Employee not found',
      });
    }
    const department = employee?.department;
    const handOver = await HandOver.find({
      department: department,
      approved: false,
    });

    res.status(200).json({
      status: true,
      data: handOver,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const handOverApproved = async (req, res) => {
  try {
    const emp_id = req.body.emp_id;
    const handOverTableId = req.body.id;
    const employee = await Employee.findOne({ emp_id: emp_id });
    if (!employee) {
      return res.status(404).json({
        status: false,
        message: 'Employee not found',
      });
    }

    const handOver = await HandOver.findOne({ _id: handOverTableId });
    handOver.approved = true;
    await handOver.save();
    // console.log(handOver);
    const taskId = generateTaskId();
    // console.log(taskId);

    if (handOver && handOver.type == 'checkintrack') {
      const findCheckInTask = await CheckInTask.findOne({
        task_id: handOver?.task_id,
      });
      // console.log('findCheckInTask', findCheckInTask);
      if (findCheckInTask) {
        const checkInTask = new CheckInTask({
          task_id: taskId,
          shift_id: findCheckInTask?.shift_id,
          task_name: findCheckInTask?.task_name,
          is_repeat: findCheckInTask?.is_repeat,
          task_icon: findCheckInTask?.task_icon,
          description: findCheckInTask?.description,
          emp_id: handOver?.assign_to_id,
          is_remarks_mandatory: findCheckInTask?.is_remarks_mandatory,
          is_photo_mandatory: findCheckInTask?.is_photo_mandatory,
        });
        await checkInTask.save();
      }
    } else if (handOver && handOver.type == 'checkouttrack') {
      const findCheckOutTask = await CheckOutTask.findOne({
        task_id: handOver?.task_id,
      });
      if (findCheckOutTask) {
        const checkOutTask = new CheckInTask({
          task_id: taskId,
          shift_id: findCheckOutTask?.shift_id,
          task_name: findCheckOutTask?.task_name,
          is_repeat: findCheckOutTask?.is_repeat,
          task_icon: findCheckOutTask?.task_icon,
          description: findCheckOutTask?.description,
          emp_id: handOver?.assign_to_id,
          is_remarks_mandatory: findCheckOutTask?.is_remarks_mandatory,
          is_photo_mandatory: findCheckOutTask?.is_photo_mandatory,
        });
        await checkOutTask.save();
      }
    }
    res.status(200).json({
      status: true,
      message: 'Success',
    });
  } catch (error) {
    res.status(200).json({
      status: false,
      message: error.message,
    });
  }
};

function generateTaskId() {
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number
  const randomSixDigitNumber =
    Math.floor(Math.random() * (max - min + 1)) + min;

  return randomSixDigitNumber.toString(); // Convert to string to ensure it's always 6 digits
}

module.exports = { CreateCheckInTrack, getHandOverData, handOverApproved };
