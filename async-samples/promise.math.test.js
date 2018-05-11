const expect = require('expect');
const { add, div, mul, sub } = require('./promise.math');

describe('testing for math functions', () => {
	it('should add correcly', (done) => {
		add(40, 2).then( r => {
			expect(r).toBe(42);
			done();
		});
	});
	it('should div correcly', (done) => {
		div(84, 2).then( r => {
			expect(r).toBe(42);
			done();
		});
	});

	it('should sub correcly', (done) => {
		sub(44, 2).then( r => {
			expect(r).toBe(42);
			done();
		});
	});
	
	it('should mul correcly', (done) => {
		mul(21, 2).then( r => {
			expect(r).toBe(42);
			done();
		});
	});
});
