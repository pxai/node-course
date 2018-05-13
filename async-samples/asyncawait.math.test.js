const expect = require('expect');
const { add, sub, mul, div } = require('./asyncawait.math.js');

describe('Testing for async await math functions', () => {
    it('Should add correctly',(done) => {
		add(40,2).then(result => {
			expect(result).toEqual(42);
			done();
		});
    });

	it('should sub correctly', (done) => {
		sub(44,2).then(result => {
			expect(result).toEqual(42);
			done();
		});
	});
}); 

