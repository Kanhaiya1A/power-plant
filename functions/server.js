const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer();
const commonUrl = '/.netlify/functions/server';

const serverless = require('serverless-http');
// const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./config/mongoose');


app.use(bodyParser.json());
app.use(cors());
// dotenv.config({ path: '.env' });
app.use(express.json());
app.use(express.urlencoded());

// app.use('/api', require('./routes'));
app.use(`${commonUrl}/mobileApi/employeeLogin`, require('./mobileAPI/employee/employee_router'));
app.use(
  `${commonUrl}/mobileApi/checkInTask`,
  require('./mobileAPI/check_in_task/check_in_task_router')
);
app.use(
  `${commonUrl}/mobileApi/checkOutTask`,
  require('./mobileAPI/check_out_task/check_out_task_router')
);
app.use(
  `${commonUrl}/mobileApi/checkInTrack`,
  require('./mobileAPI/check_in_track/check_in_track_router')
);
app.use(
  `${commonUrl}/mobileApi/checkOutTrack`,
  require('./mobileAPI/check_out_track/check_out_track_router')
);


const port = 5000;
const server = app.listen(port, () => {
  console.log(`server is running at port no. ` + port);
});

module.exports.handler = serverless(app);