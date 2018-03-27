const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // Use default promises
mongoose.connect('mongodb://localhost:27017/sample');

const Friend = mongoose.model('Friend', {
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    default: null
  },
  age: {
    type: Number,
    required: false,
    default: 42
  }
});

const newFriend = new Friend({
  name: 'Imaginary',
  email: 'none@wer.com'
});

newFriend.save().then((friend) => {
  console.log('Saved friend: ', friend);
}, (e) => {
  console.log('Error', e);
})
