var mymiddle = (req, res, next) => {
  console.log(`My middleware> ${req.method} ${req.url}`);
  next();
};


module.exports = mymiddle;
