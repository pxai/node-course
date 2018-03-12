const request = require('request');
const url = 'https://api.github.com/zen';

request({
  url,
  headers: {
    'User-Agent': 'Me, myself and I'
  },
  json: true
}, (err, response, body) => {
  if (err) { console.log('Error ocurred: ', err); }
  console.log(body);
})
