const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const loginControllers = require('../controllers/login_controller');

router.post('/login', upload.none(), loginControllers.login);

module.exports = router;
