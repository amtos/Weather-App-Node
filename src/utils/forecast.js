const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/7396fbe94219078021495a171fd51ab7/'+latitude+','+longitude+'?units=si'
    // using property shorthand
    request({ url, json: true},(error, { body }) => {
        if(error)
        {
            // error object is not null for low - level errors like 
            // poor internet connection
            callback('Error: Unable to connect to weather service', undefined)
        }
        else if(body.error)
        {
            // error tag is there when we don't give valid coordinates
            callback('Error: Unable to find the location for weather service', undefined)
        }
        else
        {
            callback(undefined, body.daily.data[0].summary + " It is currently "+ body.currently.temperature+" degrees out with a "+ body.currently.precipProbability*100+"% chance of rain. For today, temperator may rise up to highs of "+body.daily.data[0].temperatureMax+" degrees and dip to lows of "+body.daily.data[0].temperatureMin+" degrees.")
            
        }
       
    })

    
}

module.exports = forecast