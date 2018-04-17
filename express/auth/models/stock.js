const mongoose = require('mongoose');

var StockSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  qty: {
    type: Number,
    require: true,
    default: 0
  },
  price: {
      type: Number,
      require: true,
      min: 0,
      default: 0
  },
  id_user: {
    type: String,
    require: true
  }
});


var Stock = mongoose.model('Stock', StockSchema);

module.exports = {Stock}
