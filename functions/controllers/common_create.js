const Employee = require('../models/employee');
const CheckInTask = require('./../models/check_in_task');
const CheckOutTask = require('./../models/check_out_task');
const CheckInAssign = require('./../models/check_in_assign');
const CheckOutAssign = require('./../models/check_out_assign');
const CheckInTrack = require('./../models/check_in_track');
const CheckOutTrack = require('./../models/check_out_track');

const CreateEmployee = async (req, res) => {
  const { emp_id, emp_name, emp_username, emp_password } = req.body;
  // console.log(req.body);
  try {
    let existenceEmpId = await Employee.findOne({ emp_id: emp_id });
    // console.log(existenceEmpId);

    if (existenceEmpId != null && existenceEmpId.emp_id === emp_id) {
      return res.json({
        status: false,
        message: 'Employee id already exists',
      });
    }

    let saveData = await Employee.create({
      emp_id: emp_id,
      emp_name: emp_name,
      emp_username: emp_username,
      emp_password: emp_password,
    });

    if (saveData) {
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

const CreateCheckInTask = async (req, res) => {
  try {
    const { task_id, shift_id, task_name } = req.body;
    if (!task_id && !shift_id && !task_name) {
      return res.json({
        status: false,
        message: 'All fields are required',
      });
    }
    let saveData = await CheckInTask.create({
      task_id: task_id,
      shift_id: shift_id,
      task_name: task_name,
    });
    if (saveData) {
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

const CreateCheckOutTask = async (req, res) => {
  try {
    const { task_id, shift_id, task_name } = req.body;
    if (!task_id && !shift_id && !task_name) {
      return res.json({
        status: false,
        message: 'All fields are required',
      });
    }
    let saveData = await CheckOutTask.create({
      task_id: task_id,
      shift_id: shift_id,
      task_name: task_name,
    });
    if (saveData) {
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


const CreateCheckInAssign = async (req, res) => {
  try {
    const { task_id, task_name, shift_id, emp_id } = req.body;
    if (!task_id && !task_name && !shift_id && !emp_id) {
      return res.json({
        status: false,
        message: 'All fields are required',
      });
    }
    let saveData = await CheckInAssign.create({
      task_id: task_id,
      task_name: task_name,
      shift_id: shift_id,
      emp_id: emp_id,
    });
    if (saveData) {
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

const CreateCheckOutAssign = async (req, res) => {
  try {
    const { task_id, task_name, shift_id, emp_id } = req.body;
    if (!task_id && !task_name && !shift_id && !emp_id) {
      return res.json({
        status: false,
        message: 'All fields are required',
      });
    }
    let saveData = await CheckOutAssign.create({
      task_id: task_id,
      task_name: task_name,
      shift_id: shift_id,
      emp_id: emp_id,
    });
    if (saveData) {
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
      current_day: new Date().getDay(),
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
        let saveData = await CheckInAssign.create({
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
  CreateEmployee,
  CreateCheckInTask,
  CreateCheckOutTask,
  CreateCheckInTrack,
  CreateCheckOutTrack,
  CreateCheckInAssign,
  CreateCheckOutAssign,
};
