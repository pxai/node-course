const MongoClient = require('mongodb').MongoClient;

var friend = {name: 'John', email: 'j@ohn.us'};
var {name} = friend;

console.log(name);
console.log({name});
