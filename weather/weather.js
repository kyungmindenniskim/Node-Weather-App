const request = require('request');

var getWeather = (lat, lng, callback) => {
  request({
     url: `https://api.darksky.net/forecast/1739fbe350b7de927398eaa6270c5f95/${lat},${lng}`
    ,json: true
  }, (error, response, body) => {
    if(!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to connect to Farecast.io server.');
    }
  });
}

module.exports.getWeather = getWeather;
