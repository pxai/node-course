
var add = (a,b, callback) => {
  setTimeout(() => {
    callback(a+b);
 },1000); // Mocha fails if it akes longer than 2 secs
};

var sub = (a, b, callback) => {
  setTimeout(()=>{
    callback(a - b);
  }, 1000);
};
var mul = (a,b, callback) => {
  setTimeout(()=>{
      callback(a * b);
  }, 1000);
};

var div = (a,b,callback) => {
  setTimeout(()=>{
    callback(a / b);
  },1000);
};

module.exports = {
  add,
  sub,
  mul,
  div
}
