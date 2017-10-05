const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode.js');
const weather = require('./weather/weather.js')

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);

geocode.GetGeocode(encodedAddress, (errorMessage, Results) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    console.log(Results.address);
    // lat, lng, callback
    weather.getWeather(Results.latitude,Results.longtitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}`);
      }
    });
  }
});
