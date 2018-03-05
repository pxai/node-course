console.log('HEre is notes module');
module.exports.age = 25;

module.exports.addNoteF = function () {
	console.log('add note')
	return 'Added note'
}

// What happens with arrows?
// does not bidn this or args array!!!!
module.exports.addNote = () => {
	console.log('ady2yy2yd note')
	return 'Added note'
}
