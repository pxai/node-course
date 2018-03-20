const express = require('express')

var app = express();

app.get('/', (req, res ) => {
  res.send('It works');
});

app.get('/hello', (req, res) => {
  res.send('<h1>This has some HTML</h1>');
});

app.get('/object', (req, res) => {
  res.send({
    id: 666,
    user: 'john_doe',
    tech : [ 'c#', 'js', 'mongodb']
  });
});

app.get('/wrong', (req, res) => {
  res.send({
    errorMessage: "Unable to handle request"
  });
});

app.listen(3000);
