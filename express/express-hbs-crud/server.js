require('./config')
const express = require('express');
const hbs = require('hbs');
const Task = require('./task');
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb');
const PORT = process.env.PORT || 3000;

hbs.registerHelper('select', function(selected, options) {
    return options.fn(this).replace(
        new RegExp(' value=\"' + selected + '\"'),
        '$& selected="selected"');
});

const app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//hbs.registerHelper('each');


app.get('/', (req, res) => {
    res.render('index');
});



app.get('/tasks', (req, res) => {
    Task.find().then((tasks) => {
      res.status(200).render('tasks', {tasks});
    }).catch((err) => {
      err.details = 'Error getting tasks';
      if (err) return res.render('404', {err});
    })
});


app.get('/tasks/detail/:id', (req, res) => {

  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).render('404', {err :{details: 'Id not valid'}});
  }

    Task.findById({_id: req.params.id}).then((task) => {
        res.status(200).render('detail', {task});
    }).catch((err) => {
      err.details = 'Record Not found';
      if (err) return res.status(404).render('404', {err});
    })

});


app.get('/tasks/delete/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).render('404', {err :{details: 'Id not valid'}});
  }

    Task.remove({_id: req.params.id}).then((friend) => {
      res.status(200).redirect('/tasks');
    }).catch((err) => {
      err.details = 'Record Not found';
      if (err) return res.status(404).render('404', {err});
    })
});

app.get('/tasks/new', (req, res) => {
      res.status(200).render('new');
});

app.post('/tasks/new', (req, res) => {

  const newTask = new Task({
    name: req.body.name,
    date: new Date(),
    done: req.body.done
  });

  newTask.save().then((task) => {
    console.log('Created: ', task)
    res.status(200).redirect('/tasks');
  }).catch((err) => {
      console.log('Failed creation: ', newTask, err)
    err.details = 'Could not create record';
    if (err) return res.status(404).render('404', {err});
  })
});

app.get('/tasks/update/:id', (req, res) => {

  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).render('404', {err :{details: 'Id not valid'}});
  }

  Task.findById({_id: req.params.id}).then((task) => {
      res.status(200).render('update', {task});
  }).catch((err) => {
    err.details = 'Record Not found';
    if (err) return res.status(404).render('404', {err});
  })
});

app.post('/tasks/update', (req, res) => {
    console.log('LLEGA?',req.body)
  const newTask = {
    name: req.body.name,
    date: new Date(),
    done: req.body.done
  };

  Task.findByIdAndUpdate({_id: req.body._id},
    { $set: newTask },
    { new: true}).then((task) => {
    res.status(200).redirect('/tasks');
  }).catch((err) => {
    err.details = 'Error updating';
    if (err) return res.render('404', {err});
  })
});

app.listen(PORT, () => {
    console.log(`This works in ${process.env.NODE_ENV} mode on ${PORT}`);
});

module.exports.app = app;
