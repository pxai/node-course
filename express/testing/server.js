const express = require('express');
const expect = require('expect');

var app = express();

app.get('/', (req, res) => {
    res.send('Hell of a World');
});

app.get('/ok', (req, res) => {
    res.status(200).send('All right all right all right');
});

app.get('/data', (req, res) => {
    res.status(200).send({
        id: 42,
        name: 'Asimov'
    })
});

app.listen(3000, () => {
    console.log('This works on 3000, you don\'t');
});

module.exports.app = app;