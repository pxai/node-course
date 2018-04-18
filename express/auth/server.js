require('./config')

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb');
const { mongoose, Stock, User } = require('./models');
const {authenticate} = require('./middleware/authenticate');
const PORT = process.env.PORT || 3000;


const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({result : 'OK'});
});

app.get('/stocks', (req, res) => {
    Stock.find().then((stocks) => {
      res.status(200).send({stocks});
    }).catch((err) => {
      err.details = 'Error getting stocks';
      if (err) return res.send({err});
    })
});


app.get('/stocks/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).send({err :{details: 'Id not valid'}});
  }
    Stock.findById({_id: req.params.id}).then((stock) => {
        res.status(200).send({stock});
    }).catch((err) => {
      err.details = 'Record Not found';
      if (err) return res.status(404).send({err});
    })

});


app.delete('/stocks/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).sennewd({err :{details: 'Id not valid'}});
  }
    Stock.findOneAndRemove({_id: req.params.id}).then((stock) => {
      res.status(200).send({stock});
    }).catch((err) => {
      err.details = 'Record Not found';
      if (err) return res.status(404).send({err});
    })
});


app.post('/stocks', (req, res) => {
console.log('Pre-save', req.body)
  const newStock = new Stock({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    id_user: req.body.id_user
  });
console.log('Saving:', newStock);
  newStock.save().then((stock) => {
    res.status(200).send({stock});
  }).catch((err) => {
      console.log('Failed creation: ', newStock, err)
    err.details = 'Could not create record';
    if (err) return res.status(404).send({err});
  })
});


app.put('/stocks/:id', (req, res) => {
  console.log(req.params.id)
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).send({err :{details: 'Id not valid'}});
  }
  const id = req.params.id;
  const updatedStock = {
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    id_user: req.body.id_user
  };

  Stock.findByIdAndUpdate(id, {$set: updatedStock}, {new: true}).then((stock) => {
    res.status(200).send({stock});
  }).catch((err) => {
    err.details = 'Error updating';
    if (err) return res.status(404).send({err});
  })
});


// POST /users
app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

  console.log('POST user: ', body)

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(PORT, () => {
    console.log(`This works in ${process.env.NODE_ENV} mode on ${PORT}`);
});

module.exports.app = app;
