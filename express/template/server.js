const express = require('express');
const hbs = require('hbs');

// nodemon server.js -e js, hbs
var app = express();


app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('authorName', () => {
  return 'Pello Altadill';
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

hbs.registerHelper('toUpper', (msg) => {
  return msg.toUpperCase()
})
app.use(express.static(__dirname + '/public'));

app.get('/sample', (req, res) =>  {
  res.render('sample.hbs');
});

app.get('/other', (req, res) =>  {
  res.render('other.hbs', {
    name: 'James',
    age: 55
  });
});

app.listen(3000, () => {
  console.log('Ok, server on');
});
