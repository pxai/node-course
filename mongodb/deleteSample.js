const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/sample', (err, client) => {
  if (err) {
    return console.log('Error connecting with Mongo:', err);
  }
  console.log('OK! connected to MongoDB');
  const db = client.db('sample'); // v3


  db.collection('friends').deleteMany(
    {name: 'Guy Incognito'}
  ).then((result) => {
      console.log('Deleted: ', result.result);
  }, (err) => {
    console.err(err);
  });

  db.collection('friends').deleteOne({
    _id: new ObjectID('5ab4b352c9d5d83a0010f808')
    }  ).then((result) => {
      console.log('Deleted: ', result.result);
  }, (err) => {
    console.err(err);
  });


  db.collection('friends').findOneAndDelete({
    _id: new ObjectID('5ab4b352c9d5d83a0010f808')
  }  ).then((doc) => {
      console.log('Deleted doc: ', doc);
  }, (err) => {
    console.err(err);
  });

client.close();
});
