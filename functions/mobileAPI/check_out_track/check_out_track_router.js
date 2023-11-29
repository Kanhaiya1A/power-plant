const express = require('express');
const router = express.Router();

const checkOutTrackController = require('./check_out_track_controller');

router.post('/createCheckOutTrack', checkOutTrackController.CreateCheckOutTrack);

module.exports = router;
