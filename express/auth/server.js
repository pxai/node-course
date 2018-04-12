require('./config')
const express = require('express');
const Task = require('./task');
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb');
const PORT = process.env.PORT || 3000;


const app = express();

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//hbs.registerHelper('each');


app.get('/', (req, res) => {
    res.send({result : 'OK'});
});

app.get('/tasks', (req, res) => {
    Task.find().then((tasks) => {
      res.status(200).send({tasks});
    }).catch((err) => {
      err.details = 'Error getting tasks';
      if (err) return res.send({err});
    })
});


app.get('/tasks/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).send({err :{details: 'Id not valid'}});
  }
    Task.findById({_id: req.params.id}).then((task) => {
        res.status(200).send({task});
    }).catch((err) => {
      err.details = 'Record Not found';
      if (err) return res.status(404).send({err});
    })

});


app.delete('/tasks/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).send({err :{details: 'Id not valid'}});
  }
    Task.findOneAndRemove({_id: req.params.id}).then((task) => {
      res.status(200).send({task});
    }).catch((err) => {
      err.details = 'Record Not found';
      if (err) return res.status(404).send({err});
    })
});


app.post('/tasks/new', (req, res) => {

  const newTask = new Task({
    name: req.body.name,
    date: new Date(),
    done: req.body.done
  });

  newTask.save().then((task) => {
    res.status(200).send({task});
  }).catch((err) => {
      console.log('Failed creation: ', newTask, err)
    err.details = 'Could not create record';
    if (err) return res.status(404).send({err});
  })
});


app.put('/tasks/update/:id', (req, res) => {

  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).send({err :{details: 'Id not valid'}});
  }
  const newTask = {
    name: req.body.name,
    date: new Date(),
    done: req.body.done
  };

  Task.findByIdAndUpdate({_id: req.body._id},
    { $set: newTask },
    { new: true}).then((task) => {
    res.status(200).send({task});
  }).catch((err) => {
    err.details = 'Error updating';
    if (err) return res.status(404).send({err});
  })
});

app.listen(PORT, () => {
    console.log(`This works in ${process.env.NODE_ENV} mode on ${PORT}`);
});

module.exports.app = app;
