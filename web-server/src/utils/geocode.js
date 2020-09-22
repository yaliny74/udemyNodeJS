const request = require('request')

function geocode(address, callback) {    
    const addressURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoieWFsaW55IiwiYSI6ImNrZjd6MDlrMTA3OGoycHM2M2l1Mmpnd3YifQ.tJu9kOVY9fcrQ8lPeRTMfQ";        
    const response = request({url: addressURL, json:true}, (error, response, body) => {

        if (error) {            
            callback(error, undefined)
        }
        else if (body.features.length === 0) {
            callback(`cannot find any location called ${address}`, undefined)
        }
        else {
            callback(undefined, {
                place: body.features[0].place_name, 
                lat: body.features[0].center[1],
                lon:body.features[0].center[0]
            })
        }
    });
}

module.exports = geocode;