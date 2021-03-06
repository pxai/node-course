const MongoClient = require('mongodb').MongoClient;

// Pulling out properties, object de-structure
//It's a way to get parts from an object
var friend = {name: 'John', email: 'j@ohn.us'};
var {name} = friend;

console.log(name); // John
console.log({name}); // { name: 'John'}


MongoClient.connect('mongodb://localhost:27017/sample', (err, client) => {
  if (err) {
    return console.log('Error connecting with Mongo:', err);
  }
  console.log('OK! connected to MongoDB');
  const db = client.db('sample'); // v3
  db.collection('friends').find().toArray().then((docs) => {
      console.log('My friedns');
      console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.err('Some error ocurred.');
    console.err(err);
  });
client.close();
});
