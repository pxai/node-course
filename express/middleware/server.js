const express = require('express');
const mymiddle = require('./mymiddle');

var app = express();

// Basic middleware
app.use((req, res, next) => {
  console.log('Middleware> ', new Date().toString(), '> Requested page.');
  next();
});

console.log(mymiddle)
app.use(mymiddle);

app.get('/', (req, res) => {
  res.send('This works');
});

app.listen(3000, () => {
  console.log('Ok, ready to go');
});

module.exports.app = app;
