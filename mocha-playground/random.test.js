const expect = require('expect');
const random = require('./random');

it('should have random function', () => {
  expect(random.between(0,10)).toBeGreaterThanOrEqual(0);
  expect(random.between(0,10)).toBeLessThanOrEqual(10);
});

it('should have bigger number than min', () => {
  for (let i=0;i<100;i++)
    expect(random.between(i,100)).toBeGreaterThanOrEqual(i);
});

it('should be less than max', () => {
  for (let i=1;i<100;i++)
    expect(random.between(0,i)).toBeLessThan(i);
});

it('should generate plus or minus', () => {
    expect(random.plusOrMinus()).toMatch(/\+|\-/)
});
