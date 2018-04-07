const express = require('express');
const hbs = require('hbs');
const Task = require('./task');

var app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));

//hbs.registerHelper('each');

app.get('/', (req, res) => {
    res.render('index');
});


app.get('/tasks', (req, res) => {
    Task.find().then((tasks) => {
      console.log(tasks)
      res.status(200).render('tasks', {tasks});
    }).catch((err) => {
      if (err) return res.status(404).send(err);
    })
});

app.get('/tasks/:id', (req, res) => {
  console.log(req.params.id);
    Friend.find({_id: req.params.id}).then((task) => {
        res.status(200).render('detail', {task});
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


app.listen(3000, () => {
    console.log('This works on 3000, you don\'t');
});

module.exports.app = app;
