const express = require('express');
const router = express.Router();

const checkInTrackController = require('./check_in_track_controller');

router.post('/createCheckInTrack', checkInTrackController.CreateCheckInTrack);

module.exports = router;
