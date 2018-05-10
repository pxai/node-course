const expect = require('expect');
const { add, div } = require('./promise.math');

describe('testing for math functions', () => {
	it('should add correcly', (done) => {
		add(40, 2).then( r => {
			expect(r).toBe(42);
			done();
		});
	});
});
