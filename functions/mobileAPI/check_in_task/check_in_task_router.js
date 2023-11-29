const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const checkInTaskController = require('./check_in_task_controller');

router.post(
  '/getCheckInTask',
  upload.none(),
  checkInTaskController.getCheckInTask
);
// router.post(
//   '/getCheckOutAssign',
//   upload.none(),
//   checkInAssignController.getCheckOutAssign
// );

// router.get('/getAllEmployees', checkInAssignController.getAllEmployees);
// router.post(
//   '/getEmployeesWithId',
//   upload.none(),
//  checkInAssignController.getEmployeesWithId
// );

module.exports = router;
