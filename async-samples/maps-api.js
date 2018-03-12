const request = require('request');
const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=43%20Evergreen%20Terrace';

request({
  url,
  json: true
}, (err, response, body) => {
  if (err) { console.log('Error ocurred: ', err); }
//  console.log('Response from api: ', response);
// stringify: string, filter, spaces_for_indentation
  console.log(JSON.stringify(body, undefined, 4));
})
