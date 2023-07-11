const express = require('express');
const router = express.Router();

const commonControllers = require('../controllers/common_create');

router.post('/createEmployee', commonControllers.CreateEmployee);
router.post('/createCheckInTask', commonControllers.CreateCheckInTask);
router.post('/createCheckOutTask', commonControllers.CreateCheckOutTask);
router.post('/createCheckInTrack', commonControllers.CreateCheckInTrack);
router.post('/createCheckInAssign', commonControllers.CreateCheckInAssign);
router.post('/createCheckOutAssign', commonControllers.CreateCheckOutAssign);
router.post('/createCheckOutTrack', commonControllers.CreateCheckOutTrack);


module.exports = router;
