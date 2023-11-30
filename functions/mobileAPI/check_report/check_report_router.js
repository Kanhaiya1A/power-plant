const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer();

const reportcontroller = require('./check_report_controller');

router.get('/checkInReport', reportcontroller.checkInReport);
router.get('/checkOutReport', reportcontroller.checkOutReport);

router.post('/checkInReportView', upload.none(), reportcontroller.checkInReportView);
router.post('/checkOutReportView', upload.none(), reportcontroller.checkOutReportView);


module.exports = router;