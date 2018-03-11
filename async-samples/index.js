const callbacks = require('./callbacks')

callbacks.asyncThingy('Hello', () => {
    console.log('This is the callback');
})

callbacks.asyncThingyWithReturn(21, (a) => {
    console.log('Result was: ', a);
})