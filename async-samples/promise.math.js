const add = (a,b) => {
	return new Promise((resolve,reject) => {
		if (typeof a != 'number' || typeof b != 'number')
			reject(`Incorrect non-numeric arguments ${a}, ${b}`);	
		resolve(a+b);
	});
};

const div = (a, b) => {
	return new Promise((resolve,reject) => {
		if (b === 0) { reject('Cannot divide by zero!!'); }
		resolve(a/b);
	});
};
/*
add(40,2)
	.then(result => console.log(result))
	.catch(e => console.log(e));

div(84,0)
	.then(result => console.log(result))
	.catch(e => console.log(e)); 
*/
module.exports = { add, div };
