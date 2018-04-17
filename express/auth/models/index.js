const mongoose = require('mongoose');
const { User } = require('./user');
const  { Stock } = require('./stock');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
  mongoose,
  User,
  Stock
};
