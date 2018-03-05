console.log('Here we are')
const file = require('fs')
const os = require('os')
const user = os.userInfo();
const notes = require('./notes')
const math = require('./math')
const _ = require('lodash')

var  numbers = [5,8,2,5,2,7,8]
console.log(_.uniq(numbers))
console.log('Let seei ' + math.add(40,2));
console.log('Let seei ' + math.del(40,2));
console.log(`Your age is ${notes.age}`)
console.log(user);
file.appendFile('sample.txt','Hello ' + user.username, function (err) {
	if (err) console.log("Error: " + err)
	console.log('ok, we wrote something');
});
notes.addNote()
console.log(`How cool was that ${user.username}?`)
