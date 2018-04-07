const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/task');

const Task = mongoose.model('Task', {
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  date: {
    type: Date,
    required: true,
    default: null
  },
  done: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = Task
