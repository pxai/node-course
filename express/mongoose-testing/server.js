const express = require('express');
const hbs = require('hbs');
const Friend = require('./friend');

var app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));

//hbs.registerHelper('each');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/ok', (req, res) => {
    res.status(200).send('All right all right all right');
});

app.get('/friends', (req, res) => {
    Friend.find().then((friends) => {
      console.log(friends)
      res.status(200).render('friends', {friends});
    }).catch((err) => {
      if (err) return res.status(404).send(err);
    })
});

app.get('/friends/delete/:id', (req, res) => {
  console.log(req.params.id);
    Friend.remove({_id: req.params.id}).then((friend) => {
      res.status(200).redirect('/friends');
    }).catch((err) => {
      if (err) return res.status(404).render('404');
    })
});

app.get('/api/friends', (req, res) => {
    Friend.find().then((friends) => {
      res.status(200).send(friends);
    }).catch((err) => {
      if (err) return res.status(404).send(err);
    })

});

app.get('/api/friends/:id', (req, res) => {
  console.log(req.params.id);
    Friend.find({_id: req.params.id}).then((friend) => {
      res.status(200).send(friend);
    }).catch((err) => {
      if (err) return res.status(404).send(err);
    })

});


app.listen(3000, () => {
    console.log('This works on 3000, you don\'t');
});

module.exports.app = app;
