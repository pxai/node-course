const add = async (a,b) =>  {
		if (typeof a != 'number' || typeof b != 'number')
			return new Error(`Incorrect non-numeric arguments ${a}, ${b}`);	

		return (a+b);
};

const div = async (a, b) => {
		if (b === 0) { return new Error('Cannot divide by zero!!'); }

		return (a/b);
};

const sub = async (a, b) => {
		if (typeof a != 'number' || typeof b != 'number')
			return new Error(`incorrect non-numeric arguments ${a}, ${b}`);

		return (a- b);
};

const mul = async (a, b) => {
		if (typeof a != 'number' || typeof b != 'number')
			return new Error(`incorrect non-numeric arguments ${a}, ${b}`);

		return (a*b);
};

const calculate = async (a,b) => {
return await add(a,b);
}

calculate(40,2).then(r=>console.log(r)).catch(e=>console.log(e));

module.exports = { add, div, mul, sub };
