const express = require('express');
const router = express.Router();
const checkoutAssign = require('./../models/check_out_assign')
router.use('/create', require('./commone_router'));
router.use('/employeeLogin', require('./login_router'));
router.use('/get', require('./checkInApi_router'));



module.exports = router ;