request = require('request')

const forecast = (lat, lon, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=d3b1902d487c3af4eaccda4db37e8a3f&query=' + lat + ',' + lon;

    const response = request({url: url, json: true}, (error, response, body) => {        
        
        if (error) {
            callback("cannot connect to weatherstack", undefined)
        }
        else {            
            if (body.error) {                                
                callback(body.error.info, undefined)
            }
            else {                
                callback(undefined, {
                    location: body.location,
                    data: body.current
                })
            }
        }
    });
}

module.exports = forecast;