const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiemVrNDk1cm9hZCIsImEiOiJjanoxcTJlc3MwNGYzM29sNzhwbm8wc2k0In0.OVKNqF5hvx5RedIOFKXp4Q'
    // property shorthand for url and destructuring response for body
    request({url, json: true},(error, { body }) => {
        if(error)
        {
            callback('Error: Unable to connect to MapBox service', undefined)
        }
        else if(body.features.length==0)
        {
            callback('Error: Unable to find location for MapBox service', undefined)
        }
        else
        {
            // Longitude is the first element in the center array
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                place_name: body.features[0].place_name
                
            })
        }
    })

}

module.exports = geocode