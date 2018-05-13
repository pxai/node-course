const expect = require('expect');
const { add, sub, mul, div } = require('./asyncawait.math.js');

describe('Testing for async await math functions', () => {
    it('Should add correctly',() => {
		const result = await add(40,2);
		expect(result).toEqual(42);
    });
}); 

