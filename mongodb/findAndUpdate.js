const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/sample', (err, client) => {
  if (err) {
    return console.log('Error connecting with Mongo:', err);
  }
  console.log('OK! connected to MongoDB');
  const db = client.db('sample'); // v3
  db.collection('friends').findOneAndUpdate({   // (filter, update, options, callback)
    _id: new ObjectID('5ab4b352c9d5d83a0010f808')
  }, {$set: {name: 'updated'}}
  ,{returnOriginal: false}).then((docs) => {
      console.log('My updated friedns');
      console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.err('Some error ocurred.');
    console.err(err);
  });

  client.close();
});
