const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/sample', (err, client) => {
  if (err) {
    return console.log('Error connecting with Mongo:', err);
  }
  console.log('OK! connected to MongoDB');
  const db = client.db('sample'); // v3

  db.collection('friends').insertOne({
    name: 'Guy Incognito',
    email: 'nope@noone.no'
  }, (err, result) => {
    if (err) return console.log('Error inserting record');
    console.log('Record inserted> ', result.ops[0], result.ops[0]._id, result.ops[0].getTimestamp());
  });

  db.collection('friends').find({}, (err, result) => {
    if (err) return console.log('Error querying data', err);

    console.log('Query result: ', result);
  });

/*  db.collection('friends').find({name: 'John'}, (err, result) => {
    if (err) return console.log('Error querying data', err);

    console.log('Query result: ', result.ops[0]._id);
  });*/

  client.close();
});
