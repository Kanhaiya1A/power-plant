const Employee = require('../models/employee');

const login = async (req, res) => {
  try {
    const emp_username = (req.body.emp_username);
    const emp_password = (req.body.emp_password);

    if (!emp_username || !emp_password) {
      return res.json({
        status: false,
        message: 'emp_id, username and password are required',
        employeeId: "",
        employeeName: "",
      });
    }
    let employee = await Employee.findOne({
      emp_username: emp_username,
      emp_password: emp_password,
    });


    if (employee == null) {
      return res.json({
        status: false,
        message: 'Invalid Credentials',
        employeeId: '',
        employeeName: '',
      });
    }

    if (
      employee.emp_username == emp_username &&
      employee.emp_password == emp_password
    ) {
      return res.json({
        status: true,
        message: 'verified',
        employeeId: employee.emp_id,
        employeeName: employee.emp_name,
      });
    }
  } catch (error) {
    return res.json({
      status: false,
      message: 'error.message',
      employeeId: '',
      employeeName: '',
    });
  }
};

module.exports = { login };
