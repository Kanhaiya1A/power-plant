const express = require('express');
const router = express.Router();

const reportcontroller = require('../controllers/check_report_controller');

router.get('/checkInReport', reportcontroller.checkInReport);
router.get('/checkOutReport', reportcontroller.checkOutReport);


module.exports = router;
