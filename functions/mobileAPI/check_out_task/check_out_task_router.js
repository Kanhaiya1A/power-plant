const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const checkInTaskController = require('./check_out_task_controller');

// router.post(
//   '/getCheckInAssign',
//   upload.none(),
//   checkInAssignController.getCheckInAssign
// );
router.post(
  '/getCheckOutTask',
  upload.none(),
  checkInTaskController.getCheckOutTask
);



module.exports = router;
