const request = require('request');
const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=43%20Evergreen%20Terrace';

request({
  url,
  json: true
}, (err, response, body) => {
  if (err) { console.log('Error ocurred: ', err); }
//  console.log('Response from api: ', response);
  console.log(JSON.stringify(body));
})
