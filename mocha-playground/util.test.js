const expect = require('expect')
const util = require('./util')

it('should just work', () => {
    if (util.add(40,2) !== 42) {
      throw new Error('Add does not work')  
    }
})

it('should just work as expected', () => {
    expect(util.add(40,2)).toEqual(42)
})