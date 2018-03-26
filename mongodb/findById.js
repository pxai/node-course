const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/sample', (err, client) => {
  if (err) {
    return console.log('Error connecting with Mongo:', err);
  }
  console.log('OK! connected to MongoDB');
  const db = client.db('sample'); // v3
  db.collection('friends').find({
    _id: new ObjectID('5ab4b352c9d5d83a0010f808')
    }).toArray().then((docs) => {
      console.log('My friedns');
      console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.err('Some error ocurred.');
    console.err(err);
  });

  //db.close();
});
