
var between = (min, max) => {
  return Math.round(Math.random() * (max-min-1)) + min;
};

var plusOrMinus = (min, max) => {
  let signs = ['+', '-']
  return signs[between(0,2)];
}

module.exports = {
  between,
  plusOrMinus
};
