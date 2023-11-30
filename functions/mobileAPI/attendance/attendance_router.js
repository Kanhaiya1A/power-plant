const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const attendanceController = require('./attendance_controller')

router.post('/attendanceStart', upload.none(), attendanceController.attendanceStart);
router.post('/attendanceEnd', upload.none(), attendanceController.attendanceEnd);

module.exports = router;