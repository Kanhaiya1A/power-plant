const Attendance = require('./addendance_model');

const attendanceStart = async (req, res) => {
  try {
    const {
      emp_id,
      emp_name,
      role,
      department,
      latitude,
      longitude,
      check_in_time,
    } = req.body;

    const attendance = new Attendance({
      emp_id: emp_id,
      emp_name: emp_name,
      role: role || 'user',
      department: department || 'transport',
      latitude: latitude || ' ',
      longitude: longitude || ' ',
      type: 'start',
      check_in_time: check_in_time || new Date(),
    });
    await attendance.save();
    res.status(200).json({
      status: true,
      message: 'Attendance marked successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const attendanceEnd = async (req, res) => {
  try {
    const {
      emp_id,
      emp_name,
      role,
      department,
      latitude,
      longitude,
      check_out_time,
    } = req.body;

    const attendance = new Attendance({
      emp_id: emp_id,
      emp_name: emp_name,
      role: role || 'user',
      department: department || 'transport',
      latitude: latitude || ' ',
      longitude: longitude || ' ',
      type: 'end',
      check_out_time: check_out_time || new Date(),
    });
    await attendance.save();
    res.status(200).json({
      status: true,
      message: 'Attendance marked successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

const getAttendanceOfEmployee = async(req, res) => {
  try {
    const {emp_id} = req.body;
    if(!emp_id){
      return res.status(404).json({
        status: false,
        message: "ID not found"
      })
    }
    const employees = await Attendance.find({emp_id});
    res.status(200).json({
      status: true,
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message,
    })
  }
}

module.exports = { attendanceStart, attendanceEnd, getAttendanceOfEmployee };
