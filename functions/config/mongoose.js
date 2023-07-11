const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://kanhaiya:Kanhaiya%408521@cluster0.nuedtkl.mongodb.net/power-plant'
);

// Kanhaiya%408521

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

db.once('open', function () {
  console.log('Connected to Database :: MongoDB');
});

module.exports = db;
