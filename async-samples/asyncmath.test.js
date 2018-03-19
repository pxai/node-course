const expect = require('expect');
const asyncmath = require('./asyncmath');

// it will finish when done is called
it('should add async', (done) => {
  asyncmath.add(40,2, (sum) => {
    expect(sum).toBe(42);//.toBeA('number');
    done();
  });
});

it('should mul async', (done) => {
  asyncmath.mul(4,4, (mul) => {
    expect(mul).toBeA('number');
    done();
  });
});
