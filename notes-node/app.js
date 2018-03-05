console.log('Here we are: ', process.argv)
const file = require('fs')
const _ = require('lodash')
const notes = require('./notes')
const yargs = require('yargs');

const argv = yargs.argv;
var command = argv._[0];

console.log(argv)
console.log(process.argv)
console.log(`Received command: ${command}`)
if (command === 'add') {
	console.log('Adding note : ', argv.title, argv.body)
	notes.addNote(argv.title, argv.body);
} else if (command === 'list') {
	console.log('List command');
	notes.getAll();
} else if ( command === 'show') {
	console.log('Show command');
	notes.getNote(argv.title)
} else if ( command === 'update'){
	console.log('Update command');
} else if ( command === 'delete') {
	console.log('Delete command');
	notes.removeNote(argv.title);
} else {
	console.log('Unknown command');
}
