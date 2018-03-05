
// What happens with arrows?
// does not bidn this or args array!!!!
var addNote = (title, body) => {
	console.log('added note', title, body)
	return 'Added note'
}
var getAll = () => {
	console.log('Showing all');
}

var getNote = (title) => {
	console.log('Getting note', title)
}

var removeNote = (title) => {
	console.log('Note removed, title');
}
module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote
}
