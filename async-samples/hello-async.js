console.log('This is the start')
setTimeout( () => { console.log('executed after 2 secs.')}, 2000)
setTimeout( () => { console.log('executed after 0 secs.')}, 0)
console.log('This is the end')

/*
This is the start
This is the end
executed after 0 secs.
executed after 2 secs.
*/
