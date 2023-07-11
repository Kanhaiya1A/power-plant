const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer();

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

app.use('/api', require('./routes'));
// app.use('/.netlify/functions/index', require('./routes'));

const port = 3000;
const server = app.listen(port, () => {
  console.log(`server is running at port no. ` + port);
});

// module.exports.handler = serverless(app);