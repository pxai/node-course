const MongoClient = require('mongodb').MongoClient;
const test = require('assert');


MongoClient.connect('mongodb://localhost:27017/sample', (err, client) => {
  if (err) {
    return console.log('Error connecting with Mongo:', err);
  }
  console.log('OK! connected to MongoDB');
  const db = client.db('sample'); // v3
  db.collection('friends').find().count().then((count) => {
      console.log('My friedns ', count);
  }, (err) => {
    console.err('Some error ocurred.');
    console.err(err);
  });
  client.close();
});
