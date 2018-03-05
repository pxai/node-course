console.log('Here we are: ', process.argv)
const file = require('fs')
const _ = require('lodash')
const notes = require('./notes')
var command = process.argv[2];
console.log(`Received command: ${command}`)
if (command === 'add') {
	console.log('Adding note')
} else if (command === 'list') {
	console.log('List command');
} else if ( command === 'show') {
	console.log('Show command');
} else if ( command === 'update'){
	console.log('Update command');
} else if ( command === 'delete') {
	console.log('Delete command');
} else {
	console.log('Unknown command');
}
notes.addNote()
