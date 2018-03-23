const MongoClient = require('mongodb').MongoClient;

// Pulling out properties, object de-structure
//It's a way to get parts from an object
var friend = {name: 'John', email: 'j@ohn.us'};
var {name} = friend;

console.log(name); // John
console.log({name}); // { name: 'John'}
