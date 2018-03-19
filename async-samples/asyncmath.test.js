const expect = require('expect');
const asyncmath = require('./asyncmath');

// it will finish when done is called
it('should add async', (done) => {
  asyncmath.add(40,2, (sum) => {
    expect(sum).toBe(42);//.toBeA('number');
    done();
  });
});

it('should substract async', (done) => {
  asyncmath.sub(44, 2, (sub) => {
      expect(sub).toBe(42);
      done();
  })
})

it('should mul async', (done) => {
  asyncmath.mul(4,4, (mul) => {
    expect(mul).toBe(16);
    done();
  });
});

it('shoud divide async', (done) => {
  asyncmath.div(84,2, (div) => {
    expect(div).toBe(42);
    done();
  });
})
