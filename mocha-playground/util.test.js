const expect = require('expect')
const util = require('./util')

it('should just work', () => {
    if (util.add(40,2) !== 42) {
      throw new Error('Add does not work')  
    }
})

it('should just add as expected', () => {
    expect(util.add(40,2)).toBe(42)
})

it('should multiply correctly', () => {
    expect(util.multiply(2,3)).toBe(6)
})

it('should divide correctly', () => {
    expect(util.divide(6,3)).toBe(2)
})

it ('should substract correctly', () => {
    expect(util.substract(46,4)).toBe(42)
})