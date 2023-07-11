const Employee = require('../models/employee');
const CheckInAssign = require('./../models/check_in_assign')
const CheckOutAssign = require('./../models/check_out_assign');

const getCheckInAssign = async (req, res) => {
    try {
    const {emp_id} = req.body;
      if (!emp_id) {
        return res.json({
          status: false,
          message: 'Emp_id is compulsory',
          taskList: "",
        });
      }
      let checkInAssignRecord = await CheckInAssign.find({ emp_id: emp_id });

      if (checkInAssignRecord && checkInAssignRecord.length) {
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
        taskList: "",
      });
    }
}

const getCheckOutAssign = async (req, res) => {
  try {
    const { emp_id } = req.body;
    if (!emp_id) {
      return res.json({
        status: false,
        message: 'Emp_id is compulsory',
        taskList: "",
      });
    }
    let checkOutAssignRecord = await CheckOutAssign.find({ emp_id: emp_id });

    if (checkOutAssignRecord && checkOutAssignRecord.length) {
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
      taskList: "",
    });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    let fetchAllEmployees = await Employee.find();
    if(fetchAllEmployees){
      return res.json({
        status: true,
        message: 'success',
        employees: fetchAllEmployees,
      })
    }
    else{
      return res.json({
        status: false,
        message: 'failure',
        employees: "",
      })
    }
    
  } catch (error) {
    return res.json({
      status: false,
      message: error.message,
      taskList: '',
    });
  }
}

module.exports = { getCheckInAssign, getCheckOutAssign, getAllEmployees };