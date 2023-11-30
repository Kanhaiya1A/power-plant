const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const loginControllers = require('./employee_controller');

router.post('/login', upload.none(), loginControllers.login);
router.post(
  '/getEmployeesWithId',
  upload.none(),
  loginControllers.getEmployeesWithId
);
router.post(
  '/getEmployeeReport',
  upload.none(),
  loginControllers.getEmployeeReport
);

module.exports = router;
