var asyncThingy = (param, callback) => {
    console.log('This is the param: ', param);
    callback();
}

var asyncThingyWithReturn = (param, callback) => {
    console.log('This is the param: ', param);
    callback(param*2);
}

module.exports = {
    asyncThingy,
    asyncThingyWithReturn
}