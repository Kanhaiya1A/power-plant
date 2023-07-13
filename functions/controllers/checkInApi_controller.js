const Employee = require('../models/employee');
const CheckInAssign = require('./../models/check_in_assign')
const CheckOutAssign = require('./../models/check_out_assign');

const getCheckInAssign = async (req, res) => {
    try {
    const {emp_id} = req.body;
    // console.log(checkinassigns.emp_id);
      if (!emp_id) {
        return res.json({
          status: false,
          message: 'Emp_id is compulsory',
          taskList: "",
        });
      }
      let checkInAssignRecord = await CheckInAssign.aggregate([
        {
          $lookup: {
            from: 'checkintracks',
            localField: 'task_id',
            foreignField: 'task_id',
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
            remarks: { "$slice": ["$checkintracks.remarks", -1] }, //'$checkintracks.remarks',
            status: '$checkintracks.status',
            hand_over: '$checkintracks.hand_over',
          },
        },
      ]);

      // console.log('checkInAssignRecord', checkInAssignRecord);

      if (checkInAssignRecord ){//&& checkInAssignRecord.length) {
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
      employees: '',
    });
  }
}

const getEmployeesWithId = async (req, res) => {
  try {
    const {emp_id} = req.body;
    let validEmployeeId = await Employee.find({emp_id});
    if(validEmployeeId.length == 0) {
      return res.json({
        status: false,
        message: 'failure',
        employees: "",
      });
    }
    let fetchEmployees = await Employee.find();

    fetchEmployees = fetchEmployees.filter((employee) => {
      return employee.emp_id != emp_id;
    });
    if (fetchEmployees) {
      return res.json({
        status: true,
        message: 'success',
        employees: fetchEmployees,
      });
    } else {
      return res.json({
        status: false,
        message: 'failure',
        employees: '',
      });
    }
  } catch (error) {
    return res.json({
      status: false,
      message: error.message,
      employees: '',
    });
  }
};

module.exports = {
  getCheckInAssign,
  getCheckOutAssign,
  getAllEmployees,
  getEmployeesWithId,
};