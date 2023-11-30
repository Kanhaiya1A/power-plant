const express = require('express');
const router = express.Router();

const checkInTrackController = require('./check_in_track_controller');

router.post('/createCheckInTrack', checkInTrackController.CreateCheckInTrack);

router.post('/getHandOverData', checkInTrackController.getHandOverData);

router.post('/handOverApproved', checkInTrackController.handOverApproved);

module.exports = router;
