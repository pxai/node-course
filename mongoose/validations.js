const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // Use default promises
mongoose.connect('mongodb://localhost:27017/sample');

const Friend = mongoose.model('Friend', {
  name: {
    type: String
  },
  email: {
    type: String
  }
});

const newFriend = new Friend({
  name: 'Imaginary'
});

newFriend.save().then((friend) => {
  console.log('Saved friend: ', friend);
}, (e) => {
  console.log('Error', e);
})
