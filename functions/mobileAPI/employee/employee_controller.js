const Employee = require('./employee_model');

const login = async (req, res) => {
  try {
    const emp_username = req.body.emp_username;
    const emp_password = req.body.emp_password;

    if (!emp_username || !emp_password) {
      return res.json({
        status: false,
        message: 'emp_id, username and password are required',
        employeeId: '',
        employeeName: '',
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
        role: employee.role,
        department: employee.department,
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

const getEmployeesWithId = async (req, res) => {
  try {
    const { emp_id } = req.body;
    let validEmployeeId = await Employee.find({ emp_id });
    if (validEmployeeId.length == 0) {
      return res.json({
        status: false,
        message: 'employee not found',
        employees: '',
      });
    }
    let fetchEmployees = await Employee.find();

    fetchEmployees = fetchEmployees.filter((employee) => {
      return (
        employee.emp_id != emp_id &&
        employee.department == validEmployeeId[0].department &&
        employee.role == validEmployeeId[0].role
      );
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

const getEmployeeReport = async (req, res) => {
  try {
    const { emp_id, } = req.body;
    let validEmployeeId = await Employee.find({ emp_id });
    if (validEmployeeId.length == 0) {
      return res.json({
        status: false,
        message: 'employee not found',
        employees: '',
      });
    }
    let fetchEmployees = await Employee.find();

    fetchEmployees = fetchEmployees.filter((employee) => {
      return (
        employee.emp_id != emp_id &&
        employee.department == validEmployeeId[0].department &&
        employee.role != validEmployeeId[0].role
      );
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

module.exports = { login, getEmployeesWithId, getEmployeeReport };
