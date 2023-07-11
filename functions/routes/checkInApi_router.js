const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const checkInAssignController = require('../controllers/checkInApi_controller');

router.post(
  '/getCheckInAssign',
  upload.none(),
  checkInAssignController.getCheckInAssign
);
router.post(
  '/getCheckOutAssign',
  upload.none(),
  checkInAssignController.getCheckOutAssign
);

router.get('/getAllEmployees', checkInAssignController.getAllEmployees);

module.exports = router;
